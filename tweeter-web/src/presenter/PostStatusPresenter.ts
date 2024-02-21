import useUserInfo from "../components/userInfo/UserInfoHook";
import { UserService } from "../model/service/UserService";
import { AuthToken, Status, User } from "tweeter-shared";

export interface PostStatusView {
  displayInfoMessage: (message: string, duration: number, bootstrapClasses?: string | undefined) => void,
  clearLastInfoMessage: () => void,
  displayErrorMessage: (message: string, bootstrapClasses?: string | undefined) => void,
  clearPost: (event: React.MouseEvent) => void
}

export class PostStatusPresenter {
  private view: PostStatusView;
  private service: UserService;

  constructor(view: PostStatusView) {
    this.view = view;
    this.service = new UserService;
  }

  public post = "";

  public async submitPost(event: React.MouseEvent, authToken: AuthToken | null, currentUser: User | null) {
    event.preventDefault();

    try {
      this.view.displayInfoMessage("Posting status...", 0);

      let status = new Status(this.post, currentUser!, Date.now());

      await this.service.postStatus(authToken!, status);

      this.view.clearLastInfoMessage();
      this.view.clearPost(event);
      this.view.displayInfoMessage("Status posted!", 2000);
    } catch (error) {
      this.view.displayErrorMessage(
        `Failed to post the status because of exception: ${error}`
      );
    }
  };
}