import { AuthToken, Status, User } from "tweeter-shared";
import { StatusItemPresenter } from "./StatusItemPresenter";
import { PAGE_SIZE } from "./PagedItemPresenter";

export class StoryPresenter extends StatusItemPresenter {
    protected getItemDescription(): string {
        throw new Error("Method not implemented.");
    }
    protected getMoreItems(authToken: AuthToken, user: User): Promise<[Status[], boolean]> {
        return this.service.loadMoreStoryItems(authToken, user, PAGE_SIZE, this.lastItem);
    }
}