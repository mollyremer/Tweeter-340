import useUserInfo from "../components/userInfo/UserInfoHook";
import { UserService } from "../model/service/UserService";
import { AuthToken, Status, User } from "tweeter-shared";
import { MessageInfoView, Presenter } from "./Presenter";

export interface PostStatusView extends MessageInfoView {
  clearPost: (event: React.MouseEvent) => void
}

export class PostStatusPresenter extends Presenter {
  private service: UserService;

  constructor(view: PostStatusView) {
    super(view);
    this.service = new UserService;
  }

  protected get view(): PostStatusView {
    return super.view as PostStatusView;
  }

  public post = "";

  public async submitPost(event: React.MouseEvent, authToken: AuthToken | null, currentUser: User | null) {
    event.preventDefault();
    this.doFailureReportingOperation(async () => {
      this.view.displayInfoMessage("Posting status...", 0);

      let status = new Status(this.post, currentUser!, Date.now());

      await this.service.postStatus(authToken!, status);

      this.view.clearLastInfoMessage();
      this.view.clearPost(event);
      this.view.displayInfoMessage("Status posted!", 2000);
    }, "post the status");
  };
}