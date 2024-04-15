import { AuthToken, PostStatusRequest, Status, TweeterResponse } from "tweeter-shared";
import { UserService } from "../model/service/UserService";
import { StatusService } from "../model/service/StatusService";
import { DAOFactory } from "../dao/djangoDao/DAOFactory";

export const handler = async (event: PostStatusRequest): Promise<TweeterResponse> => {
    let DAO: DAOFactory = new DAOFactory;

    console.log(event);

    let authToken = AuthToken.fromJson(JSON.stringify(event.authToken));
    let newStatus = Status.fromJson(JSON.stringify(event.newStatus));

    let request = new PostStatusRequest(authToken!, newStatus!);
    //let request = JSON.parse(JSON.stringify(event));
    console.log(request);
    await new StatusService(DAO).postStatus(request);
    return new TweeterResponse(true);
}