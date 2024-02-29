import { NavigateFunction } from "react-router-dom";
import { UserService } from "../model/service/UserService"
import { User, AuthToken } from "tweeter-shared";
import { Presenter, View } from "./Presenter";

export interface RegisterView extends View {
    updateUserInfo: (currentUser: User, authToken: AuthToken) => void
    navigate: NavigateFunction,
}

export class RegisterPresenter extends Presenter {
    private service: UserService;

    constructor(view: RegisterView) {
        super(view);
        this.service = new UserService;
    }

    protected get view(): RegisterView {
        return super.view as RegisterView;
    }

    public firstName = "";
    public lastName = "";
    public alias = "";
    public password = "";
    public imageBytes = <Uint8Array>(new Uint8Array);

    public async doRegister() {
        this.doFailureReportingOperation(async () => {
            let [user, authToken] = await this.service.register(
                this.firstName,
                this.lastName,
                this.alias,
                this.password,
                this.imageBytes
            );

            this.view.updateUserInfo(user, authToken);
            this.view.navigate("/");
        }, "register user")
    };
}