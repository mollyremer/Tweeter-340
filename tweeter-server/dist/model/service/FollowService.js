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
exports.FollowService = void 0;
const tweeter_shared_1 = require("tweeter-shared");
const Service_1 = require("./Service");
class FollowService extends Service_1.Service {
    loadMoreFollowers(request) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(request);
            let user = tweeter_shared_1.User.fromJson(JSON.stringify(request.user));
            let lastItem = request.lastItem ? null : tweeter_shared_1.User.fromJson(JSON.stringify(request.lastItem));
            console.log(user);
            let page = yield this.DAO.followsDAO.getPageOfFollowers(user.alias, request.pageSize, lastItem.alias);
            if ((page.values === null) || (page.hasMorePages === null)) {
                throw new Error("[Internal Server Error] Invalid user or authToken");
            }
            return [page.values, page.hasMorePages];
        });
    }
    ;
    loadMoreFollowees(request) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(request);
            let user = tweeter_shared_1.User.fromJson(JSON.stringify(request.user));
            let lastItem = request.lastItem ? null : tweeter_shared_1.User.fromJson(JSON.stringify(request.lastItem));
            console.log(user);
            let page = yield this.DAO.followsDAO.getPageOfFollowees(user.alias, request.pageSize, lastItem.alias);
            if ((page.values === null) || (page.hasMorePages === null)) {
                throw new Error("[Internal Server Error] Invalid user or authToken");
            }
            return [page.values, page.hasMorePages];
        });
    }
    ;
    follow(request) {
        return __awaiter(this, void 0, void 0, function* () {
            let authToken = tweeter_shared_1.AuthToken.fromJson(JSON.stringify(request.authToken));
            let currentUser = tweeter_shared_1.User.fromJson(JSON.stringify(request.currentUser));
            let userToFollow = tweeter_shared_1.User.fromJson(JSON.stringify(request.userToFollow));
            yield this.validateAuthToken(authToken);
            console.log("putting a follow");
            yield this.DAO.followsDAO.put(new tweeter_shared_1.Follow(currentUser, userToFollow));
            console.log("updating follower/ee counts");
            let followerCount = yield this.DAO.userDAO.updateFollowerCount(userToFollow.alias, 1);
            let followeeCount = yield this.DAO.userDAO.updateFolloweeCount(currentUser.alias, 1);
            console.log(followerCount);
            console.log(followeeCount);
            yield new Promise((f) => setTimeout(f, 2000));
            return [followerCount, followeeCount];
        });
    }
    ;
    unfollow(request) {
        return __awaiter(this, void 0, void 0, function* () {
            let authToken = tweeter_shared_1.AuthToken.fromJson(JSON.stringify(request.authToken));
            let currentUser = tweeter_shared_1.User.fromJson(JSON.stringify(request.currentUser));
            let userToFollow = tweeter_shared_1.User.fromJson(JSON.stringify(request.userToFollow));
            yield this.validateAuthToken(authToken);
            console.log("removing a follow");
            yield this.DAO.followsDAO.delete(new tweeter_shared_1.Follow(currentUser, userToFollow));
            console.log("updating follower/ee counts");
            let followerCount = yield this.DAO.userDAO.updateFollowerCount(userToFollow.alias, -1);
            let followeeCount = yield this.DAO.userDAO.updateFolloweeCount(currentUser.alias, -1);
            console.log(followerCount);
            console.log(followeeCount);
            yield new Promise((f) => setTimeout(f, 2000));
            return [followerCount, followeeCount];
        });
    }
    ;
    getIsFollowerStatus(request) {
        return __awaiter(this, void 0, void 0, function* () {
            let user = tweeter_shared_1.User.fromJson(JSON.stringify(request.user));
            let selectedUser = tweeter_shared_1.User.fromJson(JSON.stringify(request.selectedUser));
            let authToken = tweeter_shared_1.AuthToken.fromJson(JSON.stringify(request.authToken));
            yield this.validateAuthToken(authToken);
            let isFollower = yield this.DAO.followsDAO.get(new tweeter_shared_1.Follow(user, selectedUser));
            if (isFollower === null) {
                throw new Error("[Internal Server Error] Unknown error in getIsFollowerStatus");
            }
            return true;
        });
    }
    ;
}
exports.FollowService = FollowService;
