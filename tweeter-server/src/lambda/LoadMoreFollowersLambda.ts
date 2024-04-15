import { loadMoreFollowsRequest, GetPageOfUsersResponse, AuthToken, User } from "tweeter-shared";
import { FollowService } from "../model/service/FollowService";
import { DAOFactory } from "../dao/djangoDao/DAOFactory";

export const handler = async (event: loadMoreFollowsRequest): Promise<GetPageOfUsersResponse> => {
    let DAO: DAOFactory = new DAOFactory;

    let authToken = AuthToken.fromJson(JSON.stringify(event.authToken));
    let user = User.fromJson(JSON.stringify(event.user));
    let lastItem = User.fromJson(JSON.stringify(event.lastItem));

    let request = new loadMoreFollowsRequest(authToken!, user!, event.pageSize, lastItem);
    //let request = JSON.parse(JSON.stringify(event));
    console.log(request);
    return new GetPageOfUsersResponse(...await new FollowService(DAO).loadMoreFollowers(request), true);
}