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
exports.FollowsDAO = void 0;
const lib_dynamodb_1 = require("@aws-sdk/lib-dynamodb");
const tweeter_shared_1 = require("tweeter-shared");
const DataPage_1 = require("./DataPage");
class FollowsDAO {
    constructor(client) {
        this.tableName = "follows";
        this.indexName = "follows_index";
        this.followerHandle = "follower_handle";
        this.followeeHandle = "followee_handle";
        this.follower = "follower";
        this.followee = "followee";
        this.client = client;
    }
    put(follow) {
        return __awaiter(this, void 0, void 0, function* () {
            const params = {
                TableName: this.tableName,
                Item: {
                    [this.followeeHandle]: follow.followee.alias,
                    [this.followerHandle]: follow.follower.alias,
                    [this.follower]: follow.follower.toJson(),
                    [this.followee]: follow.followee.toJson(),
                },
            };
            yield this.client.send(new lib_dynamodb_1.PutCommand(params));
        });
    }
    update(follow) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.put(follow);
        });
    }
    delete(follow) {
        return __awaiter(this, void 0, void 0, function* () {
            const params = {
                TableName: this.tableName,
                Key: this.generateKey(follow),
            };
            yield this.client.send(new lib_dynamodb_1.DeleteCommand(params));
        });
    }
    generateKey(follow) {
        return {
            [this.followerHandle]: follow.follower.alias,
            [this.followeeHandle]: follow.followee.alias
        };
    }
    get(follow) {
        return __awaiter(this, void 0, void 0, function* () {
            const params = {
                TableName: this.tableName,
                Key: this.generateKey(follow),
            };
            const output = yield this.client.send(new lib_dynamodb_1.GetCommand(params));
            return output.Item == undefined
                ? null
                : new tweeter_shared_1.Follow(tweeter_shared_1.User.fromJson(output.Item[this.follower]), tweeter_shared_1.User.fromJson(output.Item[this.followee]));
        });
    }
    getAllFollowers(followerHandle) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const params = {
                KeyConditionExpression: this.followerHandle + " = :fr",
                ExpressionAttributeValues: {
                    ":fr": followerHandle,
                },
                TableName: this.tableName,
                IndexName: this.indexName
            };
            const items = [];
            const data = yield this.client.send(new lib_dynamodb_1.QueryCommand(params));
            (_a = data.Items) === null || _a === void 0 ? void 0 : _a.forEach((item) => items.push(item[this.followeeHandle]));
            return items;
        });
    }
    getPageOfFollowees(followerHandle, pageSize, lastFolloweeHandle) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            console.log(followerHandle);
            console.log(lastFolloweeHandle);
            const params = {
                KeyConditionExpression: this.followerHandle + " = :fr",
                ExpressionAttributeValues: {
                    ":fr": followerHandle,
                },
                TableName: this.tableName,
                Limit: pageSize,
                ExclusiveStartKey: lastFolloweeHandle === null
                    ? undefined
                    : {
                        [this.followerHandle]: followerHandle,
                        [this.followeeHandle]: lastFolloweeHandle,
                    },
            };
            const items = [];
            const data = yield this.client.send(new lib_dynamodb_1.QueryCommand(params));
            const hasMorePages = data.LastEvaluatedKey !== undefined;
            (_a = data.Items) === null || _a === void 0 ? void 0 : _a.forEach((item) => items.push(tweeter_shared_1.User.fromJson(item[this.followee])));
            return new DataPage_1.DataPage(items, hasMorePages);
        });
    }
    getPageOfFollowers(followeeHandle, pageSize, lastFollowerHandle) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
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
                ExclusiveStartKey: lastFollowerHandle === null
                    ? undefined
                    : {
                        [this.followeeHandle]: followeeHandle,
                        [this.followerHandle]: lastFollowerHandle,
                    },
            };
            const items = [];
            const data = yield this.client.send(new lib_dynamodb_1.QueryCommand(params));
            const hasMorePages = data.LastEvaluatedKey !== undefined;
            (_a = data.Items) === null || _a === void 0 ? void 0 : _a.forEach((item) => items.push(tweeter_shared_1.User.fromJson(item[this.follower])));
            return new DataPage_1.DataPage(items, hasMorePages);
        });
    }
}
exports.FollowsDAO = FollowsDAO;
