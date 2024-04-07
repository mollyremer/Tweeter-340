import { AuthToken, User, FakeData } from "tweeter-shared";
import { GetIsFollowerStatusRequest, followToggleRequest, loadMoreFollowsRequest } from "tweeter-shared/dist/model/net/TweeterRequest";

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

    public async follow(
        request: followToggleRequest
    ): Promise<void> {
        await new Promise((f) => setTimeout(f, 2000));
        return;
    };

    public async unfollow(
        request: followToggleRequest
    ): Promise<void> {
        await new Promise((f) => setTimeout(f, 2000));
        return;
    };

    public async getIsFollowerStatus(
        request: GetIsFollowerStatusRequest
    ): Promise<boolean> {
        if (request! instanceof GetIsFollowerStatusRequest) {
            throw new Error("[Bad Request] Invalid authToken or user");
        }

        let isFollower = FakeData.instance.isFollower();

        if (isFollower === null) {
            throw new Error("[Internal Server Error] Unknown error in getIsFollowerStatus")
        }

        return isFollower;
    };

}