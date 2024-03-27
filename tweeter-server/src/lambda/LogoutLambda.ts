import { TweeterResponse, LogoutRequest, AuthToken } from "tweeter-shared";
import { UserService } from "../model/service/UserService";

export const handler = async (event: LogoutRequest): Promise<TweeterResponse> => {
    try {
        let logout = await new UserService().logout(event);
        return new TweeterResponse(true);
    } catch (error) {
        if (error instanceof Error){
            return new TweeterResponse(false, error.message);
        }
        else {
            return new TweeterResponse(false);
        }
    }
}