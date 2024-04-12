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
exports.Service = void 0;
class Service {
    constructor(DAO) {
        this.DAO = DAO;
    }
    authenticateUser(alias, password) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("Authenticating user....");
            const user = yield this.DAO.userDAO.getUser(alias);
            const hash = yield this.DAO.userDAO.getPassword(alias);
            const salt = yield this.DAO.userDAO.getSalt(alias);
            if (user === null) {
                throw new Error("[Bad Request] User not found");
            }
            let bcrypt = require('bcryptjs');
            let authenticated = bcrypt.compareSync(password, hash);
            if (!authenticated) {
                throw new Error("[Bad Request] Invalid username or password");
            }
            else {
                console.log("Authenticated");
            }
            return user;
        });
    }
    validateAuthToken(authToken) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("validating auth token...");
            console.log(authToken);
            let databaseAuthToken = yield this.DAO.authDAO.get(authToken.token);
            console.log(databaseAuthToken);
            if ((databaseAuthToken === null) || ((databaseAuthToken === null || databaseAuthToken === void 0 ? void 0 : databaseAuthToken.timestamp) === undefined)) {
                throw new Error("[Bad Request] Invalid authToken, please log back in");
            }
            let currentTime = new Date().getTime();
            let difference = currentTime - (databaseAuthToken === null || databaseAuthToken === void 0 ? void 0 : databaseAuthToken.timestamp);
            // Number of milliseconds in a day 
            const oneDayInMilliseconds = 24 * 60 * 60 * 1000;
            // Check if the difference is greater than one day
            if (difference > oneDayInMilliseconds) {
                throw new Error("[Bad Request] Authtoken is more than a day old, please log back in");
            }
            else {
                console.log("validated");
            }
        });
    }
}
exports.Service = Service;
