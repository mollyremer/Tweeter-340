import { PostStatusRequest, TweeterResponse } from "tweeter-shared";
import { UserService } from "../model/service/UserService";
import { StatusService } from "../model/service/StatusService";
import { DAOFactory } from "../dao/djangoDao/DAOFactory";

export const handler = async (event: PostStatusRequest): Promise<TweeterResponse> => {
    let DAO: DAOFactory = new DAOFactory;

    console.log(event);
    let request = JSON.parse(JSON.stringify(event));
    console.log(request);
    await new StatusService(DAO).postStatus(request);
    return new TweeterResponse(true);
}