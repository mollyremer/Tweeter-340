import { TweeterResponse, AuthenticateResponse, LoginRequest } from "tweeter-shared";
import { UserService } from "../model/service/UserService";

export const handler = async (event: LoginRequest): Promise<TweeterResponse> => {
    try {
        let [user, authToken] = await new UserService().login(event.username, event.password);
        return new AuthenticateResponse(true, user, authToken);
    } catch (error) {
        if (error instanceof Error){
            return new AuthenticateResponse(false, null, null, error.message);
        }
        else {
            return new AuthenticateResponse(false, null, null);
        }
    }
}