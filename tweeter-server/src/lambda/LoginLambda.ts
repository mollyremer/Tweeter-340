import { TweeterResponse, AuthenticateResponse, LoginRequest, User, AuthToken } from "tweeter-shared";
import { UserService } from "../model/service/UserService";

export const handler = async (event: LoginRequest): Promise<TweeterResponse> => {
    try {
        return new AuthenticateResponse(...await new UserService().login(event.username, event.password), true);
    } catch (error) {
        if (error instanceof Error){
            return new AuthenticateResponse(null, null, false, error.message);
        }
        else {
            return new AuthenticateResponse(null, null, false);
        }
    }
}