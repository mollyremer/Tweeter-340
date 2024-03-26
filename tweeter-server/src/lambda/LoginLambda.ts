import { TweeterResponse, AuthenticateResponse, BadResponse, LoginRequest } from "tweeter-shared";
import { UserService } from "../model/service/UserService";

export const loginHandler = async (event: LoginRequest): Promise<TweeterResponse> => {
    try {
        let [user, authToken] = await new UserService().login(event.username, event.password);
        return new AuthenticateResponse(user, authToken);
    } catch (error) {
        if (error instanceof Error){
            return new BadResponse(error.message);
        }
        else {
            return new BadResponse("Error: an unknown error occured");
        }
    }
}