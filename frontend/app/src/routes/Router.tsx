import CommonLayout from "components/layout/CommonLayout";
import useAuthorizeAdminUser from "features/auth/hooks/useAuthorizeAdminUser";
import useAuthorizeLoggedInUser from "features/auth/hooks/useAuthorizeLoggedInUser";
import useAuthorizeLoggedOutUser from "features/auth/hooks/useAuthorizeLoggedOutUser";
import useAuthorizeRegisteredUser from "features/auth/hooks/useAuthorizeRegisteredUser";
import Home from "pages/Home";
import Login from "pages/Login";
import Profile from "pages/Profile";
import SignUp from "pages/SignUp";
import UserManagementPage from "pages/UserManagementPage";
import VideoListPage from "pages/VideoListPage";
import WorldViewListPage from "pages/WorldViewListPage";
import { VideoListProvider } from "providers/VideoListProvider";
import { WorldViewListProvider } from "providers/WorldViewListProvider";
import { FC } from "react";
import { Route, Routes } from "react-router-dom";
import AuthorizationRoute from "./AuthorizationRoute";

const Router: FC = () => {
  const { handleAuthorizeAdminUser, loadingAuthorizeAdminUser } = useAuthorizeAdminUser();
  const { handleAuthorizeLoggedInUser, loadingAuthorizeLoggedInUser } = useAuthorizeLoggedInUser();
  const { handleAuthorizeRegisteredUser, loadingAuthorizeRegisteredUser } =
    useAuthorizeRegisteredUser();
  const { handleAuthorizeLoggedOutUser, loadingAuthorizeLoggedOutUser } =
    useAuthorizeLoggedOutUser();

  return (
    <Routes>
      <Route
        path="/"
        element={
          <AuthorizationRoute
            handleAuthorizeUser={handleAuthorizeAdminUser}
            loading={loadingAuthorizeAdminUser}
          />
        }
      >
        <Route
          path="/users"
          element={
            <CommonLayout>
              <UserManagementPage />
            </CommonLayout>
          }
        />
      </Route>
      <Route
        path="/"
        element={
          <AuthorizationRoute
            handleAuthorizeUser={handleAuthorizeLoggedInUser}
            loading={loadingAuthorizeLoggedInUser}
          />
        }
      >
        <Route
          path="/world_views"
          element={
            <CommonLayout>
              <WorldViewListProvider>
                <WorldViewListPage />
              </WorldViewListProvider>
            </CommonLayout>
          }
        />
        <Route
          path="/videos"
          element={
            <CommonLayout>
              <VideoListProvider>
                <VideoListPage />
              </VideoListProvider>
            </CommonLayout>
          }
        />
      </Route>
      <Route
        path="/"
        element={
          <AuthorizationRoute
            handleAuthorizeUser={handleAuthorizeRegisteredUser}
            loading={loadingAuthorizeRegisteredUser}
          />
        }
      >
        <Route
          path="/profile"
          element={
            <CommonLayout>
              <Profile />
            </CommonLayout>
          }
        />
      </Route>
      <Route
        path="/home"
        element={
          <CommonLayout>
            <Home />
          </CommonLayout>
        }
      />
      <Route
        path="/"
        element={
          <AuthorizationRoute
            handleAuthorizeUser={handleAuthorizeLoggedOutUser}
            loading={loadingAuthorizeLoggedOutUser}
          />
        }
      >
        <Route
          path="/login"
          element={
            <CommonLayout>
              <Login />
            </CommonLayout>
          }
        />
        <Route
          path="/signup"
          element={
            <CommonLayout>
              <SignUp />
            </CommonLayout>
          }
        />
      </Route>
    </Routes>
  );
};

export default Router;
