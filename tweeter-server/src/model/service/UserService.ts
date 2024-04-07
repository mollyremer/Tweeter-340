import { User, AuthToken, FakeData, LoginRequest, RegisterRequest, LogoutRequest, GetUserRequest, GetIsFollowerStatusRequest, GetFolloweesCountRequest, PostStatusRequest, GetFollowerCountRequest, followToggleRequest } from "tweeter-shared";

export class UserService{
    public async login(
        request: LoginRequest
    ): Promise<[User, AuthToken]> {
        if (request !instanceof LoginRequest){
            throw new Error("[Bad Request] Invalid alias or password");
        }

        let user = FakeData.instance.firstUser;
        let authToken = FakeData.instance.authToken;

        if ((user === null) || (authToken === null)) {
            throw new Error("[Internal Server Error] Invalid user or authToken");
        }

        return [user, authToken];
    };

    public async register(
        request: RegisterRequest
    ): Promise<[User, AuthToken]> {
        if (request !instanceof RegisterRequest){
            throw new Error("[Bad Request] Invalid alias or password");
        }

        let user = FakeData.instance.firstUser;
        let authToken = FakeData.instance.authToken;

        if ((user === null) || (authToken === null)) {
            throw new Error("[Internal Server Error] Invalid user or authToken");
        }

        return [user, authToken];
    };

    public async logout(
        request: LogoutRequest
    ): Promise<void> {
        if (request !instanceof LogoutRequest){
            throw new Error("[Bad Request] Invalid authToken");
        }

        await new Promise((res) => setTimeout(res, 1000));
    };

    public async getUser(
        request: GetUserRequest
    ): Promise<User | null> {
        // if (request !instanceof GetUserRequest){
        //     throw new Error("[Bad Request] Invalid alias");
        // }

        let alias = FakeData.instance.findUserByAlias(request.alias);

        if (alias === null){
            throw new Error("[Internal Server Error] Invalid alias")
        }

        return alias;
    };

    public async getFollowerCount(
        request: GetFollowerCountRequest
    ): Promise<number> {
        
        let count = FakeData.instance.getFollowersCount(request.user);
        return count;
    };

    public async getFolloweesCount(
        request: GetFolloweesCountRequest
    ): Promise<number> {
        let count = FakeData.instance.getFolloweesCount(request.user);
        return count;
    };
}



