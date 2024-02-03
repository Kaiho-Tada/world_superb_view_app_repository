import Loading from "components/ui-elements/Loading";
import { FC, useEffect } from "react";
import { Outlet } from "react-router-dom";

type Props = {
  handleAuthorizeUser: () => Promise<void>;
  loading: boolean;
};

const AuthorizationRoute: FC<Props> = ({ handleAuthorizeUser, loading }) => {
  useEffect(() => {
    handleAuthorizeUser();
  }, [handleAuthorizeUser]);

  return loading ? <Loading /> : <Outlet />;
};

export default AuthorizationRoute;
