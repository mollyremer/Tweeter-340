import { GetFollowerCountRequest, GetCountResponse, GetFolloweesCountRequest } from "tweeter-shared";
import { UserService } from "../model/service/UserService";

export const handler = async (event: GetFolloweesCountRequest): Promise<GetCountResponse> => {
    let request = JSON.parse(JSON.stringify(event));
    console.log(request);
    return new GetCountResponse(await new UserService().getFolloweesCount(request), true);
}