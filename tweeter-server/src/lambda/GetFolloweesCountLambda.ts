import { GetFollowerCountRequest, GetCountResponse, GetFolloweesCountRequest, AuthToken, User } from "tweeter-shared";
import { UserService } from "../model/service/UserService";
import { DAOFactory } from "../dao/djangoDao/DAOFactory";

export const handler = async (event: GetFolloweesCountRequest): Promise<GetCountResponse> => {
    let DAO: DAOFactory = new DAOFactory;

    console.log(event);
    let authToken = AuthToken.fromJson(JSON.stringify(event.authToken));
    let user = User.fromJson(JSON.stringify(event.user));
    let request = new GetFolloweesCountRequest(authToken!, user!);

    //let request = JSON.parse(JSON.stringify(event));
    console.log(request);
    let response = await new UserService(DAO).getFolloweesCount(request);
    console.log(response);
    return new GetCountResponse(response, true);
}
