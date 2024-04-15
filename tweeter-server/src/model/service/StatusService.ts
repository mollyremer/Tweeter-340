import { Status, FakeData, loadMoreStatusItemsRequest, PostStatusRequest, User, AuthToken } from "tweeter-shared";
import { DAOFactory } from "../../dao/djangoDao/DAOFactory";
import { DataPage } from "../../dao/djangoDao/DataPage";
import { Service } from "./Service";

export class StatusService extends Service{
    public async loadMoreFeedItems(
        request: loadMoreStatusItemsRequest
    ): Promise<[Status[], boolean]> {
        console.log(request);
        if (request.user === null){
            throw new Error("[Bad Request] Unknown user");
        }
        let page: DataPage<Status> = await this.DAO.feedDAO.getPage(request.user.alias, request.pageSize, request.lastItem);
        if (((page.values) === null) || (page.hasMorePages === null)){
            throw new Error("[Internal Server Error] Invalid user or authToken");
        }
        return [page.values, page.hasMorePages];
    };

    public async loadMoreStoryItems(
        request: loadMoreStatusItemsRequest
    ): Promise<[Status[], boolean]> {
        console.log(request);
        if (request.user === null){
            throw new Error("[Bad Request] Unknown user");
        }
        let page: DataPage<Status> = await this.DAO.storyDAO.getPage(request.user.alias, request.pageSize, request.lastItem);
        if ((page.values === null) || (page.hasMorePages === null)){
            throw new Error("[Internal Server Error] Invalid user or authToken");
        }
        return [page.values, page.hasMorePages];
    };

    public async postStatus(
        request: PostStatusRequest
    ): Promise<void> {
        console.log(request);
        let authToken = await this.DAO.authDAO.get(request.authToken.token);
        if (authToken === null){
            throw new Error("[Internal Server Error] Invalid authToken");
        }

        await this.DAO.storyDAO.put(new Status(request.newStatus.post, request.newStatus.user, request.newStatus.timestamp), request.newStatus.user.alias);
        
        let followeeAliases: string[] = await this.DAO.followsDAO.getAllFollowers(request.newStatus.user.alias);
        for (let followeeAlias in followeeAliases){
            await this.DAO.feedDAO.put(new Status(request.newStatus.post, request.newStatus.user, request.newStatus.timestamp), followeeAlias);
        }
        
        await new Promise((f) => setTimeout(f, 2000));
    };
}