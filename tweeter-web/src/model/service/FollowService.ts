import { AuthToken, User, FakeData } from "tweeter-shared";
import { ServerFacade } from "../net/ServerFacade";
import { loadMoreFollowsRequest } from "tweeter-shared/dist/model/net/TweeterRequest";

export class FollowService {
    private server = new ServerFacade;

    public async loadMoreFollowers(
        authToken: AuthToken,
        user: User,
        pageSize: number,
        lastItem: User | null
    ): Promise<[User[], boolean]> {
        let response = await this.server.loadMoreFollowers(new loadMoreFollowsRequest(authToken, user, pageSize, lastItem));
        return [response.users, response.hasMorePages];
    };

    public async loadMoreFollowees(
        authToken: AuthToken,
        user: User,
        pageSize: number,
        lastItem: User | null
    ): Promise<[User[], boolean]> {
        let response = await this.server.loadMoreFollowees(new loadMoreFollowsRequest(authToken, user, pageSize, lastItem));
        return [response.users, response.hasMorePages];
    };

    

}