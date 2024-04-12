"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DAOFactory = void 0;
const AuthDAO_1 = require("./AuthDAO");
const FeedDAO_1 = require("./FeedDAO");
const StoryDAO_1 = require("./StoryDAO");
const UserDAO_1 = require("./UserDAO");
const FollowsDAO_1 = require("./FollowsDAO");
const ImageDAO_1 = require("./ImageDAO");
const client_dynamodb_1 = require("@aws-sdk/client-dynamodb");
const lib_dynamodb_1 = require("@aws-sdk/lib-dynamodb");
class DAOFactory {
    constructor() {
        this.client = lib_dynamodb_1.DynamoDBDocumentClient.from(new client_dynamodb_1.DynamoDBClient());
        this.authDAO = new AuthDAO_1.AuthDAO(this.client);
        this.userDAO = new UserDAO_1.UserDAO(this.client);
        this.feedDAO = new FeedDAO_1.FeedDAO(this.client);
        this.storyDAO = new StoryDAO_1.StoryDAO(this.client);
        this.followsDAO = new FollowsDAO_1.FollowsDAO(this.client);
        this.imageDAO = new ImageDAO_1.ImageDAO();
    }
}
exports.DAOFactory = DAOFactory;
