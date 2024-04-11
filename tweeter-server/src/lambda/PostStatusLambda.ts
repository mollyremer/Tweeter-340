import { PostStatusRequest, TweeterResponse } from "tweeter-shared";
import { UserService } from "../model/service/UserService";
import { StatusService } from "../model/service/StatusService";

export const handler = async (event: PostStatusRequest): Promise<TweeterResponse> => {
    let request = JSON.parse(JSON.stringify(event));
    console.log(request);
    await new StatusService().postStatus(request);
    return new TweeterResponse(true);
}