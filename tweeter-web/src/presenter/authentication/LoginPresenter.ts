import { AuthenticatePresenter, AuthenticateView } from "./AuthenticatePresenter";

export class LoginPresenter extends AuthenticatePresenter {
    public constructor(view: AuthenticateView) {
        super(view);
    }

    public async login(alias: string, password: string, originalUrl: string | undefined): Promise<void> {
       this.doAuthenticationOperation(async () => {return this.service.login(alias, password)}, "log user in", originalUrl);
    }

    protected navigateTo(originalUrl: string | undefined): void {
        if (!!originalUrl) {
            this.view.navigate(originalUrl);
        } else {
            this.view.navigate("/");
        }
    }
}