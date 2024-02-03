import Loading from "components/ui-elements/Loading";
import { FC, memo, useEffect } from "react";
import { Outlet } from "react-router-dom";

type Props = {
  handleAuthorizeUser: () => Promise<void>;
  loading: boolean;
};

const AuthorizationRoute: FC<Props> = memo(({ handleAuthorizeUser, loading }) => {
  useEffect(() => {
    handleAuthorizeUser();
  }, [handleAuthorizeUser]);

  return loading ? <Loading /> : <Outlet />;
});

export default AuthorizationRoute;
