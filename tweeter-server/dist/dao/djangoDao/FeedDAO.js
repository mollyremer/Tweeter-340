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
exports.FeedDAO = void 0;
const lib_dynamodb_1 = require("@aws-sdk/lib-dynamodb");
const tweeter_shared_1 = require("tweeter-shared");
const DataPage_1 = require("./DataPage");
class FeedDAO {
    constructor(client) {
        this.tableName = "feed";
        this.indexName = "feed-index";
        this.followerAlias = "followerAlias";
        this.timestamp = "time-stamp";
        this.jsonPost = "jsonPost";
        this.client = client;
    }
    put(status, followerAlias) {
        return __awaiter(this, void 0, void 0, function* () {
            const params = {
                TableName: this.tableName,
                Item: {
                    [this.followerAlias]: followerAlias,
                    [this.timestamp]: status.timestamp,
                    [this.jsonPost]: status.toJson
                },
            };
            yield this.client.send(new lib_dynamodb_1.PutCommand(params));
        });
    }
    update(status, followerAlias) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.put(status, followerAlias);
        });
    }
    delete(status, followerAlias) {
        return __awaiter(this, void 0, void 0, function* () {
            const params = {
                TableName: this.tableName,
                Key: this.generateKey(followerAlias, status.timestamp)
            };
            yield this.client.send(new lib_dynamodb_1.DeleteCommand(params));
        });
    }
    generateKey(followerAlias, timestamp) {
        return {
            [this.followerAlias]: followerAlias,
            [this.tableName]: timestamp
        };
    }
    get(status, followerAlias) {
        return __awaiter(this, void 0, void 0, function* () {
            const params = {
                TableName: this.tableName,
                Key: this.generateKey(followerAlias, status.timestamp),
            };
            const output = yield this.client.send(new lib_dynamodb_1.GetCommand(params));
            return output.Item == undefined
                ? undefined
                : tweeter_shared_1.Status.fromJson(output.Item[this.jsonPost]);
        });
    }
    getPage(followerAlias, pageSize) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const params = {
                KeyConditionExpression: this.followerAlias + " = :f",
                ExpressionAttributeValues: {
                    ":f": followerAlias,
                },
                TableName: this.tableName,
                Limit: pageSize,
            };
            const items = [];
            const data = yield this.client.send(new lib_dynamodb_1.QueryCommand(params));
            const hasMorePages = data.LastEvaluatedKey !== undefined;
            (_a = data.Items) === null || _a === void 0 ? void 0 : _a.forEach((items) => items.push(tweeter_shared_1.Status.fromJson(this.jsonPost)));
            return new DataPage_1.DataPage(items, hasMorePages);
        });
    }
}
exports.FeedDAO = FeedDAO;
