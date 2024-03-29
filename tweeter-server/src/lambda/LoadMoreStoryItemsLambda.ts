import { TweeterResponse, AuthenticateResponse, LoginRequest, User, AuthToken, Status } from "tweeter-shared";
import { FollowService } from "../model/service/FollowService";
import { loadMoreFollowsRequest, loadMoreStatusItemsRequest } from "tweeter-shared/dist/model/net/TweeterRequest";
import { GetPageOfStatusesResponse, GetPageOfUsersResponse } from "tweeter-shared/dist/model/net/TweeterResponse";
import { StatusService } from "../model/service/StatusService";

export const handler = async (event: loadMoreStatusItemsRequest): Promise<GetPageOfStatusesResponse> => {
    try {
        return new GetPageOfStatusesResponse(...await new StatusService().loadMoreStoryItems(event), true);
    } catch (error) {
        let badStatuses: Status[] = [];
        if (error instanceof Error){
            return new GetPageOfStatusesResponse(badStatuses, false, false, error.message);
        }
        else {
            return new GetPageOfStatusesResponse(badStatuses, false, false);
        }
    }
}
