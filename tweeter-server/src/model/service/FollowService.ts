import { AuthToken, User, FakeData } from "tweeter-shared";
import { loadMoreFollowsRequest } from "tweeter-shared/dist/model/net/TweeterRequest";

export class FollowService {
    public async loadMoreFollowers(
        request: loadMoreFollowsRequest
    ): Promise<[User[], boolean]> {
        let [users, hasMorePages] = FakeData.instance.getPageOfUsers(request.lastItem, request.pageSize, null);
        if ((users === null) || (hasMorePages === null)) {
            throw new Error("[Internal Server Error] Invalid user or authToken");
        }

        return [users, hasMorePages];
    };

    public async loadMoreFollowees(
        request: loadMoreFollowsRequest
    ): Promise<[User[], boolean]> {
        let [users, hasMorePages] = FakeData.instance.getPageOfUsers(request.lastItem, request.pageSize, null);
        if ((users === null) || (hasMorePages === null)) {
            throw new Error("[Internal Server Error] Invalid user or authToken");
        }

        return [users, hasMorePages];
    };

}