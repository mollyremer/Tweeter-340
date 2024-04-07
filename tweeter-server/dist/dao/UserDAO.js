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
        this.client = lib_dynamodb_1.DynamoDBDocumentClient.from(new client_dynamodb_1.DynamoDBClient());
    }
    put(user, password) {
        return __awaiter(this, void 0, void 0, function* () {
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
            yield this.client.send(new lib_dynamodb_1.PutCommand(params));
        });
    }
    get(alias) {
        return __awaiter(this, void 0, void 0, function* () {
            const params = {
                TableName: this.tableName,
                Key: this.generateKey(alias),
            };
            const output = yield this.client.send(new lib_dynamodb_1.GetCommand(params));
            return output.Item == undefined
                ? undefined
                : new tweeter_shared_1.User(output.Item[this.firstName], output.Item[this.lastName], output.Item[this.alias], output.Item[this.imageUrl]);
        });
    }
    generateKey(alias) {
        return {
            [this.alias]: alias
        };
    }
}
exports.UserDAO = UserDAO;
