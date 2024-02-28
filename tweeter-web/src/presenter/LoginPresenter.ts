import { User, AuthToken } from "tweeter-shared";
import { UserService } from "../model/service/UserService";

export interface LoginView {
    updateUserInfo: (user: User, authToken: AuthToken) => void,
    displayErrorMessage: (message: string, bootstrapClasses?: string | undefined) => void,
    navigate: (url: string) => void;
}

export class LoginPresenter {
    private view: LoginView;
    private service: UserService;

    constructor(view: LoginView) {
        this.view = view;
        this.service = new UserService;
    }

    public async login(
        alias: string,
        password: string,
        originalUrl: string | undefined
    ): Promise<void> {
        try {
            let [user, authToken] = await this.service.login(alias, password);

            this.view.updateUserInfo(user, authToken);

            if (!!originalUrl) {
                this.view.navigate(originalUrl);
            } else {
                this.view.navigate("/");
            }
        } catch (error) {
            this.view.displayErrorMessage(
                `Failed to log user in because of exception: ${error}`
            );
        }
    }
}