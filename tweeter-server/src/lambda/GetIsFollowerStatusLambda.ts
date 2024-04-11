import { GetIsFollowerStatusRequest, GetIsFollowerStatusResponse } from "tweeter-shared";
import { UserService } from "../model/service/UserService";
import { FollowService } from "../model/service/FollowService";

export const handler = async (event: GetIsFollowerStatusRequest): Promise<GetIsFollowerStatusResponse> => {
    let request = JSON.parse(JSON.stringify(event));
    console.log(request);
    return new GetIsFollowerStatusResponse(await new FollowService().getIsFollowerStatus(request), true);
}