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
const FollowService_1 = require("../model/service/FollowService");
const TweeterResponse_1 = require("tweeter-shared/dist/model/net/TweeterResponse");
const handler = (event) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let request = JSON.parse(JSON.stringify(event));
        return new TweeterResponse_1.GetPageOfUsersResponse(...yield new FollowService_1.FollowService().loadMoreFollowees(request), true);
    }
    catch (error) {
        let badUsers = [];
        if (error instanceof Error) {
            return new TweeterResponse_1.GetPageOfUsersResponse(badUsers, false, false, error.message);
        }
        else {
            return new TweeterResponse_1.GetPageOfUsersResponse(badUsers, false, false);
        }
    }
});
exports.handler = handler;
