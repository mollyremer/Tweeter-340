import { TweeterResponse, GetUserRequest, GetUserResponse } from "tweeter-shared";
import { UserService } from "../model/service/UserService";

export const handler = async (event: GetUserRequest): Promise<GetUserResponse> => {
    let request = JSON.parse(JSON.stringify(event));
    console.log(request);
    return new GetUserResponse(await new UserService().getUser(request), true);
}