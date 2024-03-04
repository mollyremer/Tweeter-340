import { User, AuthToken } from "tweeter-shared";
import { UserService } from "../../model/service/UserService";
import { Presenter, View } from "../Presenter";

export interface AuthenticateView extends View {
    updateUserInfo: (user: User, authToken: AuthToken) => void,
    navigate: (url: string) => void;
}

export abstract class AuthenticatePresenter extends Presenter {
    protected service: UserService;

    public constructor(view: AuthenticateView) {
        super(view);
        this.service = new UserService;
    }

    protected get view(): AuthenticateView {
        return super.view as AuthenticateView;
    }

    protected async doAuthenticationOperation(operation: () => Promise<[User, AuthToken]>, description: string, originalUrl: string | undefined): Promise<void>{
        this.doFailureReportingOperation(async () => {
            let [user, authToken] = await operation();
            this.view.updateUserInfo(user, authToken);
            this.navigateTo(originalUrl)
        }, description)
    }

    protected abstract navigateTo(originalUrl: string | undefined): void;
}