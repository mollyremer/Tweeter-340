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
exports.AuthDAO = void 0;
const lib_dynamodb_1 = require("@aws-sdk/lib-dynamodb");
const tweeter_shared_1 = require("tweeter-shared");
class AuthDAO {
    constructor(client) {
        this.tableName = "authToken";
        this.token = "token";
        this.timestamp = "time-stamp";
        this.alias = "alias";
        this.client = client;
    }
    put(alias, password) {
        return __awaiter(this, void 0, void 0, function* () {
            let authToken = tweeter_shared_1.AuthToken.Generate();
            const params = {
                TableName: this.tableName,
                Item: {
                    [this.token]: authToken.token,
                    [this.timestamp]: authToken.timestamp,
                    [this.alias]: alias
                },
            };
            yield this.client.send(new lib_dynamodb_1.PutCommand(params));
            return authToken;
        });
    }
    get(token) {
        return __awaiter(this, void 0, void 0, function* () {
            const params = {
                TableName: this.tableName,
                Key: this.generateKey(token),
            };
            const output = yield this.client.send(new lib_dynamodb_1.GetCommand(params));
            return output.Item == undefined
                ? undefined
                : new tweeter_shared_1.AuthToken(output.Item[this.token], output.Item[this.timestamp]);
        });
    }
    delete(token) {
        return __awaiter(this, void 0, void 0, function* () {
            const params = {
                TableName: this.tableName,
                Key: this.generateKey(token)
            };
            yield this.client.send(new lib_dynamodb_1.DeleteCommand(params));
        });
    }
    generateKey(token) {
        return {
            [this.token]: token
        };
    }
}
exports.AuthDAO = AuthDAO;
