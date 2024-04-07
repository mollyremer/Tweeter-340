import { GetIsFollowerStatusRequest, GetIsFollowerStatusResponse} from "tweeter-shared";
import { UserService } from "../model/service/UserService";
import { FollowService } from "../model/service/FollowService";

export const handler = async (event: GetIsFollowerStatusRequest): Promise<GetIsFollowerStatusResponse> => {
    try {
        return new GetIsFollowerStatusResponse(await new FollowService().getIsFollowerStatus(event), true);
    } catch (error) {
        if (error instanceof Error){
            return new GetIsFollowerStatusResponse(false, false, error.message);
        }
        else {
            return new GetIsFollowerStatusResponse(false, false);
        }
    }
}