import { User, AuthToken } from "tweeter-shared";
import { UserItemPresenter } from "./UserItemPresenter";
import { PAGE_SIZE } from "./PagedItemPresenter";

export class FollowerPresenter extends UserItemPresenter {
    protected getItemDescription(): string {
        return "load follower items";
    }

    protected getMoreItems(authToken: AuthToken, user: User): Promise<[User[], boolean]> {
        return this.service.loadMoreFollowers(authToken, user, PAGE_SIZE, this.lastItem);
    }
}
