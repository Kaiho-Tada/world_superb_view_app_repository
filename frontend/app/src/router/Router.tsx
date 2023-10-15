import Home from "components/pages/Home";
import Login from "components/pages/Login";
import Profile from "components/pages/Profile";
import SignUp from "components/pages/SignUp";
import CommonLayout from "components/templates/CommonLayout";
import PrivateRoute from "components/templates/PrivateRoute";
import { FC, memo } from "react";
import { Route, Routes } from "react-router-dom";

const Router: FC = memo(() => (
  <Routes>
    <Route path="/" element={<PrivateRoute />}>
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
  </Routes>
));

Router.displayName = "Router";
export default Router;
