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

export class StoryDAO {
    readonly tableName = "story";
    readonly indexName = "story-index";
    readonly authorAlias = "authorAlias";
    readonly timestamp = "timestamp";
    readonly jsonPost = "jsonPost";

    private readonly client = DynamoDBDocumentClient.from(new DynamoDBClient());

    async putStoryItem(status: Status, authorAlias: string): Promise <void> {
        const params = {
            TableName: this.tableName,
            Item: {
                [this.authorAlias]: authorAlias,
                [this.timestamp]: status.timestamp,
                [this.jsonPost]: status.toJson
            },
        };
        await this.client.send(new PutCommand(params));
    }

    async updateStoryItem(status: Status, authorAlias: string): Promise<void> {
        await this.putStoryItem(status, authorAlias);
    }

    async deleteStoryItem(status: Status, authorAlias: string): Promise<void> {
        const params = {
            TableName: this.tableName,
            Key: this.generateStoryKey(authorAlias, status.timestamp)
        };
        await this.client.send(new DeleteCommand(params));
    }

    private generateStoryKey(authorAlias: string, timestamp: number){
        return {
            [this.authorAlias]: authorAlias,
            [this.tableName]: timestamp
        }
    }

    async getStoryItem(status: Status, authorAlias: string): Promise<Status | undefined>{
        const params = {
            TableName: this.tableName,
            Key: this.generateStoryKey(authorAlias, status.timestamp),
        };
        const output = await this.client.send(new GetCommand(params));
        return output.Item == undefined
            ? undefined
            : Status.fromJson(output.Item[this.jsonPost])!;
    }

    async getPageOfStoryItems(authorAlias: string, pageSize: number): Promise<DataPage<Status>> {
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
        data.Items?.forEach((item) => 
            items.push(
                Status.fromJson(this.jsonPost)!
            )
        )
        return new DataPage<Status>(items, hasMorePages);
    }
    
}