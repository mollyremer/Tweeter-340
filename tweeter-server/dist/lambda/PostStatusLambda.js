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
    let tempNewStatus = tweeter_shared_1.Status.fromJson(JSON.stringify(event.newStatus));
    let userInsideStatus = tweeter_shared_1.User.fromJson(JSON.stringify(tempNewStatus.user));
    let newStatus = new tweeter_shared_1.Status(tempNewStatus.post, userInsideStatus, tempNewStatus.timestamp);
    let request = new tweeter_shared_1.PostStatusRequest(authToken, newStatus);
    //let request = JSON.parse(JSON.stringify(event));
    console.log(request);
    yield new StatusService_1.StatusService(DAO).postStatus(request);
    return new tweeter_shared_1.TweeterResponse(true);
});
exports.handler = handler;
