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
const TweeterResponse_1 = require("tweeter-shared/dist/model/net/TweeterResponse");
const DAOFactory_1 = require("../dao/djangoDao/DAOFactory");
const handler = (event) => __awaiter(void 0, void 0, void 0, function* () {
    let DAO = new DAOFactory_1.DAOFactory;
    let authToken = tweeter_shared_1.AuthToken.fromJson(JSON.stringify(event.authToken));
    let user = tweeter_shared_1.User.fromJson(JSON.stringify(event.user));
    let lastItem = tweeter_shared_1.User.fromJson(JSON.stringify(event.lastItem));
    let request = new tweeter_shared_1.loadMoreFollowsRequest(authToken, user, event.pageSize, lastItem);
    //let request = JSON.parse(JSON.stringify(event));
    console.log(request);
    return new TweeterResponse_1.GetPageOfUsersResponse(...yield new FollowService_1.FollowService(DAO).loadMoreFollowees(request), true);
});
exports.handler = handler;
