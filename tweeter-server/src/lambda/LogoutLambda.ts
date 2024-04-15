import { TweeterResponse, LogoutRequest, AuthToken } from "tweeter-shared";
import { UserService } from "../model/service/UserService";
import { DAOFactory } from "../dao/djangoDao/DAOFactory";

export const handler = async (event: LogoutRequest): Promise<TweeterResponse> => {
    let DAO: DAOFactory = new DAOFactory;
    let authToken = AuthToken.fromJson(JSON.stringify(event.authToken));
    let request = new LogoutRequest(authToken!);
    console.log(request);
    await new UserService(DAO).logout(request);
    return new TweeterResponse(true);
}