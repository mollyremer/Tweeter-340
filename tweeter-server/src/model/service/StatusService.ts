import { Status, FakeData } from "tweeter-shared";
import { PostStatusRequest, loadMoreStatusItemsRequest } from "tweeter-shared/dist/model/net/TweeterRequest";

export class StatusService {
    public async loadMoreFeedItems(
        request: loadMoreStatusItemsRequest
    ): Promise<[Status[], boolean]> {
        let [statuses, hasMorePages] = FakeData.instance.getPageOfStatuses(request.lastItem, request.pageSize);
        if ((statuses === null) || (hasMorePages === null)){
            throw new Error("[Internal Server Error] Invalid user or authToken");
        }

        return [statuses, hasMorePages];
    };

    public async loadMoreStoryItems(
        request: loadMoreStatusItemsRequest
    ): Promise<[Status[], boolean]> {
        let [statuses, hasMorePages] = FakeData.instance.getPageOfStatuses(request.lastItem, request.pageSize);
        if ((statuses === null) || (hasMorePages === null)){
            throw new Error("[Internal Server Error] Invalid user or authToken");
        }

        return [statuses, hasMorePages];
    };

    public async postStatus(
        request: PostStatusRequest
    ): Promise<void> {
        if (request !instanceof PostStatusRequest){
            throw new Error("[Bad Request] Invalid request");
        }

        await new Promise((f) => setTimeout(f, 2000));
    };
}