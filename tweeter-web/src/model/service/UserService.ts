import { AuthToken, User, Status, FakeData, LoginRequest, AuthenticateResponse, RegisterRequest } from "tweeter-shared";
import { Buffer } from "buffer";
import { ServerFacade } from "../net/ServerFacade";

export class UserService {
    private server = new ServerFacade;

    public async getUser(
        authToken: AuthToken,
        alias: string
    ): Promise<User | null> {
        // TODO: Replace with the result of calling server
        return FakeData.instance.findUserByAlias(alias);
    };

    public async getIsFollowerStatus(
        authToken: AuthToken,
        user: User,
        selectedUser: User
    ): Promise<boolean> {
        // TODO: Replace with the result of calling server
        return FakeData.instance.isFollower();
    };

    public async getFolloweesCount(
        authToken: AuthToken,
        user: User
    ): Promise<number> {
        // TODO: Replace with the result of calling server
        return FakeData.instance.getFolloweesCount(user);
    };

    public async getFollowersCount(
        authToken: AuthToken,
        user: User
    ): Promise<number> {
        // TODO: Replace with the result of calling server
        return FakeData.instance.getFollowersCount(user);
    };

    public async login(
        alias: string,
        password: string
    ): Promise<[User, AuthToken]> {
        // TODO: Replace with the result of calling the server
        //let user = FakeData.instance.firstUser;
        let response = this.server.login(new LoginRequest(alias, password))

        let user = (await response).user

        if (user === null) {
            throw new Error("Invalid alias or password");
        }

        return [user, FakeData.instance.authToken];
    };

    public async register(
        firstName: string,
        lastName: string,
        alias: string,
        password: string,
        userImageBytes: Uint8Array
    ): Promise<[User, AuthToken]> {
        // Not neded now, but will be needed when you make the request to the server in milestone 3
        let imageStringBase64: string =
        Buffer.from(userImageBytes).toString("base64");

        // TODO: Replace with the result of calling the server
        // let user = FakeData.instance.firstUser;
        let response = this.server.register(new RegisterRequest(firstName, lastName, alias, password, userImageBytes));

        let user = (await response).user

        if (user === null) {
            throw new Error("Invalid registration");
        }

        return [user, FakeData.instance.authToken];
    };

    public async logout(authToken: AuthToken): Promise<void> {
        // Pause so we can see the logging out message. Delete when the call to the server is implemented.
        //await new Promise((res) => setTimeout(res, 1000));
    };

    public async postStatus(
        authToken: AuthToken,
        newStatus: Status
    ): Promise<void> {
        // Pause so we can see the logging out message. Remove when connected to the server
        await new Promise((f) => setTimeout(f, 2000));

        // TODO: Call the server to post the status
    };

    
}