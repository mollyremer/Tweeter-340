import { followToggleRequest, FollowToggleResponse } from "tweeter-shared";
import { FollowService } from "../model/service/FollowService";
import { DAOFactory } from "../dao/djangoDao/DAOFactory";

export const handler = async (event: followToggleRequest): Promise<FollowToggleResponse> => {
    let DAO: DAOFactory = new DAOFactory;

    console.log(event);
    let request = JSON.parse(JSON.stringify(event));
    console.log(request);
    let [followerCount, followeeCount] = await new FollowService(DAO).unfollow(request);
    console.log(followerCount);
    console.log(followeeCount);
    return new FollowToggleResponse(followerCount, followeeCount, true);
}