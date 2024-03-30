import { TweeterResponse, AuthenticateResponse, LoginRequest, User, AuthToken, followToggleRequest, FollowToggleResponse } from "tweeter-shared";
import { UserService } from "../model/service/UserService";

export const handler = async (event: followToggleRequest): Promise<FollowToggleResponse> => {
    try {
        await new UserService().unfollow(event);
        return new FollowToggleResponse(0, 0, true);
    } catch (error) {
        if (error instanceof Error){
            return new FollowToggleResponse(0, 0, false, error.message);
        }
        else {
            return new FollowToggleResponse(0, 0, false);
        }
    }
}