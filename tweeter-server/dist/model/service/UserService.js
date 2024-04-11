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
const Service_1 = require("./Service");
class UserService extends Service_1.Service {
    login(request) {
        return __awaiter(this, void 0, void 0, function* () {
            let user = yield this.DAO.userDAO.getUser(request.username);
            let authToken = yield this.DAO.authDAO.put(request.username, request.password);
            yield this.authenticateUser(request.username, request.password);
            if ((user === null) || (authToken === null)) {
                throw new Error("[Internal Server Error] Invalid user or authToken");
            }
            return [user, authToken];
        });
    }
    ;
    register(request) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.DAO.userDAO.put(new tweeter_shared_1.User(request.firstName, request.lastName, request.alias, request.userImageBytes), request.password);
            return this.login(new tweeter_shared_1.LoginRequest(request.alias, request.password));
        });
    }
    ;
    logout(request) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.DAO.authDAO.delete(request.authToken.token);
            yield new Promise((res) => setTimeout(res, 1000));
        });
    }
    ;
    getUser(request) {
        return __awaiter(this, void 0, void 0, function* () {
            let alias = yield this.DAO.userDAO.getUser(request.alias);
            if (alias === null) {
                throw new Error("[Internal Server Error] Invalid alias");
            }
            return alias;
        });
    }
    ;
    getFollowerCount(request) {
        return __awaiter(this, void 0, void 0, function* () {
            let count = yield this.DAO.userDAO.getFollowerCount(request.user.alias);
            return count;
        });
    }
    ;
    getFolloweesCount(request) {
        return __awaiter(this, void 0, void 0, function* () {
            let count = yield this.DAO.userDAO.getFollowerCount(request.user.alias);
            return count;
        });
    }
    ;
}
exports.UserService = UserService;
