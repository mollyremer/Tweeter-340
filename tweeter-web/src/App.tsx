import "./App.css";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import Login from "./components/authentication/login/Login";
import Register from "./components/authentication/register/Register";
import MainLayout from "./components/mainLayout/MainLayout";
import Toaster from "./components/toaster/Toaster";
import StatusItemScroller from "./components/mainLayout/StatusItemScroller";
import UserItemScroller from "./components/mainLayout/UserItemScroller";
import useUserInfo from "./components/userInfo/UserInfoHook";
import { FollowingPresenter } from "./presenter/feedAndStory/FollowingPresenter";
import { UserItemView } from "./presenter/feedAndStory/UserItemPresenter";
import { FollowerPresenter } from "./presenter/feedAndStory/FollowerPresenter";
import { StoryPresenter } from "./presenter/feedAndStory/StoryPresenter";
import { StatusItemView } from "./presenter/feedAndStory/StatusItemPresenter";
import { FeedPresenter } from "./presenter/feedAndStory/FeedPresenter";
import { Status } from "tweeter-shared";
import StatusItem from "./components/statusItem/StatusItem";

const App = () => {
  const { currentUser, authToken } = useUserInfo();

  const isAuthenticated = (): boolean => {
    return !!currentUser && !!authToken;
  };

  return (
    <div>
      <Toaster position="top-right" />
      <BrowserRouter>
        {isAuthenticated() ? (
          <AuthenticatedRoutes />
        ) : (
          <UnauthenticatedRoutes />
        )}
      </BrowserRouter>
    </div>
  );
};

const AuthenticatedRoutes = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<Navigate to="/feed" />} />
        <Route
          path="feed"
          element={
            <StatusItemScroller
              key={1}
              presenterGenerator={(view: StatusItemView) => new FeedPresenter(view)}
              // itemComponentGenerator={(item: Status) => new StatusItem(item)}
            />
          }
        />
        <Route
          path="story"
          element={
            <StatusItemScroller
              key={2}
              presenterGenerator={(view: StatusItemView) => new StoryPresenter(view)}
            />
          }
        />
        <Route
          path="following"
          element={
            <UserItemScroller
              key={3}
              presenterGenerator={(view: UserItemView) => new FollowingPresenter(view)}
            />
          }
        />
        <Route
          path="followers"
          element={
            <UserItemScroller
              key={4}
              presenterGenerator={(view: UserItemView) => new FollowerPresenter(view)}
            />
          }
        />
        <Route path="logout" element={<Navigate to="/login" />} />
        <Route path="*" element={<Navigate to="/feed" />} />
      </Route>
    </Routes>
  );
};

const UnauthenticatedRoutes = () => {
  const location = useLocation();

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="*" element={<Login originalUrl={location.pathname} />} />
    </Routes>
  );
};

export default App;
