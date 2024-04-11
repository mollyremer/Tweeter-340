import { TweeterResponse, AuthenticateResponse, LoginRequest, User, AuthToken } from "tweeter-shared";
import { FollowService } from "../model/service/FollowService";
import { loadMoreFollowsRequest } from "tweeter-shared/dist/model/net/TweeterRequest";
import { GetPageOfUsersResponse } from "tweeter-shared/dist/model/net/TweeterResponse";

export const handler = async (event: loadMoreFollowsRequest): Promise<GetPageOfUsersResponse> => {
    let request = JSON.parse(JSON.stringify(event));
    console.log(request);
    return new GetPageOfUsersResponse(...await new FollowService().loadMoreFollowers(request), true);
}