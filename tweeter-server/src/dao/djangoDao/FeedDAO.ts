import {
    DeleteCommand,
    DynamoDBDocumentClient,
    GetCommand,
    PutCommand,
    QueryCommand
} from "@aws-sdk/lib-dynamodb";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { Status } from "tweeter-shared";
import { DataPage } from "./DataPage";
import { StatusDAOInterface } from "./DAOInterfaces";

export class FeedDAO implements StatusDAOInterface{
    readonly tableName = "feed";
    readonly indexName = "feed-index";
    readonly followerAlias = "followerAlias";
    readonly timestamp = "time-stamp";
    readonly jsonPost = "jsonPost";

    private readonly client;
    constructor(client: DynamoDBDocumentClient){
        this.client = client;
    }
    
    async put(status: Status, followerAlias: string): Promise<void> {
        let jsonPost = status.toJson();
        console.log(jsonPost);
        const params = {
            TableName: this.tableName,
            Item: {
                [this.followerAlias]: followerAlias,
                [this.timestamp]: status.timestamp,
                [this.jsonPost]: jsonPost
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
        return output.Item == undefined
            ? undefined
            : Status.fromJson(output.Item[this.jsonPost])!;
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
        data.Items?.forEach((items) =>
            items.push(
                Status.fromJson(JSON.stringify(this.jsonPost))!
            )
        )
        return new DataPage<Status>(items, hasMorePages);
    }

}