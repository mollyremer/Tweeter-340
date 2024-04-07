import { AuthDAO } from "./AuthDAO";
import { AuthDAOInterface, FollowsDAOInterface, StatusDAOInterface, UserDAOInterface } from "./DAOInterfaces";
import { FeedDAO } from "./FeedDAO";
import { StoryDAO } from "./StoryDAO";
import { UserDAO } from "./UserDAO";
import { FollowsDAO } from "./FollowsDAO";

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

    // constructor(authDAO: AuthDAOInterface, userDAO: UserDAOInterface, feedDAO: StatusDAOInterface, storyDAO: StatusDAOInterface, followsDAO: FollowsDAOInterface){
    //     this.authDAO = authDAO;
    //     this.userDAO = userDAO;
    //     this.feedDAO = feedDAO;
    //     this.storyDAO = storyDAO;
    //     this.followsDAO = followsDAO;
    // }

    constructor(){
        this.authDAO = new AuthDAO;
        this.userDAO = new UserDAO;
        this.feedDAO = new FeedDAO;
        this.storyDAO = new StoryDAO;
        this.followsDAO = new FollowsDAO;
    }
}
