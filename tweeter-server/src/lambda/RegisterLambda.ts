import { TweeterResponse, AuthenticateResponse, RegisterRequest } from "tweeter-shared";
import { UserService } from "../model/service/UserService";

export const handler = async (event: RegisterRequest): Promise<TweeterResponse> => {
    let request = JSON.parse(JSON.stringify(event));
    console.log(request);
    return new AuthenticateResponse(...await new UserService().register(request), true);

}