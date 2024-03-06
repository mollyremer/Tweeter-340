import { AuthToken } from "tweeter-shared";
import { AppNavbarPresenter, AppNavbarView } from "../../src/presenter/AppNavbarPresenter"
import { anything, capture, instance, mock, spy, verify, when } from "ts-mockito"
import { UserService } from "../../src/model/service/UserService";

describe("AppNavbarPresenter", () => {
    let mockAppNavbarView: AppNavbarView;
    let appNavbarPresenter: AppNavbarPresenter;
    let mockUserService: UserService;
    const authToken = new AuthToken("abc123", Date.now());

    beforeEach(() => {
        mockAppNavbarView = mock<AppNavbarView>(); //Use for verification
        const mockAppNavbarViewInstance = instance(mockAppNavbarView); //Use when passing as a parameter or calling a function

        const appNavbarPresenterSpy = spy(new AppNavbarPresenter(mockAppNavbarViewInstance)); //create a spy
        appNavbarPresenter = instance(appNavbarPresenterSpy);   //create instance of the thing you want to spy on

        mockUserService = mock<UserService>();
        const mockUserServiceInstance = instance(mockUserService);

        //when the spy's presenter uses its userService getter, return my mockUserServiceInstance instead
        when(appNavbarPresenterSpy.userService).thenReturn(mockUserServiceInstance); 
    });

    //await for presenter to finish logout call
    //function must be labeled async for that to work
    it("tells the view to display a logging out message", async () => {
        await appNavbarPresenter.logout(authToken);
        verify(mockAppNavbarView.displayInfoMessage("Logging Out...", 0)).once();
    });

    it("calls logout on the user service with the correct authtoken", async () => {
        await appNavbarPresenter.logout(authToken);
        verify(mockUserService.logout(authToken)).once();

        // verify(mockUserService.logout(anything())).once();
        // let [capturedAuthToken] = capture(mockUserService.logout).last();
        // expect(capturedAuthToken).toEqual(authToken);
    });

    it("tells the view to clear the last info message, clear the user info, and navigate to the login page", async () => {
        await appNavbarPresenter.logout(authToken);
        verify(mockAppNavbarView.displayErrorMessage(anything())).never();
        verify(mockAppNavbarView.clearLastInfoMessage()).once();
        verify(mockAppNavbarView.clearUserInfo()).once();
        //verify(mockAppNavbarView.navigateToLogin()).once();
    });

    it("tells the view to display an error message and does not tell it to do the following: clear the last info message, clear the user info, and navigate to the login page", async () => {
        const error = new Error("An error occurred");
        when(mockUserService.logout(authToken)).thenThrow(error);

        await appNavbarPresenter.logout(authToken);
        
        let [capturedErrorMessage] = capture(mockAppNavbarView.displayErrorMessage).last();
        console.log(capturedErrorMessage);

        verify(mockAppNavbarView.displayErrorMessage("Failed to log user out because of exception: An error occurred")).once();
        verify(mockAppNavbarView.clearLastInfoMessage()).never();
        verify(mockAppNavbarView.clearUserInfo()).never();
        //verify(mockAppNavbarView.navigateToLogin()).once();
    });
});