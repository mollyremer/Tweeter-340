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
exports.handler = void 0;
const tweeter_shared_1 = require("tweeter-shared");
const UserService_1 = require("../model/service/UserService");
const DAOFactory_1 = require("../dao/djangoDao/DAOFactory");
const handler = (event) => __awaiter(void 0, void 0, void 0, function* () {
    let DAO = new DAOFactory_1.DAOFactory;
    let authToken = tweeter_shared_1.AuthToken.fromJson(JSON.stringify(event.authToken));
    let alias = JSON.stringify(event.alias);
    let request = new tweeter_shared_1.GetUserRequest(authToken, alias);
    //let request = JSON.parse(JSON.stringify(event));
    console.log(request);
    let response = yield new UserService_1.UserService(DAO).getUser(request);
    console.log(response);
    return new tweeter_shared_1.GetUserResponse(response, true);
});
exports.handler = handler;
