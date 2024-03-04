import { AuthenticatePresenter, AuthenticateView } from "./AuthenticatePresenter";

export class RegisterPresenter extends AuthenticatePresenter {
    constructor(view: AuthenticateView) {
        super(view);
    }

    public async doRegister(alias: string, password: string, firstName: string, lastName: string, imageBytes: Uint8Array) {
        this.doAuthenticationOperation(
            async () => { return this.service.register(firstName, lastName, alias, password, imageBytes) },
            "register user",
            undefined);
    };

    protected navigateTo(): void {
        this.view.navigate("/");
    }

}