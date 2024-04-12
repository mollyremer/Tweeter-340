import {
    DeleteCommand,
    DynamoDBDocumentClient,
    GetCommand,
    PutCommand,
    QueryCommand
} from "@aws-sdk/lib-dynamodb";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { PostSegment, Status, User } from "tweeter-shared";
import { DataPage } from "./DataPage";
import { StatusDAOInterface } from "./DAOInterfaces";
import { UserDAO } from "./UserDAO";

export class FeedDAO implements StatusDAOInterface {
    readonly tableName = "feed";
    readonly indexName = "feed-index";
    readonly followerAlias = "followerAlias";
    readonly timestamp = "time-stamp";
    readonly postAlias = "postAlias";
    readonly post = "post";

    private readonly client;
    constructor(client: DynamoDBDocumentClient) {
        this.client = client;
    }

    async put(status: Status, followerAlias: string): Promise<void> {
        const params = {
            TableName: this.tableName,
            Item: {
                [this.followerAlias]: followerAlias,
                [this.timestamp]: status.timestamp,
                [this.postAlias]: status.user.alias,
                [this.post]: status.post
            },
        };
        await this.client.send(new PutCommand(params));
    }

    async update(status: Status, followerAlias: string): Promise<void> {
        await this.put(status, followerAlias);
    }

    async delete(status: Status, followerAlias: string): Promise<void> {
        const params = {
            TableName: this.tableName,
            Key: this.generateKey(followerAlias, status.timestamp)
        };
        await this.client.send(new DeleteCommand(params));
    }

    private generateKey(followerAlias: string, timestamp: number) {
        return {
            [this.followerAlias]: followerAlias,
            [this.tableName]: timestamp
        }
    }

    async get(status: Status, followerAlias: string): Promise<Status | undefined> {
        const params = {
            TableName: this.tableName,
            Key: this.generateKey(followerAlias, status.timestamp),
        };
        const output = await this.client.send(new GetCommand(params));
        let userDAO = new UserDAO(this.client);
        let user = await userDAO.getUser(this.postAlias);
        return output.Item == undefined
            ? undefined
            : new Status(output.Item[this.post], user!, output.Item[this.timestamp])!;
    }

    async getPage(followerAlias: string, pageSize: number): Promise<DataPage<Status>> {
        console.log("getting page using dao");
        console.log(followerAlias);
        console.log(pageSize);
        const params = {
            KeyConditionExpression: this.followerAlias + " = :f",
            ExpressionAttributeValues: {
                ":f": followerAlias
            },
            TableName: this.tableName,
            Limit: pageSize,
        };

        const items: Status[] = [];
        const data = await this.client.send(new QueryCommand(params));
        const hasMorePages = data.LastEvaluatedKey !== undefined;
        data.Items?.forEach(async (items) => {
            let userDAO = new UserDAO(this.client);
            let user = await userDAO.getUser(this.postAlias);
            items.push(new Status(items[this.post], user!, items[this.timestamp]));
        }
        )
        return new DataPage<Status>(items, hasMorePages);
    }

}