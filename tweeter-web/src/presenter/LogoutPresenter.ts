import { UserService } from "../model/service/UserService";
import { AuthToken } from "tweeter-shared";

export interface LogoutView {
    authToken: AuthToken | null;
    clearUserInfo: () => void;
    clearLastInfoMessage: () => void;
    displayInfoMessage: (message: string, duration: number, bootstrapClasses?: string | undefined) => void;
    displayErrorMessage: (message: string, bootstrapClasses?: string | undefined) => void
}

export class LogoutPresenter {
    private view: LogoutView;
    private service: UserService;

    constructor(view: LogoutView) {
        this.view = view;
        this.service = new UserService;
    }


    public async logOut() {
        this.view.displayInfoMessage("Logging Out...", 0);

        try {
            await this.service.logout(this.view.authToken!);

            this.view.clearLastInfoMessage();
            this.view.clearUserInfo();
        } catch (error) {
            this.view.displayErrorMessage(
                `Failed to log user out because of exception: ${error}`
            );
        }
    };
}