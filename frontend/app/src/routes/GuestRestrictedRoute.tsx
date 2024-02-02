import Loading from "components/ui-elements/Loading";
import useCheckGuestUser from "features/auth/hooks/useCheckGuestUser";
import { FC, useEffect } from "react";
import { Outlet } from "react-router-dom";

const GuestRestrictedRoute: FC = () => {
  const { handleCheckGuestUser, loading } = useCheckGuestUser();
  useEffect(() => {
    handleCheckGuestUser();
  }, []);

  return loading ? <Loading /> : <Outlet />;
};

export default GuestRestrictedRoute;
