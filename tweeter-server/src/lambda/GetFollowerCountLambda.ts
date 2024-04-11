import { GetFollowerCountRequest, GetCountResponse } from "tweeter-shared";
import { UserService } from "../model/service/UserService";

export const handler = async (event: GetFollowerCountRequest): Promise<GetCountResponse> => {
    let request = JSON.parse(JSON.stringify(event));
    console.log(request);
    return new GetCountResponse(await new UserService().getFollowerCount(request), true);
}