import {
    DeleteCommand,
    DynamoDBDocumentClient,
    GetCommand,
    PutCommand,
    QueryCommand,
    UpdateCommand,
} from "@aws-sdk/lib-dynamodb";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { Follow, User } from "tweeter-shared";
import { DataPage } from "./DataPage";
import { FollowsDAOInterface } from "./DAOInterfaces";


export class FollowsDAO implements FollowsDAOInterface {
    readonly tableName = "follows";
    readonly indexName = "follows_index";
    readonly followerHandle = "follower_handle";
    readonly followeeHandle = "followee_handle";
    readonly follower = "follower";
    readonly followee = "followee";

    private readonly client;
    constructor(client: DynamoDBDocumentClient) {
        this.client = client;
    }

    async put(follow: Follow): Promise<void> {
        const params = {
            TableName: this.tableName,
            Item: {
                [this.followeeHandle]: follow.followee.alias,
                [this.followerHandle]: follow.follower.alias,
                [this.follower]: follow.follower.toJson(),
                [this.followee]: follow.followee.toJson(),
            },
        };
        await this.client.send(new PutCommand(params));
    }

    async update(follow: Follow): Promise<void> {
        await this.put(follow);
    }

    async delete(follow: Follow): Promise<void> {
        const params = {
            TableName: this.tableName,
            Key: this.generateKey(follow),
        };
        await this.client.send(new DeleteCommand(params));
    }

    private generateKey(follow: Follow) {
        return {
            [this.followerHandle]: follow.follower.alias,
            [this.followeeHandle]: follow.followee.alias
        }
    }

    async get(follow: Follow): Promise<Follow | null> {
        const params = {
            TableName: this.tableName,
            Key: this.generateKey(follow),
        };
        const output = await this.client.send(new GetCommand(params));
        return output.Item == undefined
            ? null
            : new Follow(
                User.fromJson(output.Item[this.follower])!,
                User.fromJson(output.Item[this.followee])!,
            )
    }

    async getAllFollowers(followerHandle: string): Promise<string[]>{
        const params = {
            KeyConditionExpression: this.followerHandle + " = :fr",
            ExpressionAttributeValues: {
                ":fr": followerHandle,
            },
            TableName: this.tableName,
            IndexName: this.indexName
        };

        const items: string[] = [];
        const data = await this.client.send(new QueryCommand(params));
        data.Items?.forEach((item) =>
            items.push(
                item[this.followeeHandle]
            )
        );

        return items;
    }

    async getPageOfFollowees(followerHandle: string, pageSize: number, lastFolloweeHandle: string | null): Promise<DataPage<User>> {
        console.log(followerHandle);
        console.log(lastFolloweeHandle);
        const params = {
            KeyConditionExpression: this.followerHandle + " = :fr",
            ExpressionAttributeValues: {
                ":fr": followerHandle,
            },
            TableName: this.tableName,
            Limit: pageSize,
            ExclusiveStartKey:
                lastFolloweeHandle === null
                    ? undefined
                    : {
                        [this.followerHandle]: followerHandle,
                        [this.followeeHandle]: lastFolloweeHandle,
                    },
        };

        const items: User[] = [];
        const data = await this.client.send(new QueryCommand(params));
        const hasMorePages = data.LastEvaluatedKey !== undefined;
        data.Items?.forEach((item) =>
            items.push(
                User.fromJson(item[this.followee])!
            )
        );

        return new DataPage<User>(items, hasMorePages);
    }

    async getPageOfFollowers(followeeHandle: string, pageSize: number, lastFollowerHandle: string | null): Promise<DataPage<User>> {
        console.log(followeeHandle);
        console.log(lastFollowerHandle);
        const params = {
            KeyConditionExpression: this.followeeHandle + " = :fe",
            ExpressionAttributeValues: {
                ":fe": followeeHandle,
            },
            TableName: this.tableName,
            IndexName: this.indexName,
            Limit: pageSize,
            ExclusiveStartKey:
                lastFollowerHandle === null
                    ? undefined
                    : {
                        [this.followeeHandle]: followeeHandle,
                        [this.followerHandle]: lastFollowerHandle,
                    },
        };

        const items: User[] = [];
        const data = await this.client.send(new QueryCommand(params));
        const hasMorePages = data.LastEvaluatedKey !== undefined;
        data.Items?.forEach((item) => 
            items.push(
                User.fromJson(item[this.follower])!
            )
        );

        return new DataPage<User>(items, hasMorePages);

    }
}