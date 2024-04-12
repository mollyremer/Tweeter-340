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
        let user: User = User.fromJson(JSON.stringify(request.user))!;
        let lastItem: User | null = request.lastItem ? null : User.fromJson(JSON.stringify(request.lastItem))!;
        console.log(user);
        let page: DataPage<User> | undefined = await this.DAO.followsDAO.getPageOfFollowers(user.alias, request.pageSize, lastItem!.alias);
        if ((page.values === null) || (page.hasMorePages === null)) {
            throw new Error("[Internal Server Error] Invalid user or authToken");
        }
        return [page.values, page.hasMorePages];
    };

    public async loadMoreFollowees(
        request: loadMoreFollowsRequest
    ): Promise<[User[], boolean]> {
        console.log(request);
        let user: User = User.fromJson(JSON.stringify(request.user))!;
        let lastItem: User | null = request.lastItem ? null : User.fromJson(JSON.stringify(request.lastItem))!;
        console.log(user);
        let page: DataPage<User> = await this.DAO.followsDAO.getPageOfFollowees(user.alias, request.pageSize, lastItem!.alias);
        if ((page.values === null) || (page.hasMorePages === null)) {
            throw new Error("[Internal Server Error] Invalid user or authToken");
        }
        return [page.values, page.hasMorePages];
    };

    public async follow(
        request: followToggleRequest
    ): Promise<[number, number]> {
        let authToken = AuthToken.fromJson(JSON.stringify(request.authToken));
        let currentUser = User.fromJson(JSON.stringify(request.currentUser));
        let userToFollow = User.fromJson(JSON.stringify(request.userToFollow));

        await this.validateAuthToken(authToken!);
        console.log("putting a follow");
        await this.DAO.followsDAO.put(new Follow(currentUser!, userToFollow!));
        console.log("updating follower/ee counts");
        let followerCount = await this.DAO.userDAO.updateFollowerCount(userToFollow!.alias, 1);
        let followeeCount = await this.DAO.userDAO.updateFolloweeCount(currentUser!.alias, 1);
        console.log(followerCount);
        console.log(followeeCount);
        await new Promise((f) => setTimeout(f, 2000));
        return[followerCount, followeeCount];
    };

    public async unfollow(
        request: followToggleRequest
    ): Promise<[number, number]> {
        let authToken = AuthToken.fromJson(JSON.stringify(request.authToken));
        let currentUser = User.fromJson(JSON.stringify(request.currentUser));
        let userToFollow = User.fromJson(JSON.stringify(request.userToFollow));

        await this.validateAuthToken(authToken!);
        console.log("removing a follow");
        await this.DAO.followsDAO.delete(new Follow(currentUser!, userToFollow!));
        console.log("updating follower/ee counts");
        let followerCount = await this.DAO.userDAO.updateFollowerCount(userToFollow!.alias, -1);
        let followeeCount = await this.DAO.userDAO.updateFolloweeCount(currentUser!.alias, -1);
        console.log(followerCount);
        console.log(followeeCount);
        await new Promise((f) => setTimeout(f, 2000));
        return[followerCount, followeeCount];
    };

    public async getIsFollowerStatus(
        request: GetIsFollowerStatusRequest
    ): Promise<boolean> {
        let user = User.fromJson(JSON.stringify(request.user));
        let selectedUser = User.fromJson(JSON.stringify(request.selectedUser));
        let authToken = AuthToken.fromJson(JSON.stringify(request.authToken));

        await this.validateAuthToken(authToken!);
        let isFollower = await this.DAO.followsDAO.get(new Follow(user!, selectedUser!));

        if (isFollower === null) {
            throw new Error("[Internal Server Error] Unknown error in getIsFollowerStatus")
        }

        return true;
    };

}