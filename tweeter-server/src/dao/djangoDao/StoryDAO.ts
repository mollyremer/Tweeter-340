import {
    DeleteCommand,
    DynamoDBDocumentClient,
    GetCommand,
    PutCommand,
    QueryCommand,
    UpdateCommand,
} from "@aws-sdk/lib-dynamodb";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { Status } from "tweeter-shared";
import { DataPage } from "./DataPage";
import { StatusDAOInterface } from "./DAOInterfaces";

export class StoryDAO implements StatusDAOInterface{
    readonly tableName = "story";
    readonly indexName = "story-index";
    readonly authorAlias = "authorAlias";
    readonly timestamp = "time-stamp";
    readonly jsonPost = "jsonPost";

    private readonly client;
    constructor(client: DynamoDBDocumentClient){
        this.client = client;
    }
    
    async put(status: Status, authorAlias: string): Promise <void> {
        let jsonStatus = status.toJson();
        console.log(jsonStatus);
        const params = {
            TableName: this.tableName,
            Item: {
                [this.authorAlias]: authorAlias,
                [this.timestamp]: status.timestamp,
                [this.jsonPost]: jsonStatus
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
        return output.Item == undefined
            ? undefined
            : Status.fromJson(output.Item[this.jsonPost])!;
    }

    async getPage(authorAlias: string, pageSize: number): Promise<DataPage<Status>> {
        const params = {
            KeyConditionExpression: this.authorAlias + " = :f",
            ExpressionAttributeValues: {
                ":f": authorAlias,
            },
            TableName: this.tableName,
            Limit: pageSize,
        };

        const items: Status[] = [];
        const data = await this.client.send(new QueryCommand(params));
        const hasMorePages = data.LastEvaluatedKey !== undefined;
        data.Items?.forEach((items) => 
            items.push(
                Status.fromJson(this.jsonPost)!
            )
        )
        return new DataPage<Status>(items, hasMorePages);
    }
    
}