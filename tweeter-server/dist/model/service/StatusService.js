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
exports.StatusService = void 0;
const tweeter_shared_1 = require("tweeter-shared");
const Service_1 = require("./Service");
const SqsClient_1 = require("../../SqsClient");
class StatusService extends Service_1.Service {
    loadMoreFeedItems(request) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(request);
            if (request.user === null) {
                throw new Error("[Bad Request] Unknown user");
            }
            let page = yield this.DAO.feedDAO.getPage(request.user.alias, request.pageSize, request.lastItem);
            if (((page.values) === null) || (page.hasMorePages === null)) {
                throw new Error("[Internal Server Error] Invalid user or authToken");
            }
            return [page.values, page.hasMorePages];
        });
    }
    ;
    loadMoreStoryItems(request) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(request);
            if (request.user === null) {
                throw new Error("[Bad Request] Unknown user");
            }
            let page = yield this.DAO.storyDAO.getPage(request.user.alias, request.pageSize, request.lastItem);
            if ((page.values === null) || (page.hasMorePages === null)) {
                throw new Error("[Internal Server Error] Invalid user or authToken");
            }
            return [page.values, page.hasMorePages];
        });
    }
    ;
    postStatus(request) {
        return __awaiter(this, void 0, void 0, function* () {
            // let followeeAliases: string[] = await this.DAO.followsDAO.getAllFollowers(request.newStatus.user.alias);
            // for (let followeeAlias in followeeAliases){
            //     await this.DAO.feedDAO.put(new Status(request.newStatus.post, request.newStatus.user, request.newStatus.timestamp), followeeAlias);
            // }
            // await new Promise((f) => setTimeout(f, 2000));
            yield this.validateAuthToken(request.authToken);
            let status = new tweeter_shared_1.Status(request.newStatus.post, request.newStatus.user, request.newStatus.timestamp);
            yield this.DAO.storyDAO.put(status, request.newStatus.user.alias);
            console.log("put story into table");
            console.log("getting followeeCount for " + request.newStatus.user.alias);
            let followeeCount = yield this.DAO.userDAO.getFolloweeCount(request.newStatus.user.alias);
            console.log("followeeCount is " + followeeCount);
            console.log("sending status json" + status.toJson());
            if (followeeCount > 0) {
                let sqsCommunicator = new SqsClient_1.SqsClientCommunicator();
                yield sqsCommunicator.sendMessage("PostsQ", status.toJson());
            }
        });
    }
    ;
}
exports.StatusService = StatusService;
