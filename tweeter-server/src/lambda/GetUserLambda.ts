import { TweeterResponse, GetUserRequest, GetUserResponse, AuthToken } from "tweeter-shared";
import { UserService } from "../model/service/UserService";
import { DAOFactory } from "../dao/djangoDao/DAOFactory";

export const handler = async (event: GetUserRequest): Promise<GetUserResponse> => {
    let DAO: DAOFactory = new DAOFactory;

    let authToken = AuthToken.fromJson(JSON.stringify(event.authToken));
    let alias = event.alias;

    let request = new GetUserRequest(authToken!, alias);

    //let request = JSON.parse(JSON.stringify(event));
    console.log(request);
    let response = await new UserService(DAO).getUser(request);
    console.log(response);
    return new GetUserResponse(response, true);
}