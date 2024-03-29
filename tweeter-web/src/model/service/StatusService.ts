import { AuthToken, User, Status, FakeData } from "tweeter-shared";
import { ServerFacade } from "../net/ServerFacade";
import { loadMoreStatusItemsRequest } from "tweeter-shared/dist/model/net/TweeterRequest";

export class StatusService {
    private server = new ServerFacade

    public async loadMoreFeedItems(
        authToken: AuthToken,
        user: User,
        pageSize: number,
        lastItem: Status | null
    ): Promise<[Status[], boolean]> {
        let response = await this.server.loadMoreFeedItems(new loadMoreStatusItemsRequest(authToken, user, pageSize, lastItem));
        return [response.statuses, response.hasMorePages];
    };

    public async loadMoreStoryItems(
        authToken: AuthToken,
        user: User,
        pageSize: number,
        lastItem: Status | null
    ): Promise<[Status[], boolean]> {
        let response = await this.server.loadMoreStoryItems(new loadMoreStatusItemsRequest(authToken, user, pageSize, lastItem));
        return [response.statuses, response.hasMorePages];
    };
}