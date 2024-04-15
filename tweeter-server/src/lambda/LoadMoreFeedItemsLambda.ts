import { AuthToken, GetPageOfStatusesResponse, Status, User, loadMoreStatusItemsRequest } from "tweeter-shared";
import { StatusService } from "../model/service/StatusService";
import { DAOFactory } from "../dao/djangoDao/DAOFactory";


export const handler = async (event: loadMoreStatusItemsRequest): Promise<GetPageOfStatusesResponse> => {
    let DAO: DAOFactory = new DAOFactory;

    console.log(event);
    let authToken = AuthToken.fromJson(JSON.stringify(event.authToken));
    let user = User.fromJson(JSON.stringify(event.user));
    let lastItem = Status.fromJson(JSON.stringify(event.lastItem));

    let request = new loadMoreStatusItemsRequest(authToken!, user!, event.pageSize, lastItem);
    
    //let request: loadMoreStatusItemsRequest = JSON.parse(JSON.stringify(event));
    console.log(request);
    let [response, hasMoreItems] = await new StatusService(DAO).loadMoreFeedItems(request);
    console.log(response);
    console.log(hasMoreItems);
    return new GetPageOfStatusesResponse(response, hasMoreItems, true);
}
