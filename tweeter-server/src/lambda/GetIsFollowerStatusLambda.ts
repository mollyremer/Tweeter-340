import { AuthToken, GetIsFollowerStatusRequest, GetIsFollowerStatusResponse, User } from "tweeter-shared";
import { UserService } from "../model/service/UserService";
import { FollowService } from "../model/service/FollowService";
import { DAOFactory } from "../dao/djangoDao/DAOFactory";

export const handler = async (event: GetIsFollowerStatusRequest): Promise<GetIsFollowerStatusResponse> => {
    let DAO: DAOFactory = new DAOFactory;

    console.log(event);
    let authToken = AuthToken.fromJson(JSON.stringify(event.authToken));
    let user = User.fromJson(JSON.stringify(event.user));
    let selectedUser = User.fromJson(JSON.stringify(event.selectedUser));

    let request = new GetIsFollowerStatusRequest(authToken!, user!, selectedUser!);

    //let request = JSON.parse(JSON.stringify(event));
    console.log(request);
    let response = await new FollowService(DAO).getIsFollowerStatus(request);
    console.log(response);
    return new GetIsFollowerStatusResponse(response, true);
}