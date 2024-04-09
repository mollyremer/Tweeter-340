import { User, AuthToken, FakeData, LoginRequest, RegisterRequest, LogoutRequest, GetUserRequest, GetIsFollowerStatusRequest, GetFolloweesCountRequest, PostStatusRequest, GetFollowerCountRequest, followToggleRequest } from "tweeter-shared";
import { DAOFactory } from "../../dao/DAOFactory";

export class UserService{
    private DAO: DAOFactory = new DAOFactory;

    public async login(
        request: LoginRequest
    ): Promise<[User, AuthToken]> {
        let user = await this.DAO.userDAO.getUser(request.username);
        let authToken = await this.DAO.authDAO.put(request.password);

        if ((user === null) || (authToken === null)) {
            throw new Error("[Internal Server Error] Invalid user or authToken");
        } 

        return [user, authToken];
    };

    public async register(
        request: RegisterRequest
    ): Promise<[User, AuthToken]> {
        await this.DAO.userDAO.put(new User(request.firstName, request.lastName, request.alias, request.userImageBytes), request.password);
        let user = await this.DAO.userDAO.getUser(request.alias)
        let authToken = await this.DAO.authDAO.put(request.password);

        if ((user === null) || (authToken === null)) {
            throw new Error("[Internal Server Error] Invalid user or authToken");
        } 

        return [user, authToken];
    };

    public async logout(
        request: LogoutRequest
    ): Promise<void> {
        await this.DAO.authDAO.delete(request.authToken.token);
        await new Promise((res) => setTimeout(res, 1000));
    };

    public async getUser(
        request: GetUserRequest
    ): Promise<User | null> {
        let alias = await this.DAO.userDAO.getUser(request.alias);
        if (alias === null){
            throw new Error("[Internal Server Error] Invalid alias")
        }

        return alias;
    };

    public async getFollowerCount(
        request: GetFollowerCountRequest
    ): Promise<number> {
        let count = await this.DAO.userDAO.getFollowerCount(request.user.alias);
        return count;
    };

    public async getFolloweesCount(
        request: GetFolloweesCountRequest
    ): Promise<number> {
        let count = await this.DAO.userDAO.getFollowerCount(request.user.alias);
        return count;
    };
}



