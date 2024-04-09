import { AuthDAO } from "./djangoDao/AuthDAO";
import { AuthDAOInterface, FollowsDAOInterface, StatusDAOInterface, UserDAOInterface } from "./DAOInterfaces";
import { FeedDAO } from "./djangoDao/FeedDAO";
import { StoryDAO } from "./djangoDao/StoryDAO";
import { UserDAO } from "./djangoDao/UserDAO";
import { FollowsDAO } from "./djangoDao/FollowsDAO";

export interface DAOFactoryInterface {
    authDAO: AuthDAOInterface;
    userDAO: UserDAOInterface;
    feedDAO: StatusDAOInterface;
    storyDAO: StatusDAOInterface;
    followsDAO: FollowsDAOInterface;
}

export class DAOFactory implements DAOFactoryInterface{
    public authDAO: AuthDAOInterface;
    public userDAO: UserDAOInterface;
    public feedDAO: StatusDAOInterface;
    public storyDAO: StatusDAOInterface;
    public followsDAO: FollowsDAOInterface;

    constructor(){
        this.authDAO = new AuthDAO;
        this.userDAO = new UserDAO;
        this.feedDAO = new FeedDAO;
        this.storyDAO = new StoryDAO;
        this.followsDAO = new FollowsDAO;
    }
}
