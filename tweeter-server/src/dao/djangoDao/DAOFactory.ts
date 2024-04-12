import { AuthDAO } from "./AuthDAO";
import { AuthDAOInterface, FollowsDAOInterface, ImageDAOInterface, StatusDAOInterface, UserDAOInterface } from "./DAOInterfaces";
import { FeedDAO } from "./FeedDAO";
import { StoryDAO } from "./StoryDAO";
import { UserDAO } from "./UserDAO";
import { FollowsDAO } from "./FollowsDAO";
import { ImageDAO } from "./ImageDAO";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

export interface DAOFactoryInterface {
    authDAO: AuthDAOInterface;
    userDAO: UserDAOInterface;
    feedDAO: StatusDAOInterface;
    storyDAO: StatusDAOInterface;
    followsDAO: FollowsDAOInterface;
    imageDAO: ImageDAOInterface;
}

export class DAOFactory implements DAOFactoryInterface{
    public authDAO: AuthDAOInterface;
    public userDAO: UserDAOInterface;
    public feedDAO: StatusDAOInterface;
    public storyDAO: StatusDAOInterface;
    public followsDAO: FollowsDAOInterface;
    public imageDAO: ImageDAOInterface;

    private client = DynamoDBDocumentClient.from(new DynamoDBClient());

    constructor(){
        this.authDAO = new AuthDAO(this.client);
        this.userDAO = new UserDAO(this.client);
        this.feedDAO = new FeedDAO(this.client);
        this.storyDAO = new StoryDAO(this.client);
        this.followsDAO = new FollowsDAO(this.client);
        this.imageDAO = new ImageDAO();
    }
}
