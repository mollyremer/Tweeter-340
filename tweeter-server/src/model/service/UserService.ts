import { User, AuthToken, FakeData, LoginRequest, RegisterRequest, LogoutRequest, GetUserRequest } from "tweeter-shared";

export class UserService{

    public async login(
        request: LoginRequest
    ): Promise<[User, AuthToken]> {
        if (request !instanceof LoginRequest){
            throw new Error("[Bad Request] Invalid alias or password");
        }
        
        // check request
        let user = FakeData.instance.firstUser;

        if (user === null) {
            throw new Error("[Internal Server Error] Invalid User");
        }

        return [user, FakeData.instance.authToken];
    };

    public async register(
        request: RegisterRequest
    ): Promise<[User, AuthToken]> {
        if (request !instanceof RegisterRequest){
            throw new Error("[Bad Request] Invalid alias or password");
        }

        let user = FakeData.instance.firstUser;

        if (user === null) {
            throw new Error("[Internal Server Error] Invalid User");
        }

        return [user, FakeData.instance.authToken];
    };

    public async logout(
        request: LogoutRequest
    ): Promise<void> {
        if (request !instanceof LogoutRequest){
            throw new Error("[Bad Request] Invalid authToken");
        }
        // Pause so we can see the logging out message. Delete when the call to the server is implemented.
        await new Promise((res) => setTimeout(res, 1000));
    };

    public async getUser(
        request: GetUserRequest
    ): Promise<User | null> {
        if (request !instanceof LogoutRequest){
            throw new Error("[Bad Request] Invalid alias");
        }
        // TODO: Replace with the result of calling server
        return FakeData.instance.findUserByAlias(request.alias);
    };
}


