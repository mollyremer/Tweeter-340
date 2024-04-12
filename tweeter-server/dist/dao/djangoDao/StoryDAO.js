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
exports.StoryDAO = void 0;
const lib_dynamodb_1 = require("@aws-sdk/lib-dynamodb");
const tweeter_shared_1 = require("tweeter-shared");
const DataPage_1 = require("./DataPage");
const UserDAO_1 = require("./UserDAO");
class StoryDAO {
    constructor(client) {
        this.tableName = "story";
        this.indexName = "story-index";
        this.authorAlias = "authorAlias";
        this.timestamp = "time-stamp";
        this.post = "post";
        this.client = client;
    }
    put(status, authorAlias) {
        return __awaiter(this, void 0, void 0, function* () {
            const params = {
                TableName: this.tableName,
                Item: {
                    [this.authorAlias]: authorAlias,
                    [this.timestamp]: status.timestamp,
                    [this.post]: status.post
                },
            };
            yield this.client.send(new lib_dynamodb_1.PutCommand(params));
        });
    }
    update(status, authorAlias) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.put(status, authorAlias);
        });
    }
    delete(status, authorAlias) {
        return __awaiter(this, void 0, void 0, function* () {
            const params = {
                TableName: this.tableName,
                Key: this.generateKey(authorAlias, status.timestamp)
            };
            yield this.client.send(new lib_dynamodb_1.DeleteCommand(params));
        });
    }
    generateKey(authorAlias, timestamp) {
        return {
            [this.authorAlias]: authorAlias,
            [this.tableName]: timestamp
        };
    }
    get(status, authorAlias) {
        return __awaiter(this, void 0, void 0, function* () {
            const params = {
                TableName: this.tableName,
                Key: this.generateKey(authorAlias, status.timestamp),
            };
            const output = yield this.client.send(new lib_dynamodb_1.GetCommand(params));
            let userDAO = new UserDAO_1.UserDAO(this.client);
            let user = yield userDAO.getUser(this.authorAlias);
            return output.Item == undefined
                ? undefined
                : new tweeter_shared_1.Status(output.Item[this.post], user, output.Item[this.timestamp]);
        });
    }
    getPage(authorAlias, pageSize) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const params = {
                KeyConditionExpression: this.authorAlias + " = :f",
                ExpressionAttributeValues: {
                    ":f": authorAlias,
                },
                TableName: this.tableName,
                Limit: pageSize,
            };
            const items = [];
            const data = yield this.client.send(new lib_dynamodb_1.QueryCommand(params));
            const hasMorePages = data.LastEvaluatedKey !== undefined;
            (_a = data.Items) === null || _a === void 0 ? void 0 : _a.forEach((items) => __awaiter(this, void 0, void 0, function* () {
                let userDAO = new UserDAO_1.UserDAO(this.client);
                let user = yield userDAO.getUser(this.authorAlias);
                items.push(new tweeter_shared_1.Status(items[this.post], user, items[this.timestamp]));
            }));
            return new DataPage_1.DataPage(items, hasMorePages);
        });
    }
}
exports.StoryDAO = StoryDAO;
