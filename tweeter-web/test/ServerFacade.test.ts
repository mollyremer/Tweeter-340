import { AuthToken, RegisterRequest, User } from "tweeter-shared";
import { ServerFacade } from "../src/model/net/ServerFacade";
import { GetFollowerCountRequest, loadMoreFollowsRequest } from "tweeter-shared/dist/model/net/TweeterRequest";
import 'isomorphic-fetch';

describe("ServerFacade", () => {
    let serverFacade: ServerFacade = new ServerFacade;

    let user: User = new User("Allen", "Anderson", "@allen", "https://faculty.cs.byu.edu/~jwilkerson/cs340/tweeter/images/donald_duck.png");
    let authToken: AuthToken = new AuthToken("123", 123);

    it("should register a user", async () => {
        let request: RegisterRequest = new RegisterRequest("Mary", "Jane", "@maryJane", "pass123", "https://faculty.cs.byu.edu/~jwilkerson/cs340/tweeter/images/donald_duck.png");
        let response = await serverFacade.register(request);

        expect(response.user).toEqual(user);
        expect(response.token).not.toBeNull;
        expect(response.success).toBeTruthy;
        expect(response.message).toBeNull;
    });

    it("should getFollowers", async () => {
        let request: loadMoreFollowsRequest = new loadMoreFollowsRequest(authToken, user, 1, null);
        let response = await serverFacade.loadMoreFollowers(request);

        expect(response.hasMorePages).toBeFalsy;
        expect(response.message).toBeNull;
        expect(response.success).toBeTruthy;
        expect(response.users).toBeInstanceOf(Array);
    });

    it("should getFollowersCount", async () => {
        let request: GetFollowerCountRequest = new GetFollowerCountRequest(authToken, user);
        let response = await serverFacade.getFollowerCount(request);

        expect(response.count).toBe(20);
        expect(response.message).toBeNull;
        expect(response.success).toBeTruthy;
    });

})