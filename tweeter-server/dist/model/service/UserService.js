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
    login(request) {
        return __awaiter(this, void 0, void 0, function* () {
            if (request instanceof tweeter_shared_1.LoginRequest) {
                throw new Error("[Bad Request] Invalid alias or password");
            }
            // check request
            let user = tweeter_shared_1.FakeData.instance.firstUser;
            if (user === null) {
                throw new Error("[Internal Server Error] Invalid User");
            }
            return [user, tweeter_shared_1.FakeData.instance.authToken];
        });
    }
    ;
    register(request) {
        return __awaiter(this, void 0, void 0, function* () {
            if (request instanceof tweeter_shared_1.RegisterRequest) {
                throw new Error("[Bad Request] Invalid alias or password");
            }
            let user = tweeter_shared_1.FakeData.instance.firstUser;
            if (user === null) {
                throw new Error("[Internal Server Error] Invalid User");
            }
            return [user, tweeter_shared_1.FakeData.instance.authToken];
        });
    }
    ;
    logout(request) {
        return __awaiter(this, void 0, void 0, function* () {
            if (request instanceof tweeter_shared_1.LogoutRequest) {
                throw new Error("[Bad Request] Invalid authToken");
            }
            // Pause so we can see the logging out message. Delete when the call to the server is implemented.
            yield new Promise((res) => setTimeout(res, 1000));
        });
    }
    ;
    getUser(request) {
        return __awaiter(this, void 0, void 0, function* () {
            if (request instanceof tweeter_shared_1.LogoutRequest) {
                throw new Error("[Bad Request] Invalid alias");
            }
            // TODO: Replace with the result of calling server
            return tweeter_shared_1.FakeData.instance.findUserByAlias(request.alias);
        });
    }
    ;
}
exports.UserService = UserService;
