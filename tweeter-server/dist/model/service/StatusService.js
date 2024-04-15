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
class StatusService extends Service_1.Service {
    loadMoreFeedItems(request) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(request);
            let user = tweeter_shared_1.User.fromJson(JSON.stringify(request.user));
            console.log(user);
            if (user === null) {
                throw new Error("[Bad Request] Unknown user");
            }
            let lastItem = tweeter_shared_1.Status.fromJson(JSON.stringify(request.lastItem));
            let lastItemUser = tweeter_shared_1.User.fromJson(JSON.stringify(lastItem === null || lastItem === void 0 ? void 0 : lastItem.user));
            let statuses = [];
            let page = yield this.DAO.feedDAO.getPage(user.alias, request.pageSize, lastItem.timestamp, lastItemUser.alias);
            if (((page.values) === null) || (page.hasMorePages === null)) {
                throw new Error("[Internal Server Error] Invalid user or authToken");
            }
            yield page.values.reduce((promise, page) => __awaiter(this, void 0, void 0, function* () {
                yield promise;
                let dbUser = yield this.DAO.userDAO.getUser(page.user.alias);
                if (dbUser === null) {
                    throw new Error('[Internal Server Error] Unable to fetch user');
                }
                statuses.push(new tweeter_shared_1.Status(page.post, dbUser, page.timestamp));
            }), Promise.resolve());
            return [statuses, page.hasMorePages];
        });
    }
    ;
    loadMoreStoryItems(request) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(request);
            let user = tweeter_shared_1.User.fromJson(JSON.stringify(request.user));
            console.log(user);
            if (user === null) {
                throw new Error("[Bad Request] Unknown user");
            }
            let lastItem = tweeter_shared_1.Status.fromJson(JSON.stringify(request.lastItem));
            let lastItemUser = tweeter_shared_1.User.fromJson(JSON.stringify(lastItem === null || lastItem === void 0 ? void 0 : lastItem.user));
            let statuses = [];
            let page = yield this.DAO.feedDAO.getPage(user.alias, request.pageSize, lastItem.timestamp, lastItemUser.alias);
            if ((page.values === null) || (page.hasMorePages === null)) {
                throw new Error("[Internal Server Error] Invalid user or authToken");
            }
            yield page.values.reduce((promise, page) => __awaiter(this, void 0, void 0, function* () {
                yield promise;
                let dbUser = yield this.DAO.userDAO.getUser(page.user.alias);
                if (dbUser === null) {
                    throw new Error('[Internal Server Error] Unable to fetch user');
                }
                statuses.push(new tweeter_shared_1.Status(page.post, dbUser, page.timestamp));
            }), Promise.resolve());
            return [statuses, page.hasMorePages];
        });
    }
    ;
    postStatus(request) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(request);
            let requestAuthToken = tweeter_shared_1.AuthToken.fromJson(JSON.stringify(request.authToken));
            let authToken = yield this.DAO.authDAO.get(requestAuthToken.token);
            if (authToken === null) {
                throw new Error("[Internal Server Error] Invalid authToken");
            }
            let userInsideStatus = tweeter_shared_1.User.fromJson(JSON.stringify(request.newStatus.user));
            let newStatus = tweeter_shared_1.Status.fromJson(JSON.stringify(request.newStatus));
            yield this.DAO.storyDAO.put(new tweeter_shared_1.Status(newStatus.post, userInsideStatus, newStatus.timestamp), newStatus.user.alias);
            yield this.DAO.feedDAO.put(new tweeter_shared_1.Status(newStatus.post, userInsideStatus, newStatus.timestamp), newStatus.user.alias);
            yield new Promise((f) => setTimeout(f, 2000));
        });
    }
    ;
}
exports.StatusService = StatusService;
