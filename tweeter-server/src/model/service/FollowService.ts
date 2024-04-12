import { AuthToken, User, FakeData, Follow } from "tweeter-shared";
import { GetIsFollowerStatusRequest, followToggleRequest, loadMoreFollowsRequest } from "tweeter-shared/dist/model/net/TweeterRequest";
import { DataPage } from "../../dao/djangoDao/DataPage";
import { DAOFactory } from "../../dao/djangoDao/DAOFactory";

export class FollowService {
    private DAO: DAOFactory = new DAOFactory;

    public async loadMoreFollowers(
        request: loadMoreFollowsRequest
    ): Promise<[User[], boolean]> {
        let page: DataPage<User> = await this.DAO.followsDAO.getPageOfFollowers(request.user.alias, request.pageSize, request.lastItem!.alias);
        if ((page.values === null) || (page.hasMorePages === null)) {
            throw new Error("[Internal Server Error] Invalid user or authToken");
        }
        return [page.values, page.hasMorePages];
    };

    public async loadMoreFollowees(
        request: loadMoreFollowsRequest
    ): Promise<[User[], boolean]> {
        let page: DataPage<User> = await this.DAO.followsDAO.getPageOfFollowers(request.user.alias, request.pageSize, request.lastItem!.alias);
        if ((page.values === null) || (page.hasMorePages === null)) {
            throw new Error("[Internal Server Error] Invalid user or authToken");
        }
        return [page.values, page.hasMorePages];
    };

    public async follow(
        request: followToggleRequest
    ): Promise<void> {
        console.log(request.authToken);
        let authToken = await this.DAO.authDAO.get(request.authToken.token);
        console.log(authToken);
        if (authToken === null) { throw new Error("[Bad Request] Invalid authToken, please log back in"); }
        
        await this.DAO.followsDAO.put(new Follow(request.currentUser, request.userToFollow));
        await new Promise((f) => setTimeout(f, 2000));
        return;
    };

    public async unfollow(
        request: followToggleRequest
    ): Promise<void> {
        let authToken = await this.DAO.authDAO.get(request.authToken.token);
        if (authToken === null) { throw new Error("[Bad Request] Invalid authToken, please log back in"); }
        
        await this.DAO.followsDAO.delete(new Follow(request.currentUser, request.userToFollow));
        await new Promise((f) => setTimeout(f, 2000));
        return;
    };

    public async getIsFollowerStatus(
        request: GetIsFollowerStatusRequest
    ): Promise<boolean> {
        let isFollower = await this.DAO.followsDAO.get(new Follow(request.user, request.selectedUser));

        if (isFollower === null) {
            throw new Error("[Internal Server Error] Unknown error in getIsFollowerStatus")
        }

        return true;
    };

}