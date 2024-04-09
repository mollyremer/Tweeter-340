import { AuthToken, User } from "tweeter-shared";
import { UserService } from "../model/service/UserService";
import { MessageInfoView, Presenter } from "./Presenter";

export interface UserInfoView extends MessageInfoView {
    setIsFollower: React.Dispatch<React.SetStateAction<boolean>>;
    setFolloweesCount: React.Dispatch<React.SetStateAction<number>>;
    setFollowersCount: React.Dispatch<React.SetStateAction<number>>;
}

export class UserInfoPresenter extends Presenter {
    private service: UserService;

    constructor(view: UserInfoView) {
        super(view);
        this.service = new UserService;
    }

    protected get view(): UserInfoView {
        return super.view as UserInfoView;
    }

    public async setIsFollowerStatus(
        authToken: AuthToken,
        currentUser: User,
        displayedUser: User
    ) {
        this.doFailureReportingOperation(async () => {
            if (currentUser === displayedUser) {
                this.view.setIsFollower(false);
            } else {
                this.view.setIsFollower(
                    await this.service.getIsFollowerStatus(authToken!, currentUser!, displayedUser!)
                );
            }
        }, "determine follower status");
    };

    public async setNumbFollowees(
        authToken: AuthToken,
        displayedUser: User
    ) {
        this.doFailureReportingOperation(async () => {
            this.view.setFolloweesCount(await this.service.getFolloweesCount(authToken, displayedUser));
        }, "get following count");
    };

    public async setNumbFollowers(
        authToken: AuthToken,
        displayedUser: User
    ) {
        this.doFailureReportingOperation(async () => {
            this.view.setFollowersCount(await this.service.getFollowersCount(authToken, displayedUser));
        }, "get followers count");
    };

    public async followDisplayedUser(
        event: React.MouseEvent,
        displayedUser: User | null,
        currentUser: User | null,
        authToken: AuthToken | null
    ): Promise<void> {
        event.preventDefault();
        this.doFailureReportingOperation(async () => {
            this.view.displayInfoMessage(`Adding ${displayedUser!.name} to followers...`, 0);

            let [followersCount, followeesCount] = await this.service.follow(
                currentUser!,
                authToken!,
                displayedUser!
            );

            this.view.clearLastInfoMessage();

            this.view.setIsFollower(true);
            this.view.setFollowersCount(followersCount);
            this.view.setFolloweesCount(followeesCount);
        }, "follow user");
    };

    public async unfollowDisplayedUser(
        event: React.MouseEvent,
        displayedUser: User | null,
        currentUser: User | null,
        authToken: AuthToken | null
    ): Promise<void> {
        event.preventDefault();

        this.doFailureReportingOperation(async() => {
            this.view.displayInfoMessage(
                `Removing ${displayedUser!.name} from followers...`,
                0
            );

            let [followersCount, followeesCount] = await this.service.unfollow(
                currentUser!,
                authToken!,
                displayedUser!
            );

            this.view.clearLastInfoMessage();

            this.view.setIsFollower(false);
            this.view.setFollowersCount(followersCount);
            this.view.setFolloweesCount(followeesCount);
        }, "unfollow user");
    };
}