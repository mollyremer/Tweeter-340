import { TweeterResponse, GetUserRequest, GetUserResponse} from "tweeter-shared";
import { UserService } from "../model/service/UserService";

export const handler = async (event: GetUserRequest): Promise<GetUserResponse> => {
    try {
        return new GetUserResponse(await new UserService().getUser(event), true);
    } catch (error) {
        if (error instanceof Error){
            return new GetUserResponse(null, false, error.message);
        }
        else {
            return new GetUserResponse(null, false);
        }
    }
}