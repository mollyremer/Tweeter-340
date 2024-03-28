import { PostStatusRequest, TweeterResponse } from "tweeter-shared";
import { UserService } from "../model/service/UserService";

export const handler = async (event: PostStatusRequest): Promise<TweeterResponse> => {
    try {
        await new UserService().postStatus(event);
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