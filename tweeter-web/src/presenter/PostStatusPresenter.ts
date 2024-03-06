import { UserService } from "../model/service/UserService";
import { AuthToken, Status, User } from "tweeter-shared";
import { MessageInfoView, Presenter } from "./Presenter";

export interface PostStatusView extends MessageInfoView {
  clearPost: () => void;
}

export class PostStatusPresenter extends Presenter {
  private _service: UserService;

  constructor(view: PostStatusView) {
    super(view);
    this._service = new UserService;
  }

  protected get view(): PostStatusView {
    return super.view as PostStatusView;
  }

  public get service(){
    return this._service;
  }

  public async submitPost(authToken: AuthToken | null, currentUser: User | null, post: string) {
    // this.view.event.preventDefault();
    this.doFailureReportingOperation(async () => {
      this.view.displayInfoMessage("Posting status...", 0);

      let status = new Status(post, currentUser!, Date.now());

      await this.service.postStatus(authToken!, status);

      this.view.clearLastInfoMessage();
      this.view.clearPost();
      this.view.displayInfoMessage("Status posted!", 2000);
    }, "post the status");
  };
}