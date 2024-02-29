import { User, AuthToken } from "tweeter-shared";
import { UserService } from "../model/service/UserService";
import { Presenter, View } from "./Presenter";

export interface LoginView extends View {
    updateUserInfo: (user: User, authToken: AuthToken) => void,
    navigate: (url: string) => void;
}

export class LoginPresenter extends Presenter {
    private service: UserService;

    public constructor(view: LoginView) {
        super(view);
        this.service = new UserService;
    }

    protected get view(): LoginView {
        return super.view as LoginView;
    }

    public async login(alias: string, password: string, originalUrl: string | undefined): Promise<void> {
        this.doFailureReportingOperation(async () => {
            let [user, authToken] = await this.service.login(alias, password);

            this.view.updateUserInfo(user, authToken);

            if (!!originalUrl) {
                this.view.navigate(originalUrl);
            } else {
                this.view.navigate("/");
            }
        }, "log user in");
    }
}