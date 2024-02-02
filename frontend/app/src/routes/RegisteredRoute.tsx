import Loading from "components/ui-elements/Loading";
import useCheckRegisteredUser from "features/auth/hooks/useCheckRegisteredUser";
import { FC, useEffect } from "react";
import { Outlet } from "react-router-dom";

const RegisteredRoute: FC = () => {
  const { handleCheckRegisteredUser, loading } = useCheckRegisteredUser();
  useEffect(() => {
    handleCheckRegisteredUser();
  }, []);

  return loading ? <Loading /> : <Outlet />;
};

export default RegisteredRoute;
