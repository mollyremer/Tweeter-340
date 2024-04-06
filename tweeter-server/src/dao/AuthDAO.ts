import {
    DeleteCommand,
    DynamoDBDocumentClient,
    GetCommand,
    PutCommand,
    QueryCommand,
    UpdateCommand,
} from "@aws-sdk/lib-dynamodb";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { AuthToken } from "tweeter-shared";

export class AuthDAO {
    readonly tableName = "authToken";
    readonly token = "token";
    readonly timestamp = "timestamp";
    readonly password = "password";

    private readonly client = DynamoDBDocumentClient.from(new DynamoDBClient());

    async putAuth(password: string): Promise<void> {
        let authToken: AuthToken = AuthToken.Generate();
        const params = {
            TableName: this.tableName,
            Item: {
                [this.token]: authToken.token,
                [this.timestamp]: authToken.timestamp,
                [this.password]: password
            },
        };
        await this.client.send(new PutCommand(params));
    }

    async getAuth(token: string): Promise<AuthToken | undefined> {
        const params = {
            TableName: this.tableName,
            Key: this.generateTokenItem(token),
        };
        const output = await this.client.send(new GetCommand(params));
        return output.Item == undefined
            ? undefined
            : new AuthToken(
                output.Item[this.token],
                output.Item[this.timestamp]
            );
    }

    async deleteAuth(token: string): Promise<void> {
        const params = {
            TableName: this.tableName,
            Key: this.generateTokenItem(token)
        };
        await this.client.send(new DeleteCommand(params));
    }

    private generateTokenItem(token: string){
        return {
            [this.token]: token
        }
    }
}