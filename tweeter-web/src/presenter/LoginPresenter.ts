import { User, AuthToken } from "tweeter-shared";
import { UserService } from "../model/service/UserService";
import { useNavigate } from "react-router-dom";

export interface LoginView {
    updateUserInfo: (user: User, authToken: AuthToken) => void,
    originalUrl?: string,
    displayErrorMessage: (message: string, bootstrapClasses?: string | undefined) => void,
}

export class LoginPresenter {
    private view: LoginView;
    private service: UserService;

    constructor(view: LoginView) {
        this.view = view;
        this.service = new UserService;
    }

    public navigate = useNavigate();
    public alias = "";
    public password = "";

    public async doLogin() {
        try {
            let [user, authToken] = await this.service.login(this.alias, this.password);

            this.view.updateUserInfo(user, authToken);

            if (!!this.view.originalUrl) {
                this.navigate(this.view.originalUrl);
            } else {
                this.navigate("/");
            }
        } catch (error) {
            this.view.displayErrorMessage(
                `Failed to log user in because of exception: ${error}`
            );
        }
    };
}