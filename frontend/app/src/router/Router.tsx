import Home from "components/pages/Home";
import Login from "components/pages/Login";
import Profile from "components/pages/Profile";
import SignUp from "components/pages/SignUp";
import SuperbViewList from "components/pages/SuperbViewList";
import CommonLayout from "components/templates/CommonLayout";
import GuestRestrictedRoute from "components/templates/GuestRestrictedRoute";
import PrivateRoute from "components/templates/PrivateRoute";
import PublicRoute from "components/templates/PublicRoute";
import { SuperbViewListProvider } from "hooks/providers/SuperbViewListProvider";
import { FC, memo } from "react";
import { Route, Routes } from "react-router-dom";

const Router: FC = memo(() => (
  <Routes>
    <Route path="/" element={<PrivateRoute />}>
      <Route
        path="/superb_views"
        element={
          <CommonLayout>
            <SuperbViewListProvider>
              <SuperbViewList />
            </SuperbViewListProvider>
          </CommonLayout>
        }
      />
    </Route>
    <Route path="/" element={<GuestRestrictedRoute />}>
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
));

Router.displayName = "Router";
export default Router;
