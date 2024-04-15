import { AuthToken, User, loadMoreFollowsRequest } from "tweeter-shared";
import { FollowService } from "../model/service/FollowService";
import { GetPageOfUsersResponse } from "tweeter-shared/dist/model/net/TweeterResponse";
import { DAOFactory } from "../dao/djangoDao/DAOFactory";

export const handler = async (event: loadMoreFollowsRequest): Promise<GetPageOfUsersResponse> => {
    let DAO: DAOFactory = new DAOFactory;

    let authToken = AuthToken.fromJson(JSON.stringify(event.authToken));
    let user = User.fromJson(JSON.stringify(event.user));

    let lastItem: User | null;
    if (event.lastItem != null){
        lastItem = User.fromJson(JSON.stringify(event.lastItem));
    } else {
        lastItem = null;
    }

    let request = new loadMoreFollowsRequest(authToken!, user!, event.pageSize, lastItem);
    //let request = JSON.parse(JSON.stringify(event));
    console.log(request);
    return new GetPageOfUsersResponse(...await new FollowService(DAO).loadMoreFollowees(request), true);
}