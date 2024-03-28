import { GetFollowerCountRequest, GetCountResponse, GetFolloweesCountRequest } from "tweeter-shared";
import { UserService } from "../model/service/UserService";

export const handler = async (event: GetFolloweesCountRequest): Promise<GetCountResponse> => {
    try {
        return new GetCountResponse(await new UserService().getFolloweesCount(event), true);
    } catch (error) {
        if (error instanceof Error){
            return new GetCountResponse(0, false, error.message);
        }
        else {
            return new GetCountResponse(0, false);
        }
    }
}