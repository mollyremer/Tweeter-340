import { TweeterResponse, AuthenticateResponse, LoginRequest, User, AuthToken, followToggleRequest, FollowToggleResponse } from "tweeter-shared";
import { UserService } from "../model/service/UserService";
import { FollowService } from "../model/service/FollowService";

export const handler = async (event: followToggleRequest): Promise<FollowToggleResponse> => {
    let request = JSON.parse(JSON.stringify(event));
    console.log(request);
    await new FollowService().follow(request);
    return new FollowToggleResponse(0, 0, true);
}