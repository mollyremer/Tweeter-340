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
exports.UserService = void 0;
const tweeter_shared_1 = require("tweeter-shared");
class UserService {
    follow(request) {
        return __awaiter(this, void 0, void 0, function* () {
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
    login(request) {
        return __awaiter(this, void 0, void 0, function* () {
            if (request instanceof tweeter_shared_1.LoginRequest) {
                throw new Error("[Bad Request] Invalid alias or password");
            }
            let user = tweeter_shared_1.FakeData.instance.firstUser;
            let authToken = tweeter_shared_1.FakeData.instance.authToken;
            if ((user === null) || (authToken === null)) {
                throw new Error("[Internal Server Error] Invalid user or authToken");
            }
            return [user, authToken];
        });
    }
    ;
    register(request) {
        return __awaiter(this, void 0, void 0, function* () {
            if (request instanceof tweeter_shared_1.RegisterRequest) {
                throw new Error("[Bad Request] Invalid alias or password");
            }
            let user = tweeter_shared_1.FakeData.instance.firstUser;
            let authToken = tweeter_shared_1.FakeData.instance.authToken;
            if ((user === null) || (authToken === null)) {
                throw new Error("[Internal Server Error] Invalid user or authToken");
            }
            return [user, authToken];
        });
    }
    ;
    logout(request) {
        return __awaiter(this, void 0, void 0, function* () {
            if (request instanceof tweeter_shared_1.LogoutRequest) {
                throw new Error("[Bad Request] Invalid authToken");
            }
            yield new Promise((res) => setTimeout(res, 1000));
        });
    }
    ;
    getUser(request) {
        return __awaiter(this, void 0, void 0, function* () {
            // if (request !instanceof GetUserRequest){
            //     throw new Error("[Bad Request] Invalid alias");
            // }
            let alias = tweeter_shared_1.FakeData.instance.findUserByAlias(request.alias);
            if (alias === null) {
                throw new Error("[Internal Server Error] Invalid alias");
            }
            return alias;
        });
    }
    ;
    getIsFollowerStatus(request) {
        return __awaiter(this, void 0, void 0, function* () {
            if (request instanceof tweeter_shared_1.GetIsFollowerStatusRequest) {
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
    postStatus(request) {
        return __awaiter(this, void 0, void 0, function* () {
            if (request instanceof tweeter_shared_1.PostStatusRequest) {
                throw new Error("[Bad Request] Invalid request");
            }
            yield new Promise((f) => setTimeout(f, 2000));
        });
    }
    ;
    getFollowerCount(request) {
        return __awaiter(this, void 0, void 0, function* () {
            let count = tweeter_shared_1.FakeData.instance.getFollowersCount(request.user);
            return count;
        });
    }
    ;
    getFolloweesCount(request) {
        return __awaiter(this, void 0, void 0, function* () {
            let count = tweeter_shared_1.FakeData.instance.getFolloweesCount(request.user);
            return count;
        });
    }
    ;
}
exports.UserService = UserService;
