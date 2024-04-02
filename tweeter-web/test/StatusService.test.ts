import { StatusService } from "../src/model/service/StatusService"
import { AuthToken, Status, User } from "tweeter-shared";
import 'isomorphic-fetch';

describe("StatusService", () => {
    let statusService: StatusService = new StatusService;

    let user: User = new User("Allen", "Anderson", "@allen", "https://faculty.cs.byu.edu/~jwilkerson/cs340/tweeter/images/donald_duck.png");
    let authToken: AuthToken = new AuthToken("123", 123);

    it("should load more feed items", async () => {
        let [statuses, hasMorePages] = await statusService.loadMoreFeedItems(authToken, user, 1, null)
        
        expect(statuses).toBeInstanceOf(Array);
        for (const status of statuses){
            expect(status).not.toBeNull;
            expect(status).toBeInstanceOf(Status);
        }

        expect(hasMorePages).toBeTruthy;
    })
})