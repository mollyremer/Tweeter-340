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
exports.StatusService = void 0;
const tweeter_shared_1 = require("tweeter-shared");
const Service_1 = require("./Service");
class StatusService extends Service_1.Service {
    loadMoreFeedItems(request) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(request);
            let page = yield this.DAO.feedDAO.getPage(request.user.alias, request.pageSize);
            console.log(page.values);
            console.log(page.hasMorePages);
            if (((page.values) === null) || (page.hasMorePages === null)) {
                throw new Error("[Internal Server Error] Invalid user or authToken");
            }
            return [page.values, page.hasMorePages];
        });
    }
    ;
    loadMoreStoryItems(request) {
        return __awaiter(this, void 0, void 0, function* () {
            let page = yield this.DAO.feedDAO.getPage(request.user.alias, request.pageSize);
            if ((page.values === null) || (page.hasMorePages === null)) {
                throw new Error("[Internal Server Error] Invalid user or authToken");
            }
            return [page.values, page.hasMorePages];
        });
    }
    ;
    postStatus(request) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(request);
            let authToken = yield this.DAO.authDAO.get(request.authToken.token);
            if (authToken === null) {
                throw new Error("[Internal Server Error] Invalid authToken");
            }
            yield this.DAO.storyDAO.put(new tweeter_shared_1.Status(request.newStatus.post, request.newStatus.user, request.newStatus.timestamp), request.newStatus.user.alias);
            yield this.DAO.feedDAO.put(new tweeter_shared_1.Status(request.newStatus.post, request.newStatus.user, request.newStatus.timestamp), request.newStatus.user.alias);
            yield new Promise((f) => setTimeout(f, 2000));
        });
    }
    ;
}
exports.StatusService = StatusService;
