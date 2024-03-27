import { TweeterResponse, AuthenticateResponse, RegisterRequest } from "tweeter-shared";
import { UserService } from "../model/service/UserService";

export const handler = async (event: RegisterRequest): Promise<TweeterResponse> => {
    try {
        return new AuthenticateResponse(...await new UserService().register(event), true);
    } catch (error) {
        if (error instanceof Error){
            return new AuthenticateResponse(null, null, false, error.message);
        }
        else {
            return new AuthenticateResponse(null, null, false);
        }
    }
}