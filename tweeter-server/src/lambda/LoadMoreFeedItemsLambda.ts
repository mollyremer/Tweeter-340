import { GetPageOfStatusesResponse, loadMoreStatusItemsRequest } from "tweeter-shared";
import { StatusService } from "../model/service/StatusService";
import { DAOFactory } from "../dao/djangoDao/DAOFactory";


export const handler = async (event: loadMoreStatusItemsRequest): Promise<GetPageOfStatusesResponse> => {
    let DAO: DAOFactory = new DAOFactory;

    console.log(event);
    let request: loadMoreStatusItemsRequest = JSON.parse(JSON.stringify(event));
    console.log(request);
    let [response, hasMoreItems] = await new StatusService(DAO).loadMoreFeedItems(request);
    console.log(response);
    console.log(hasMoreItems);
    return new GetPageOfStatusesResponse(response, hasMoreItems, true);
}
