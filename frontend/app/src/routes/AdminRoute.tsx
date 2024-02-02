import Loading from "components/ui-elements/Loading";
import useCheckAdminUser from "features/auth/hooks/useCheckAdminUser";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";

const AdminRoute = () => {
  const { handleCheckAdminUser, loading } = useCheckAdminUser();
  useEffect(() => {
    handleCheckAdminUser();
  }, []);

  return loading ? <Loading /> : <Outlet />;
};

export default AdminRoute;
