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
exports.loginHandler = void 0;
const tweeter_shared_1 = require("tweeter-shared");
const UserService_1 = require("../model/service/UserService");
const loginHandler = (event) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let [user, authToken] = yield new UserService_1.UserService().login(event.username, event.password);
        return new tweeter_shared_1.AuthenticateResponse(user, authToken);
    }
    catch (error) {
        if (error instanceof Error) {
            return new tweeter_shared_1.BadResponse(error.message);
        }
        else {
            return new tweeter_shared_1.BadResponse("Error: an unknown error occured");
        }
    }
});
exports.loginHandler = loginHandler;