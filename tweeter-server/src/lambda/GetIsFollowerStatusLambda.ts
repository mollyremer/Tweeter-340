import { GetIsFollowerStatusRequest, GetIsFollowerStatusResponse} from "tweeter-shared";
import { UserService } from "../model/service/UserService";

export const handler = async (event: GetIsFollowerStatusRequest): Promise<GetIsFollowerStatusResponse> => {
    try {
        return new GetIsFollowerStatusResponse(await new UserService().getIsFollowerStatus(event), true);
    } catch (error) {
        if (error instanceof Error){
            return new GetIsFollowerStatusResponse(false, false, error.message);
        }
        else {
            return new GetIsFollowerStatusResponse(false, false);
        }
    }
}