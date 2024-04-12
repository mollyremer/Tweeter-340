import { GetIsFollowerStatusRequest, GetIsFollowerStatusResponse } from "tweeter-shared";
import { UserService } from "../model/service/UserService";
import { FollowService } from "../model/service/FollowService";
import { DAOFactory } from "../dao/djangoDao/DAOFactory";

export const handler = async (event: GetIsFollowerStatusRequest): Promise<GetIsFollowerStatusResponse> => {
    let DAO: DAOFactory = new DAOFactory;

    console.log(event);
    let request = JSON.parse(JSON.stringify(event));
    console.log(request);
    let response = await new FollowService(DAO).getIsFollowerStatus(request);
    console.log(response);
    return new GetIsFollowerStatusResponse(response, true);
}