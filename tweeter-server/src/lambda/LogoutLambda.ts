import { TweeterResponse, LogoutRequest, AuthToken } from "tweeter-shared";
import { UserService } from "../model/service/UserService";

export const handler = async (event: LogoutRequest): Promise<TweeterResponse> => {
    let request = JSON.parse(JSON.stringify(event));
    console.log(request);
    await new UserService().logout(request);
    return new TweeterResponse(true);
}