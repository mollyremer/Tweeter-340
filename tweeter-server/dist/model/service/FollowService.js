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
exports.FollowService = void 0;
const tweeter_shared_1 = require("tweeter-shared");
class FollowService {
    loadMoreFollowers(request) {
        return __awaiter(this, void 0, void 0, function* () {
            let [users, hasMorePages] = tweeter_shared_1.FakeData.instance.getPageOfUsers(request.lastItem, request.pageSize, null);
            if ((users === null) || (hasMorePages === null)) {
                throw new Error("[Internal Server Error] Invalid user or authToken");
            }
            return [users, hasMorePages];
        });
    }
    ;
    loadMoreFollowees(request) {
        return __awaiter(this, void 0, void 0, function* () {
            let [users, hasMorePages] = tweeter_shared_1.FakeData.instance.getPageOfUsers(request.lastItem, request.pageSize, null);
            if ((users === null) || (hasMorePages === null)) {
                throw new Error("[Internal Server Error] Invalid user or authToken");
            }
            return [users, hasMorePages];
        });
    }
    ;
}
exports.FollowService = FollowService;
