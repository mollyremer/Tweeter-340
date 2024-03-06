import { UserService } from "../model/service/UserService";
import { AuthToken } from "tweeter-shared";
import { MessageInfoView, Presenter } from "./Presenter";

export interface AppNavbarView extends MessageInfoView {
    clearUserInfo: () => void;
    //navigateToLogin: (url: string) => void;
}

export class AppNavbarPresenter extends Presenter{
    // private _userService: UserService | null = null;
    private _userService: UserService;

    constructor(view: AppNavbarView) {
        super(view);
        this._userService = new UserService();
    }

    protected get view(): AppNavbarView {
        return super.view as AppNavbarView;
    }

    public get userService(){
        // if(this._userService == null) {
        //     this._userService = new UserService();
        // }
        return this._userService;
    }

    public async logout(authToken: AuthToken): Promise<void> {
        this.view.displayInfoMessage("Logging Out...", 0);
        this.doFailureReportingOperation(async () => {
            await this.userService.logout(authToken!);

            this.view.clearLastInfoMessage();
            this.view.clearUserInfo();
            //this.view.navigateToLogin();
        }, "log user out")
    };
}