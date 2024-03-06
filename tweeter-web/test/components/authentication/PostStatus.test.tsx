import PostStatus from "../../../src/components/postStatus/PostStatus";
import { MemoryRouter } from "react-router-dom";
import { PostStatusPresenter } from "../../../src/presenter/PostStatusPresenter";
import { render, screen } from "@testing-library/react";
import React from "react";
import useUserInfo from "../../../src/components/userInfo/UserInfoHook";
import userEvent from "@testing-library/user-event";
import { instance, mock, verify } from "ts-mockito";
import { AuthToken, User } from "tweeter-shared";
import "@testing-library/jest-dom";

jest.mock("../../../src/components/userInfo/UserInfoHook", () => ({
    ...jest.requireActual("../../../src/components/userInfo/UserInfoHook"),
    __esModule: true,
    default: jest.fn(),
}));


// Both buttons are disabled when the text field is cleared.
// The presenter's postStatus method is called with correct parameters when the Post Status button is pressed.


describe("PostStatus Componenet", () => {
    const mockUser = mock<User>();
    const mockUserInstance = instance(mockUser);

    const mockAuthToken = mock<AuthToken>();
    const mockAuthTokenInstance = instance(mockAuthToken);

    beforeAll(() => {
        (useUserInfo as jest.Mock).mockReturnValue({
            currentUser: mockUserInstance,
            authToken: mockAuthTokenInstance,
        });
    });

    it("starts with the Post Status and Clear buttons disabled", () => {
        const { postStatusButton, clearStatusButton } = getElements();
        expect(postStatusButton).toBeDisabled();
        expect(clearStatusButton).toBeDisabled();
    });

    it("enables both buttons when the text field has text and disables both buttons when the text field is cleared", async () => {
        const { postStatusButton, clearStatusButton, textField, user} = getElements();

        await user.type(textField, "abc");
        expect(postStatusButton).toBeEnabled();
        expect(clearStatusButton).toBeEnabled();

        await user.clear(textField);
        expect(postStatusButton).toBeDisabled();
        expect(clearStatusButton).toBeDisabled();
    });

    it("calls postStatus method with correct parameters when the Post Status button is pressed", async () => {
        const mockPresenter = mock<PostStatusPresenter>();
        const mockPresenterInstance = instance(mockPresenter);

        const text = "abc";

        const { postStatusButton, clearStatusButton, textField, user} = getElements();
        
        await user.type(textField, text);

        verify(mockPresenter.submitPost(mockAuthToken, mockUserInstance, text));
    });
});

const renderPostStatus = (presenter?: PostStatusPresenter) => {
    return render(
        <MemoryRouter>
            <PostStatus presenter={presenter} />
        </MemoryRouter>
    );
};

const getElements = (presenter?: PostStatusPresenter) => {
    const user = userEvent.setup();

    renderPostStatus(presenter);

    const postStatusButton = screen.getByLabelText("postStatus");
    const clearStatusButton = screen.getByLabelText("clear");
    const textField = screen.getByLabelText("textField");

    return { postStatusButton, clearStatusButton, textField, user };
}