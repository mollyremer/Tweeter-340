import { User, AuthToken } from "tweeter-shared";
import { UserItemPresenter } from "./UserItemPresenter";
import { PAGE_SIZE } from "./PagedItemPresenter";

export class FollowingPresenter extends UserItemPresenter {
    protected getItemDescription(): string {
        return "load following items";
    }

    protected getMoreItems(authToken: AuthToken, user: User): Promise<[User[], boolean]> {
        return this.service.loadMoreFollowees(authToken, user, PAGE_SIZE, this.lastItem);
    }
}
