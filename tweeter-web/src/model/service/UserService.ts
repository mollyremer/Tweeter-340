import { AuthToken, User, Status, FakeData, LoginRequest, AuthenticateResponse, RegisterRequest, GetUserRequest, GetIsFollowerStatusRequest, GetFolloweesCountRequest, GetFollowerCountRequest, PostStatusRequest, LogoutRequest } from "tweeter-shared";
import { Buffer } from "buffer";
import { ServerFacade } from "../net/ServerFacade";

export class UserService {
    private server = new ServerFacade;

    public async follow(
        authToken: AuthToken,
        userToFollow: User
    ): Promise<[followersCount: number, followeesCount: number]> {
        let followersCountResponse = await this.server.getFollowerCount(new GetFollowerCountRequest(authToken, userToFollow));
        let followeesCountResponse = await this.server.getFolloweesCount(new GetFolloweesCountRequest(authToken, userToFollow));

        let followersCount = followersCountResponse.count;
        let followeesCount = followeesCountResponse.count;
        return [followersCount, followeesCount];
    };

    public async unfollow(
        authToken: AuthToken,
        userToUnfollow: User
    ): Promise<[followersCount: number, followeesCount: number]> {
        let followersCountResponse = await this.server.getFollowerCount(new GetFollowerCountRequest(authToken, userToUnfollow));
        let followeesCountResponse = await this.server.getFolloweesCount(new GetFolloweesCountRequest(authToken, userToUnfollow));

        let followersCount = followersCountResponse.count;
        let followeesCount = followeesCountResponse.count;
        return [followersCount, followeesCount];
    };

    public async getUser(
        authToken: AuthToken,
        alias: string
    ): Promise<User | null> {
        let response = await this.server.getUser(new GetUserRequest(authToken, alias));
        let user = response.user;
        return user;
    };

    public async getIsFollowerStatus(
        authToken: AuthToken,
        user: User,
        selectedUser: User
    ): Promise<boolean> {
        let response = await this.server.getIsFollowerStatus(new GetIsFollowerStatusRequest(authToken, user, selectedUser));
        let isFollower = response.isFollower;
        return isFollower;
    };

    public async getFolloweesCount(
        authToken: AuthToken,
        user: User
    ): Promise<number> {
        let response = await this.server.getFolloweesCount(new GetFolloweesCountRequest(authToken, user));
        let followees = response.count;
        return followees;
    };

    public async getFollowersCount(
        authToken: AuthToken,
        user: User
    ): Promise<number> {
        let response = await this.server.getFollowerCount(new GetFollowerCountRequest(authToken, user));
        let followers = response.count;
        return followers;
    };

    public async login(
        alias: string,
        password: string
    ): Promise<[User, AuthToken]> {
        let response = await this.server.login(new LoginRequest(alias, password))

        let user = response.user;
        let authToken = response.token;

        if ((user === null) || (authToken === null)) {
            throw new Error("Invalid alias or password");
        }

        return [user, authToken];
    };

    public async register(
        firstName: string,
        lastName: string,
        alias: string,
        password: string,
        userImageBytes: Uint8Array
    ): Promise<[User, AuthToken]> {
        let imageStringBase64: string =
        Buffer.from(userImageBytes).toString("base64");

        let response = await this.server.register(new RegisterRequest(firstName, lastName, alias, password, imageStringBase64));

        let user = response.user;
        let authToken = response.token;

        if ((user === null) || (authToken === null)) {
            throw new Error("Invalid registration");
        }

        return [user, authToken];
    };

    public async logout(authToken: AuthToken): Promise<void> {
        let response = await this.server.logout(new LogoutRequest(authToken));
        //await new Promise((res) => setTimeout(res, 1000));
    };

    public async postStatus(
        authToken: AuthToken,
        newStatus: Status
    ): Promise<void> {
        let response = await this.server.postStatus(new PostStatusRequest(authToken, newStatus));
        // Pause so we can see the logging out message. Remove when connected to the server
        //await new Promise((f) => setTimeout(f, 2000));
    };

    
}