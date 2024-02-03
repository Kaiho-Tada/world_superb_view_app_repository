import Loading from "components/ui-elements/Loading";
import useCheckLoggedInUser from "features/auth/hooks/useCheckLoggedInUser";
import { FC, useEffect } from "react";
import { Outlet } from "react-router-dom";

const PrivateRoute: FC = () => {
  const { handleCheckLoggedInUser, loading } = useCheckLoggedInUser();
  useEffect(() => {
    handleCheckLoggedInUser();
  }, []);

  return loading ? <Loading /> : <Outlet />;
};

export default PrivateRoute;
