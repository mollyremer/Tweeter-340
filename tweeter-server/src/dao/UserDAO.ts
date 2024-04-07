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

export class UserDAO implements UserDAOInterface{
    readonly tableName = "user";
    readonly firstName = "firstName";
    readonly lastName = "lastName"
    readonly alias = "alias";
    readonly imageUrl = "string";
    readonly password = "password";


    private readonly client = DynamoDBDocumentClient.from(new DynamoDBClient());

    async put(user: User, password: String): Promise<void> {
        const params = {
            TableName: this.tableName,
            Item: {
                [this.firstName]: user.firstName,
                [this.lastName]: user.lastName,
                [this.alias]: user.alias,
                [this.imageUrl]: user.imageUrl,
                [this.password]: password,
            },
        };
        await this.client.send(new PutCommand(params));
    }

    async get(alias: string): Promise<User | undefined> {
        const params = {
            TableName: this.tableName,
            Key: this.generateKey(alias),
        };
        const output = await this.client.send(new GetCommand(params))
        return output.Item == undefined
            ? undefined
            : new User(
                output.Item[this.firstName],
                output.Item[this.lastName],
                output.Item[this.alias],
                output.Item[this.imageUrl],
            );
    }

    private generateKey(alias: string) {
        return {
            [this.alias]: alias
        }
    }

}