import { AuthToken, FakeData, User } from "tweeter-shared";
import useToastListener from "./toaster/ToastListenerHook";
import useUserInfo from "./userInfo/UserInfoHook";
import { UserNavigationPresenter, UserNavigationView } from "../presenter/UserNavigationPresenter";
import { useState } from "react";

interface UserNavigation {
    navigateToUser: (event: React.MouseEvent) => Promise<void>
}

const useUserNavigation = (): UserNavigation => {
    const { displayErrorMessage } = useToastListener();
    const { setDisplayedUser, currentUser, authToken } =
    useUserInfo();

    const listener: UserNavigationView = {
        setDisplayedUser: setDisplayedUser,
        displayErrorMessage: displayErrorMessage
    }

    const [presenter] = useState(new UserNavigationPresenter(listener));

    const navigateToUser = async (event: React.MouseEvent): Promise<void> => {
        event.preventDefault();
        presenter.navigateToUser(event.target.toString(), authToken, currentUser);
    };

    return {
        navigateToUser,
    };
};

export default useUserNavigation;