import CommonLayout from "components/layout/CommonLayout";
import Home from "pages/Home";
import Login from "pages/Login";
import Profile from "pages/Profile";
import SignUp from "pages/SignUp";
import UserManagementPage from "pages/UserManagementPage";
import WorldViewListPage from "pages/WorldViewListPage";
import { WorldViewListProvider } from "providers/WorldViewListProvider";
import { FC } from "react";
import { Route, Routes } from "react-router-dom";
import PrivateRoute from "routes/PrivateRoute";
import PublicRoute from "routes/PublicRoute";
import RegisteredRoute from "routes/RegisteredRoute";
import AdminRoute from "./AdminRoute";

const Router: FC = () => (
  <Routes>
    <Route path="/" element={<AdminRoute />}>
      <Route
        path="/users"
        element={
          <CommonLayout>
            <UserManagementPage />
          </CommonLayout>
        }
      />
    </Route>
    <Route path="/" element={<PrivateRoute />}>
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
    </Route>
    <Route path="/" element={<RegisteredRoute />}>
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
    <Route path="/" element={<PublicRoute />}>
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

Router.displayName = "Router";
export default Router;
