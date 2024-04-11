import { TweeterResponse, AuthenticateResponse, LoginRequest, User, AuthToken } from "tweeter-shared";
import { UserService } from "../model/service/UserService";

export const handler = async (event: LoginRequest): Promise<TweeterResponse> => {
    let request = JSON.parse(JSON.stringify(event));
    console.log(request);
    return new AuthenticateResponse(...await new UserService().login(request), true);
}