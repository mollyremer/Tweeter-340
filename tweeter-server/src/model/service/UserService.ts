import { User, AuthToken, FakeData, LoginRequest, RegisterRequest, LogoutRequest, GetUserRequest, GetIsFollowerStatusRequest, GetFolloweesCountRequest, PostStatusRequest, GetFollowerCountRequest, followToggleRequest } from "tweeter-shared";
import { DAOFactory } from "../../dao/djangoDao/DAOFactory";
import { Service } from "./Service";

export class UserService extends Service{
    public async login(
        request: LoginRequest
    ): Promise<[User, AuthToken]> {
        let user = await this.authenticateUser(request.username, request.password);
        let authToken = await this.DAO.authDAO.put(request.username, request.password);

        if ((user === null) || (authToken === null)) {
            throw new Error("[Internal Server Error] Invalid user or authToken");
        } 

        return [user, authToken];
    };

    public async register(
        request: RegisterRequest
    ): Promise<[User, AuthToken]> {
        let imageURL = await this.DAO.imageDAO.putImage((request.alias + "-profile-pic"), request.userImageBytes);
        await this.DAO.userDAO.put(new User(request.firstName, request.lastName, request.alias, imageURL), request.password);
        return await this.login(new LoginRequest(request.alias, request.password));
    };

    public async logout(
        request: LogoutRequest
    ): Promise<void> {
        console.log(request);
        await this.DAO.authDAO.delete(request.authToken.token);
        await new Promise((res) => setTimeout(res, 1000));
    };

    public async getUser(
        request: GetUserRequest
    ): Promise<User | null> {
        let user = await this.DAO.userDAO.getUser(request.alias);
        if (user === null){
            throw new Error("[Internal Server Error] Invalid alias")
        }

        return user;
    };

    public async getFollowerCount(
        request: GetFollowerCountRequest
    ): Promise<number> {
        console.log("requested count for" + request.user);
        let count = await this.DAO.userDAO.getFollowerCount(request.user.alias);
        console.log("followers =" + count);
        return count;
    };

    public async getFolloweesCount(
        request: GetFolloweesCountRequest
    ): Promise<number> {
        console.log("requested count for" + request.user.alias);
        let count = await this.DAO.userDAO.getFolloweeCount(request.user.alias);
        console.log("followees =" + count);
        return count;
    };
}



