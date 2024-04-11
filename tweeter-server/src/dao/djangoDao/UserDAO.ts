import {
    DeleteCommand,
    DynamoDBDocumentClient,
    GetCommand,
    PutCommand,
    QueryCommand,
    UpdateCommand,
} from "@aws-sdk/lib-dynamodb";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { User } from "tweeter-shared";
import { UserDAOInterface } from "./DAOInterfaces";

export class UserDAO implements UserDAOInterface {
    readonly tableName = "user";
    readonly firstName = "firstName";
    readonly lastName = "lastName"
    readonly alias = "alias";
    readonly imageUrl = "string";
    readonly password = "password";
    readonly followerCount = "followerCount";
    readonly followeeCount = "followeeCount";

    private readonly client;
    constructor(client: DynamoDBDocumentClient){
        this.client = client;
    }

    async put(user: User, password: String, followerCount?: number, followeeCount?: number): Promise<void> {
        const params = {
            TableName: this.tableName,
            Item: {
                [this.firstName]: user.firstName,
                [this.lastName]: user.lastName,
                [this.alias]: user.alias,
                [this.imageUrl]: user.imageUrl,
                [this.password]: password,
                [this.followerCount]: followerCount ? followerCount : 0,
                [this.followeeCount]: followeeCount ? followeeCount : 0
            },
        };
        await this.client.send(new PutCommand(params));
    }

    async getUser(alias: string): Promise<User | null> {
        const params = {
            TableName: this.tableName,
            Key: this.generateKey(alias),
        };
        const output = await this.client.send(new GetCommand(params))
        return output.Item == undefined
            ? null
            : new User(
                output.Item[this.firstName],
                output.Item[this.lastName],
                output.Item[this.alias],
                output.Item[this.imageUrl],
            );
    }

    async getPassword(alias: string): Promise<string | null> {
        const params = {
            TableName: this.tableName,
            Key: this.generateKey(alias),
        };
        const output = await this.client.send(new GetCommand(params))
        return output.Item == undefined
            ? null
            : output.Item[this.password];
    }

    async getFollowerCount(alias: string): Promise<number> {
        const params = {
            TableName: this.tableName,
            Key: this.generateKey(alias),
        };
        const output = await this.client.send(new GetCommand(params))
        return output.Item == undefined
            ? null
            : output.Item[this.followerCount];
    }

    async getFolloweeCount(alias: string): Promise<number> {
        const params = {
            TableName: this.tableName,
            Key: this.generateKey(alias),
        };
        const output = await this.client.send(new GetCommand(params))
        return output.Item == undefined
            ? null
            : output.Item[this.followeeCount];
    }

    private generateKey(alias: string) {
        return {
            [this.alias]: alias
        }
    }

    private async getOutput(alias: string){
        const params = {
            TableName: this.tableName,
            Key: this.generateKey(alias),
        };
        const output = await this.client.send(new GetCommand(params))
        return output.Item == undefined
            ? null
            : output
    }

    async updateFollowerCount(alias: string, update: number): Promise<void> {
        const output = await this.getOutput(alias);
        if (output === null || output === undefined) { throw new Error ("Internal Server Error: Cannot retrieve user output");}
        if (output.Item === null || output.Item === undefined) { throw new Error ("Internal Server Error: Cannot retrieve user output");}
        
        let followerCount = output.Item[this.followerCount] + update;

        await this.put(new User(output.Item[this.firstName], output.Item[this.lastName], output.Item[this.alias], output.Item[this.imageUrl]), output.Item[this.password], followerCount);
    }
    
    async updateFolloweeCount(alias: string, update: number): Promise<void> {
        const output = await this.getOutput(alias);
        if (output === null || output === undefined) { throw new Error ("Internal Server Error: Cannot retrieve user output");}
        if (output.Item === null || output.Item === undefined) { throw new Error ("Internal Server Error: Cannot retrieve user output");}
        
        let followeeCount = output.Item[this.followeeCount] + update;

        await this.put(new User(output.Item[this.firstName], output.Item[this.lastName], output.Item[this.alias], output.Item[this.imageUrl]), output.Item[this.password], undefined, followeeCount);
    }

}