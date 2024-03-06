import { AuthToken, Status, User } from "tweeter-shared";
import { UserService } from "../../src/model/service/UserService";
import { PostStatusPresenter, PostStatusView } from "../../src/presenter/PostStatusPresenter";
import { anything, capture, instance, mock, spy, verify, when } from "ts-mockito";

describe("PostStatusPresenter", () => {
    let mockPostStatusView: PostStatusView;
    let postStatusPresenter: PostStatusPresenter;
    let mockUserService: UserService;
    const authToken = new AuthToken("abc123", Date.now());
    const currentUser = new User("Mary", "Smith", "marySmith", "image123");
    const status = new Status("", currentUser!, Date.now());

    beforeEach(() => {
        mockPostStatusView = mock<PostStatusView>();
        const mockPostStatusViewInstance = instance(mockPostStatusView);

        const postStatusPresenterSpy = spy(new PostStatusPresenter(mockPostStatusViewInstance));
        postStatusPresenter = instance(postStatusPresenterSpy);
    
        mockUserService = mock<UserService>();
        const mockUserServiceInstance = instance(mockUserService);

        when(postStatusPresenterSpy.service).thenReturn(mockUserServiceInstance);
    });

    it("tells the view to display a posting status message", async () => {
        await postStatusPresenter.submitPost(authToken, currentUser);
        verify(mockPostStatusView.displayInfoMessage("Posting status...", 0)).once();
    });

    it("calls postStatus on the post status service with the correct status string and auth token", async () => {
        await postStatusPresenter.submitPost(authToken, currentUser);
        // let [capturedAuthToken, capturedStatus] = capture(mockUserService.postStatus).last();
        // console.log(capturedStatus.formattedDate);
        verify(mockUserService.postStatus(authToken, status));
    });

    it("tells the view to clear the last info message, clear the post, and display a status posted message", async () => {
        await postStatusPresenter.submitPost(authToken, currentUser);
        verify(mockPostStatusView.displayErrorMessage(anything())).never();
        verify(mockPostStatusView.clearLastInfoMessage()).once();
        verify(mockPostStatusView.clearPost()).once();
        verify(mockPostStatusView.displayInfoMessage("Status posted!", 2000)).once();
    });

    it("tells the view to display an error message and does not tell it to do the following: clear the last info message, clear the post, and display a status posted message", async () => {
        const error = new Error("An error occurred");
        when(mockUserService.postStatus(anything(), anything())).thenThrow(error);
        await postStatusPresenter.submitPost(authToken, currentUser);

        verify(mockPostStatusView.displayErrorMessage("Failed to post the status because of exception: An error occurred")).once();
        verify(mockPostStatusView.clearLastInfoMessage()).never();
        verify(mockPostStatusView.clearPost()).never();
        verify(mockPostStatusView.displayInfoMessage("Status posted!", 2000)).never();
    })
});