import { TweeterResponse, AuthenticateResponse, LoginRequest, User, AuthToken } from "tweeter-shared";
import { UserService } from "../model/service/UserService";
import { DAOFactory } from "../dao/djangoDao/DAOFactory";

export const handler = async (event: LoginRequest): Promise<TweeterResponse> => {
    let DAO: DAOFactory = new DAOFactory;

    console.log(event);
    let request = JSON.parse(JSON.stringify(event));
    console.log(request);
    return new AuthenticateResponse(...await new UserService(DAO).login(request), true);
}