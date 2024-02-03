import Loading from "components/ui-elements/Loading";
import { FC, useEffect } from "react";
import { Outlet } from "react-router-dom";

type Props = {
  handleCheckUser: () => Promise<void>;
  loading: boolean;
};

const AuthorizationRoute: FC<Props> = ({ handleCheckUser, loading }) => {
  useEffect(() => {
    handleCheckUser();
  }, [handleCheckUser]);

  return loading ? <Loading /> : <Outlet />;
};

export default AuthorizationRoute;
