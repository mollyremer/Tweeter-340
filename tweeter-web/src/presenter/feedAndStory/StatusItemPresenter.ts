import { Status } from "tweeter-shared";
import { View } from "../Presenter";
import { PagedItemPresenter } from "./PagedItemPresenter";
import { StatusService } from "../../model/service/StatusService";

export interface StatusItemView extends View {
    addItems: (items: Status[]) => void;
}

export abstract class StatusItemPresenter extends PagedItemPresenter<Status, StatusService>{
    protected createService(): StatusService {
        return new StatusService();
    }
}