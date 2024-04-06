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

export class FeedDAO {
    readonly tableName = "feed";
    readonly indexName = "feed-index";
    readonly followerAlias = "followerAlias";
    readonly timestamp = "timestamp";
    readonly jsonPost = "jsonPost";

    private readonly client = DynamoDBDocumentClient.from(new DynamoDBClient());

    async putFeedItem(status: Status, followerAlias: string): Promise <void> {
        const params = {
            TableName: this.tableName,
            Item: {
                [this.followerAlias]: followerAlias,
                [this.timestamp]: status.timestamp,
                [this.jsonPost]: status.toJson
            },
        };
        await this.client.send(new PutCommand(params));
    }

    async updateFeedItem(status: Status, followerAlias: string): Promise<void> {
        await this.putFeedItem(status, followerAlias);
    }

    async deleteFeedItem(status: Status, followerAlias: string): Promise<void> {
        const params = {
            TableName: this.tableName,
            Key: this.generateFeedKey(followerAlias, status.timestamp)
        };
        await this.client.send(new DeleteCommand(params));
    }

    private generateFeedKey(followerAlias: string, timestamp: number){
        return {
            [this.followerAlias]: followerAlias,
            [this.tableName]: timestamp
        }
    }

    async getFeedItem(status: Status, followerAlias: string): Promise<Status | undefined>{
        const params = {
            TableName: this.tableName,
            Key: this.generateFeedKey(followerAlias, status.timestamp),
        };
        const output = await this.client.send(new GetCommand(params));
        return output.Item == undefined
            ? undefined
            : Status.fromJson(output.Item[this.jsonPost])!;
    }

    async getPageOfFeedItems(followerAlias: string, pageSize: number): Promise<DataPage<Status>> {
        const params = {
            KeyConditionExpression: this.followerAlias + " = :f",
            ExpressionAttributeValues: {
                ":f": followerAlias,
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