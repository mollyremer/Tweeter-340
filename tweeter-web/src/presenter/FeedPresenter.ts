import { AuthToken, Status, User } from "tweeter-shared";
import { StatusItemPresenter, StatusItemView } from "./StatusItemPresenter";
import { PAGE_SIZE } from "./PagedItemPresenter";

export class FeedPresenter extends StatusItemPresenter {
    protected getItemDescription(): string {
        return "load feed items";
    }
    
    protected getMoreItems(authToken: AuthToken, user: User): Promise<[Status[], boolean]> {
        return this.service.loadMoreStoryItems(authToken, user, PAGE_SIZE, this.lastItem);
    }
}