import { TweeterResponse, AuthenticateResponse, RegisterRequest } from "tweeter-shared";
import { UserService } from "../model/service/UserService";
import { DAOFactory } from "../dao/djangoDao/DAOFactory";

export const handler = async (event: RegisterRequest): Promise<TweeterResponse> => {
    let DAO: DAOFactory = new DAOFactory;

    let request = JSON.parse(JSON.stringify(event));
    console.log(request);
    return new AuthenticateResponse(...await new UserService(DAO).register(request), true);
}