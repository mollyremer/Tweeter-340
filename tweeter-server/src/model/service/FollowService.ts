import { AuthToken, User, FakeData, Follow } from "tweeter-shared";
import { GetIsFollowerStatusRequest, followToggleRequest, loadMoreFollowsRequest } from "tweeter-shared/dist/model/net/TweeterRequest";
import { DataPage } from "../../dao/djangoDao/DataPage";
import { DAOFactory } from "../../dao/djangoDao/DAOFactory";
import { Service } from "./Service";

export class FollowService extends Service{
    public async loadMoreFollowers(
        request: loadMoreFollowsRequest
    ): Promise<[User[], boolean]> {
        console.log(request);
        let page: DataPage<User> | undefined = await this.DAO.followsDAO.getPageOfFollowers(request.user.alias, request.pageSize, request.lastItem!.alias);
        if ((page.values === null) || (page.hasMorePages === null)) {
            throw new Error("[Internal Server Error] Invalid user or authToken");
        }
        return [page.values, page.hasMorePages];
    };

    public async loadMoreFollowees(
        request: loadMoreFollowsRequest
    ): Promise<[User[], boolean]> {
        console.log(request);
        let page: DataPage<User> = await this.DAO.followsDAO.getPageOfFollowees(request.user.alias, request.pageSize, request.lastItem!.alias);
        if ((page.values === null) || (page.hasMorePages === null)) {
            throw new Error("[Internal Server Error] Invalid user or authToken");
        }
        return [page.values, page.hasMorePages];
    };

    public async follow(
        request: followToggleRequest
    ): Promise<[number, number]> {
        await this.validateAuthToken(request.authToken);
        console.log("putting a follow");
        await this.DAO.followsDAO.put(new Follow(request.currentUser, request.userToFollow));
        console.log("updating follower/ee counts");
        let followerCount = await this.DAO.userDAO.updateFollowerCount(request.userToFollow.alias, 1);
        let followeeCount = await this.DAO.userDAO.updateFolloweeCount(request.currentUser.alias, 1);
        console.log(followerCount);
        console.log(followeeCount);
        await new Promise((f) => setTimeout(f, 2000));
        return[followerCount, followeeCount];
    };

    public async unfollow(
        request: followToggleRequest
    ): Promise<[number, number]> {
        await this.validateAuthToken(request.authToken);
        console.log("removing a follow");
        await this.DAO.followsDAO.delete(new Follow(request.currentUser, request.userToFollow));
        console.log("updating follower/ee counts");
        let followerCount = await this.DAO.userDAO.updateFollowerCount(request.userToFollow.alias, -1);
        let followeeCount = await this.DAO.userDAO.updateFolloweeCount(request.currentUser.alias, -1);
        console.log(followerCount);
        console.log(followeeCount);
        await new Promise((f) => setTimeout(f, 2000));
        return[followerCount, followeeCount];
    };

    public async getIsFollowerStatus(
        request: GetIsFollowerStatusRequest
    ): Promise<boolean> {
        await this.validateAuthToken(request.authToken);
        let isFollower = await this.DAO.followsDAO.get(new Follow(request.user, request.selectedUser));

        if (isFollower === null) {
            throw new Error("[Internal Server Error] Unknown error in getIsFollowerStatus")
        }

        return true;
    };

}