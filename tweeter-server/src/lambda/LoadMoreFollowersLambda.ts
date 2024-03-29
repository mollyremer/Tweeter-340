import { TweeterResponse, AuthenticateResponse, LoginRequest, User, AuthToken } from "tweeter-shared";
import { FollowService } from "../model/service/FollowService";
import { loadMoreFollowsRequest } from "tweeter-shared/dist/model/net/TweeterRequest";
import { GetPageOfUsersResponse } from "tweeter-shared/dist/model/net/TweeterResponse";

export const handler = async (event: loadMoreFollowsRequest): Promise<GetPageOfUsersResponse> => {
    try {
        return new GetPageOfUsersResponse(...await new FollowService().loadMoreFollowers(event), true);
    } catch (error) {
        let badUsers: User[] = [];
        if (error instanceof Error){
            return new GetPageOfUsersResponse(badUsers, false, false, error.message);
        }
        else {
            return new GetPageOfUsersResponse(badUsers, false, false);
        }
    }
}