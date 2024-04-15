import { AuthToken, followToggleRequest, FollowToggleResponse, User } from "tweeter-shared";
import { FollowService } from "../model/service/FollowService";
import { DAOFactory } from "../dao/djangoDao/DAOFactory";

export const handler = async (event: followToggleRequest): Promise<FollowToggleResponse> => {
    let DAO: DAOFactory = new DAOFactory;

    console.log(event);
    let currentUser = User.fromJson(JSON.stringify(event.currentUser));
    let userToFollow = User.fromJson(JSON.stringify(event.userToFollow));
    let authToken = AuthToken.fromJson(JSON.stringify(event.authToken));

    let request = new followToggleRequest(currentUser!, userToFollow!, authToken!);
    //let request = JSON.parse(JSON.stringify(event));
    console.log(request);
    let [followerCount, followeeCount] = await new FollowService(DAO).unfollow(request);
    console.log(followerCount);
    console.log(followeeCount);
    return new FollowToggleResponse(followerCount, followeeCount, true);
}