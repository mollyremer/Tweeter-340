import { NavigateFunction } from "react-router-dom";
import { UserService } from "../model/service/UserService"
import { User, AuthToken } from "tweeter-shared";

export interface RegisterView {
    updateUserInfo: (currentUser: User, authToken: AuthToken) => void
    navigate: NavigateFunction,
    displayErrorMessage: (message: string, bootstrapClasses?: string | undefined) => void
}

export class RegisterPresenter {
    private view: RegisterView;
    private service: UserService;

    constructor(view: RegisterView) {
        this.view = view;
        this.service = new UserService
    }

    public firstName = "";
    public lastName = "";
    public alias = "";
    public password = "";
    public imageBytes = <Uint8Array>(new Uint8Array);

    public async doRegister() {
        try {
            let [user, authToken] = await this.service.register(
                this.firstName,
                this.lastName,
                this.alias,
                this.password,
                this.imageBytes
            );

            this.view.updateUserInfo(user, authToken);
            this.view.navigate("/");
        } catch (error) {
           this.view.displayErrorMessage(
                `Failed to register user because of exception: ${error}`
            );
        }
    };
}