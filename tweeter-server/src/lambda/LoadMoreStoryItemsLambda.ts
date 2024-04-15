import { TweeterResponse, AuthenticateResponse, LoginRequest, User, AuthToken, Status } from "tweeter-shared";
import { FollowService } from "../model/service/FollowService";
import { loadMoreFollowsRequest, loadMoreStatusItemsRequest } from "tweeter-shared/dist/model/net/TweeterRequest";
import { GetPageOfStatusesResponse, GetPageOfUsersResponse } from "tweeter-shared/dist/model/net/TweeterResponse";
import { StatusService } from "../model/service/StatusService";
import { DAOFactory } from "../dao/djangoDao/DAOFactory";

export const handler = async (event: loadMoreStatusItemsRequest): Promise<GetPageOfStatusesResponse> => {
    let DAO: DAOFactory = new DAOFactory;

    let authToken = AuthToken.fromJson(JSON.stringify(event.authToken));
    let user = User.fromJson(JSON.stringify(event.user));
    
    let lastItem: Status | null;
    if (event.lastItem != null) {
        let tempLastItem = Status.fromJson(JSON.stringify(event.lastItem));
        let userInsideStatus = User.fromJson(JSON.stringify(tempLastItem!.user));
        lastItem = new Status(tempLastItem!.post, userInsideStatus!, tempLastItem!.timestamp);
    } else {
        lastItem = null;
    }

    let request = new loadMoreStatusItemsRequest(authToken!, user!, event.pageSize, lastItem);
    //let request = JSON.parse(JSON.stringify(event));
    console.log(request);
    return new GetPageOfStatusesResponse(...await new StatusService(DAO).loadMoreStoryItems(request), true);
}
