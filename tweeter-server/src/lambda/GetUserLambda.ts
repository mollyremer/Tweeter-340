import { TweeterResponse, GetUserRequest, GetUserResponse } from "tweeter-shared";
import { UserService } from "../model/service/UserService";
import { DAOFactory } from "../dao/djangoDao/DAOFactory";

export const handler = async (event: GetUserRequest): Promise<GetUserResponse> => {
    let DAO: DAOFactory = new DAOFactory;

    console.log(event);
    let request = JSON.parse(JSON.stringify(event));
    console.log(request);
    let response = await new UserService(DAO).getUser(request);
    console.log(response);
    return new GetUserResponse(response, true);
}