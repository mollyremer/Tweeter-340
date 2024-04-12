import { loadMoreFollowsRequest, GetPageOfUsersResponse } from "tweeter-shared";
import { FollowService } from "../model/service/FollowService";
import { DAOFactory } from "../dao/djangoDao/DAOFactory";

export const handler = async (event: loadMoreFollowsRequest): Promise<GetPageOfUsersResponse> => {
    let DAO: DAOFactory = new DAOFactory;

    let request = JSON.parse(JSON.stringify(event));
    console.log(request);
    return new GetPageOfUsersResponse(...await new FollowService(DAO).loadMoreFollowers(request), true);
}