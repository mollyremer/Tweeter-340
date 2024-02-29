import { UserService } from "../model/service/UserService";
import { AuthToken } from "tweeter-shared";
import { MessageInfoView, Presenter } from "./Presenter";

export interface LogoutView extends MessageInfoView {
    authToken: AuthToken | null;
    clearUserInfo: () => void;
}

export class LogoutPresenter extends Presenter{
    private service: UserService;

    constructor(view: LogoutView) {
        super(view);
        this.service = new UserService;
    }

    protected get view(): LogoutView {
        return super.view as LogoutView;
    }

    public async logOut() {
        this.view.displayInfoMessage("Logging Out...", 0);
        this.doFailureReportingOperation(async () => {
            await this.service.logout(this.view.authToken!);

            this.view.clearLastInfoMessage();
            this.view.clearUserInfo();
        }, "log user out")
    };
}