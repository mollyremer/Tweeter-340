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
const TweeterRequest_1 = require("tweeter-shared/dist/model/net/TweeterRequest");
const DAOFactory_1 = require("../../dao/DAOFactory");
class FollowService {
    constructor() {
        this.DAO = new DAOFactory_1.DAOFactory;
    }
    loadMoreFollowers(request) {
        return __awaiter(this, void 0, void 0, function* () {
            let page = yield this.DAO.followsDAO.getPageOfFollowers(request.user.alias, request.pageSize, request.lastItem.alias);
            if ((page.values === null) || (page.hasMorePages === null)) {
                throw new Error("[Internal Server Error] Invalid user or authToken");
            }
            return [page.values, page.hasMorePages];
        });
    }
    ;
    loadMoreFollowees(request) {
        return __awaiter(this, void 0, void 0, function* () {
            let page = yield this.DAO.followsDAO.getPageOfFollowers(request.user.alias, request.pageSize, request.lastItem.alias);
            if ((page.values === null) || (page.hasMorePages === null)) {
                throw new Error("[Internal Server Error] Invalid user or authToken");
            }
            return [page.values, page.hasMorePages];
        });
    }
    ;
    follow(request) {
        return __awaiter(this, void 0, void 0, function* () {
            let authToken = yield this.DAO.authDAO.get(request.authToken.token);
            if (authToken === null) {
                throw new Error("[Bad Request] Invalid authToken, please log back in");
            }
            yield this.DAO.followsDAO.put(new tweeter_shared_1.Follow());
            yield new Promise((f) => setTimeout(f, 2000));
            return;
        });
    }
    ;
    unfollow(request) {
        return __awaiter(this, void 0, void 0, function* () {
            yield new Promise((f) => setTimeout(f, 2000));
            return;
        });
    }
    ;
    getIsFollowerStatus(request) {
        return __awaiter(this, void 0, void 0, function* () {
            if (request instanceof TweeterRequest_1.GetIsFollowerStatusRequest) {
                throw new Error("[Bad Request] Invalid authToken or user");
            }
            let isFollower = tweeter_shared_1.FakeData.instance.isFollower();
            if (isFollower === null) {
                throw new Error("[Internal Server Error] Unknown error in getIsFollowerStatus");
            }
            return isFollower;
        });
    }
    ;
}
exports.FollowService = FollowService;
