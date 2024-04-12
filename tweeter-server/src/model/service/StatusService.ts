import { Status, FakeData, loadMoreStatusItemsRequest, PostStatusRequest, User, AuthToken } from "tweeter-shared";
import { DAOFactory } from "../../dao/djangoDao/DAOFactory";
import { DataPage } from "../../dao/djangoDao/DataPage";
import { Service } from "./Service";

export class StatusService extends Service{
    public async loadMoreFeedItems(
        request: loadMoreStatusItemsRequest
    ): Promise<[Status[], boolean]> {
        console.log(request);
        let user: User = User.fromJson(JSON.stringify(request.user))!;
        console.log(user);
        if (user === null){
            throw new Error("[Bad Request] Unknown user");
        }
        let page: DataPage<Status> = await this.DAO.feedDAO.getPage(user.alias, request.pageSize);
        console.log(page.values);
        console.log(page.hasMorePages);
        if (((page.values) === null) || (page.hasMorePages === null)){
            throw new Error("[Internal Server Error] Invalid user or authToken");
        }
        return [page.values, page.hasMorePages];
    };

    public async loadMoreStoryItems(
        request: loadMoreStatusItemsRequest
    ): Promise<[Status[], boolean]> {
        console.log(request);
        let user: User = User.fromJson(JSON.stringify(request.user))!;
        console.log(user);
        if (user === null){
            throw new Error("[Bad Request] Unknown user");
        }
        let page: DataPage<Status> = await this.DAO.feedDAO.getPage(user.alias, request.pageSize);
        if ((page.values === null) || (page.hasMorePages === null)){
            throw new Error("[Internal Server Error] Invalid user or authToken");
        }
        return [page.values, page.hasMorePages];
    };

    public async postStatus(
        request: PostStatusRequest
    ): Promise<void> {
        console.log(request);
        let requestAuthToken: AuthToken = AuthToken.fromJson(JSON.stringify(request.authToken))!;
        let authToken = await this.DAO.authDAO.get(requestAuthToken.token);
        if (authToken === null){
            throw new Error("[Internal Server Error] Invalid authToken");
        }

        let userInsideStatus = User.fromJson(JSON.stringify(request.newStatus.user));
        let newStatus = Status.fromJson(JSON.stringify(request.newStatus));
        await this.DAO.storyDAO.put(new Status(newStatus!.post, userInsideStatus!, newStatus!.timestamp), newStatus!.user.alias);
        await this.DAO.feedDAO.put(new Status(newStatus!.post, userInsideStatus!, newStatus!.timestamp), newStatus!.user.alias);
        await new Promise((f) => setTimeout(f, 2000));
    };
}