"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserDAO = void 0;
const lib_dynamodb_1 = require("@aws-sdk/lib-dynamodb");
const client_dynamodb_1 = require("@aws-sdk/client-dynamodb");
const tweeter_shared_1 = require("tweeter-shared");
class UserDAO {
    constructor() {
        this.tableName = "user";
        this.firstName = "firstName";
        this.lastName = "lastName";
        this.alias = "alias";
        this.imageUrl = "string";
        this.password = "password";
        this.followerCount = "followerCount";
        this.followeeCount = "followeeCount";
        this.client = lib_dynamodb_1.DynamoDBDocumentClient.from(new client_dynamodb_1.DynamoDBClient());
    }
    put(user, password, followerCount, followeeCount) {
        return __awaiter(this, void 0, void 0, function* () {
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
            yield this.client.send(new lib_dynamodb_1.PutCommand(params));
        });
    }
    getUser(alias) {
        return __awaiter(this, void 0, void 0, function* () {
            const params = {
                TableName: this.tableName,
                Key: this.generateKey(alias),
            };
            const output = yield this.client.send(new lib_dynamodb_1.GetCommand(params));
            return output.Item == undefined
                ? null
                : new tweeter_shared_1.User(output.Item[this.firstName], output.Item[this.lastName], output.Item[this.alias], output.Item[this.imageUrl]);
        });
    }
    getFollowerCount(alias) {
        return __awaiter(this, void 0, void 0, function* () {
            const params = {
                TableName: this.tableName,
                Key: this.generateKey(alias),
            };
            const output = yield this.client.send(new lib_dynamodb_1.GetCommand(params));
            return output.Item == undefined
                ? null
                : output.Item[this.followerCount];
        });
    }
    getFolloweeCount(alias) {
        return __awaiter(this, void 0, void 0, function* () {
            const params = {
                TableName: this.tableName,
                Key: this.generateKey(alias),
            };
            const output = yield this.client.send(new lib_dynamodb_1.GetCommand(params));
            return output.Item == undefined
                ? null
                : output.Item[this.followeeCount];
        });
    }
    generateKey(alias) {
        return {
            [this.alias]: alias
        };
    }
    getOutput(alias) {
        return __awaiter(this, void 0, void 0, function* () {
            const params = {
                TableName: this.tableName,
                Key: this.generateKey(alias),
            };
            const output = yield this.client.send(new lib_dynamodb_1.GetCommand(params));
            return output.Item == undefined
                ? null
                : output;
        });
    }
    updateFollowerCount(alias, update) {
        return __awaiter(this, void 0, void 0, function* () {
            const output = yield this.getOutput(alias);
            if (output === null || output === undefined) {
                throw new Error("Internal Server Error: Cannot retrieve user output");
            }
            if (output.Item === null || output.Item === undefined) {
                throw new Error("Internal Server Error: Cannot retrieve user output");
            }
            let followerCount = output.Item[this.followerCount] + update;
            yield this.put(new tweeter_shared_1.User(output.Item[this.firstName], output.Item[this.lastName], output.Item[this.alias], output.Item[this.imageUrl]), output.Item[this.password], followerCount);
        });
    }
    updateFolloweeCount(alias, update) {
        return __awaiter(this, void 0, void 0, function* () {
            const output = yield this.getOutput(alias);
            if (output === null || output === undefined) {
                throw new Error("Internal Server Error: Cannot retrieve user output");
            }
            if (output.Item === null || output.Item === undefined) {
                throw new Error("Internal Server Error: Cannot retrieve user output");
            }
            let followeeCount = output.Item[this.followeeCount] + update;
            yield this.put(new tweeter_shared_1.User(output.Item[this.firstName], output.Item[this.lastName], output.Item[this.alias], output.Item[this.imageUrl]), output.Item[this.password], undefined, followeeCount);
        });
    }
}
exports.UserDAO = UserDAO;
