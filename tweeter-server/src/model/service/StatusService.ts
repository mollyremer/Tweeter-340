import { Status, FakeData } from "tweeter-shared";
import { PostStatusRequest, loadMoreStatusItemsRequest } from "tweeter-shared/dist/model/net/TweeterRequest";
import { DAOFactory } from "../../dao/djangoDao/DAOFactory";
import { DataPage } from "../../dao/djangoDao/DataPage";

export class StatusService {
    private DAO: DAOFactory = new DAOFactory;
    
    public async loadMoreFeedItems(
        request: loadMoreStatusItemsRequest
    ): Promise<[Status[], boolean]> {
        let page: DataPage<Status> = await this.DAO.feedDAO.getPage(request.user.alias, request.pageSize);
        if (((page.values) === null) || (page.hasMorePages === null)){
            throw new Error("[Internal Server Error] Invalid user or authToken");
        }
        return [page.values, page.hasMorePages];
    };

    public async loadMoreStoryItems(
        request: loadMoreStatusItemsRequest
    ): Promise<[Status[], boolean]> {
        let page: DataPage<Status> = await this.DAO.feedDAO.getPage(request.user.alias, request.pageSize);
        if ((page.values === null) || (page.hasMorePages === null)){
            throw new Error("[Internal Server Error] Invalid user or authToken");
        }
        return [page.values, page.hasMorePages];
    };

    public async postStatus(
        request: PostStatusRequest
    ): Promise<void> {
        let authToken = await this.DAO.authDAO.get(request.authToken.token);
        if (authToken === null){
            throw new Error("[Internal Server Error] Invalid authToken");
        }
        await this.DAO.storyDAO.put(new Status(request.newStatus.post, request.newStatus.user, request.newStatus.timestamp), request.newStatus.user.alias);
        await this.DAO.feedDAO.put(new Status(request.newStatus.post, request.newStatus.user, request.newStatus.timestamp), request.newStatus.user.alias);
        await new Promise((f) => setTimeout(f, 2000));
    };
}