"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DAOFactory = void 0;
const AuthDAO_1 = require("./AuthDAO");
const FeedDAO_1 = require("./FeedDAO");
const StoryDAO_1 = require("./StoryDAO");
const UserDAO_1 = require("./UserDAO");
const FollowsDAO_1 = require("./FollowsDAO");
class DAOFactory {
    constructor() {
        this.authDAO = new AuthDAO_1.AuthDAO;
        this.userDAO = new UserDAO_1.UserDAO;
        this.feedDAO = new FeedDAO_1.FeedDAO;
        this.storyDAO = new StoryDAO_1.StoryDAO;
        this.followsDAO = new FollowsDAO_1.FollowsDAO;
    }
}
exports.DAOFactory = DAOFactory;
