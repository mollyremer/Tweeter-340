import { User, AuthToken } from "tweeter-shared";
import { UserService } from "../model/service/UserService";
import { Presenter, View } from "./Presenter";

export interface UserNavigationView extends View{
    setDisplayedUser: (user: User) => void;
}

export class UserNavigationPresenter extends Presenter{
    private service: UserService;

    constructor(view: UserNavigationView){
        super(view);
        this.service = new UserService;
    }

    protected get view(): UserNavigationView {
        return super.view as UserNavigationView;
    }

    public extractAlias (value: string): string {
        let index = value.indexOf("@");
        return value.substring(index);
    };

    public async navigateToUser (event: string, authToken: AuthToken | null, currentUser: User | null): Promise<void> {
        this.doFailureReportingOperation(async () => {
            let alias = this.extractAlias(event);

            let user = await this.service.getUser(authToken!, alias);

            if (!!user) {
                if (currentUser!.equals(user)) {
                    this.view.setDisplayedUser(currentUser!);
                } else {
                    this.view.setDisplayedUser(user);
                }
            }
        }, "navigate to user");
    };
}