import {
    DeleteCommand,
    DynamoDBDocumentClient,
    GetCommand,
    PutCommand,
} from "@aws-sdk/lib-dynamodb";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { AuthToken } from "tweeter-shared";
import { AuthDAOInterface } from "./DAOInterfaces";

export class AuthDAO implements AuthDAOInterface{
    readonly tableName = "authToken";
    readonly token = "token";
    readonly timestamp = "timestamp";
    readonly alias = "alias";

    private readonly client;
    constructor(client: DynamoDBDocumentClient){
        this.client = client;
    }
    
    async put(alias: string, password: string): Promise<AuthToken> {
        let authToken: AuthToken = AuthToken.Generate();
        const params = {
            TableName: this.tableName,
            Item: {
                [this.token]: authToken.token,
                [this.timestamp]: authToken.timestamp,
                [this.alias]: alias
            },
        };
        await this.client.send(new PutCommand(params));
        return authToken;
    }

    async get(token: string): Promise<AuthToken | undefined> {
        const params = {
            TableName: this.tableName,
            Key: this.generateKey(token),
        };
        const output = await this.client.send(new GetCommand(params));
        return output.Item == undefined
            ? undefined
            : new AuthToken(
                output.Item[this.token],
                output.Item[this.timestamp]
            );
    }

    async delete(token: string): Promise<void> {
        const params = {
            TableName: this.tableName,
            Key: this.generateKey(token)
        };
        await this.client.send(new DeleteCommand(params));
    }

    private generateKey(token: string){
        return {
            [this.token]: token
        }
    }
}