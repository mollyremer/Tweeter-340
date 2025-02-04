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
const FollowService_1 = require("../model/service/FollowService");
const DAOFactory_1 = require("../dao/djangoDao/DAOFactory");
const handler = (event) => __awaiter(void 0, void 0, void 0, function* () {
    let DAO = new DAOFactory_1.DAOFactory;
    console.log(event);
    //let request = JSON.parse(JSON.stringify(event));
    let currentUser = tweeter_shared_1.User.fromJson(JSON.stringify(event.currentUser));
    let userToFollow = tweeter_shared_1.User.fromJson(JSON.stringify(event.userToFollow));
    let authToken = tweeter_shared_1.AuthToken.fromJson(JSON.stringify(event.authToken));
    let request = new tweeter_shared_1.followToggleRequest(currentUser, userToFollow, authToken);
    console.log(request);
    let [followerCount, followeeCount] = yield new FollowService_1.FollowService(DAO).follow(request);
    console.log(followerCount);
    console.log(followeeCount);
    return new tweeter_shared_1.FollowToggleResponse(followerCount, followeeCount, true);
});
exports.handler = handler;
