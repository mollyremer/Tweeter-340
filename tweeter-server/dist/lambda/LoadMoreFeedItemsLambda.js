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
const StatusService_1 = require("../model/service/StatusService");
const DAOFactory_1 = require("../dao/djangoDao/DAOFactory");
const handler = (event) => __awaiter(void 0, void 0, void 0, function* () {
    let DAO = new DAOFactory_1.DAOFactory;
    console.log(event);
    let authToken = tweeter_shared_1.AuthToken.fromJson(JSON.stringify(event.authToken));
    let user = tweeter_shared_1.User.fromJson(JSON.stringify(event.user));
    let lastItem;
    if (event.lastItem != null) {
        let tempLastItem = tweeter_shared_1.Status.fromJson(JSON.stringify(event.lastItem));
        let userInsideStatus = tweeter_shared_1.User.fromJson(JSON.stringify(tempLastItem.user));
        lastItem = new tweeter_shared_1.Status(tempLastItem.post, userInsideStatus, tempLastItem.timestamp);
    }
    else {
        lastItem = null;
    }
    let request = new tweeter_shared_1.loadMoreStatusItemsRequest(authToken, user, event.pageSize, lastItem);
    //let request: loadMoreStatusItemsRequest = JSON.parse(JSON.stringify(event));
    console.log(request);
    let [response, hasMoreItems] = yield new StatusService_1.StatusService(DAO).loadMoreFeedItems(request);
    console.log(response);
    console.log(hasMoreItems);
    return new tweeter_shared_1.GetPageOfStatusesResponse(response, hasMoreItems, true);
});
exports.handler = handler;
