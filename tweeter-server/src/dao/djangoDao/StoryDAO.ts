import {
    DeleteCommand,
    DynamoDBDocumentClient,
    GetCommand,
    PutCommand,
    QueryCommand,
    UpdateCommand,
} from "@aws-sdk/lib-dynamodb";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { Status, User } from "tweeter-shared";
import { DataPage } from "./DataPage";
import { StatusDAOInterface } from "./DAOInterfaces";
import { UserDAO } from "./UserDAO";

export class StoryDAO implements StatusDAOInterface{
    readonly tableName = "story";
    readonly indexName = "story-index";
    readonly authorAlias = "authorAlias";
    readonly timestamp = "time-stamp";
    readonly post = "post";

    private readonly client;
    constructor(client: DynamoDBDocumentClient){
        this.client = client;
    }
    
    async put(status: Status, authorAlias: string): Promise <void> {
        const params = {
            TableName: this.tableName,
            Item: {
                [this.authorAlias]: authorAlias,
                [this.timestamp]: status.timestamp,
                [this.post]: status.post
            },
        };
        await this.client.send(new PutCommand(params));
    }

    async update(status: Status, authorAlias: string): Promise<void> {
        await this.put(status, authorAlias);
    }

    async delete(status: Status, authorAlias: string): Promise<void> {
        const params = {
            TableName: this.tableName,
            Key: this.generateKey(authorAlias, status.timestamp)
        };
        await this.client.send(new DeleteCommand(params));
    }

    private generateKey(authorAlias: string, timestamp: number){
        return {
            [this.authorAlias]: authorAlias,
            [this.tableName]: timestamp
        }
    }

    async get(status: Status, authorAlias: string): Promise<Status | undefined>{
        const params = {
            TableName: this.tableName,
            Key: this.generateKey(authorAlias, status.timestamp),
        };
        const output = await this.client.send(new GetCommand(params));
        let userDAO = new UserDAO(this.client);
        let user = await userDAO.getUser(this.authorAlias);
        return output.Item == undefined
            ? undefined
            : new Status(output.Item[this.post], user!, output.Item[this.timestamp])!;
    }

    async getPage(authorAlias: string, pageSize: number, lastItemTimestamp: number, lastItemAlias: string): Promise<DataPage<Status>> {
        const params = {
            KeyConditionExpression: this.authorAlias + " = :f",
            ExpressionAttributeValues: {
                ":f": authorAlias,
            },
            TableName: this.tableName,
            Limit: pageSize,
            ExclusiveStartKey: lastItemTimestamp === undefined ? undefined : this.generateKey(lastItemAlias, lastItemTimestamp)
        };

        const items: Status[] = [];
        const data = await this.client.send(new QueryCommand(params));
        const hasMorePages = data.LastEvaluatedKey !== undefined;
        data.Items?.forEach(async (items) => {
            let userDAO = new UserDAO(this.client);
            let user = await userDAO.getUser(this.authorAlias);
            let status = new Status(items[this.post], user!, items[this.timestamp]);
            console.log(status);
            items.push(status);
            }
        )
        
        return new DataPage<Status>(items, hasMorePages);
    }
    
}