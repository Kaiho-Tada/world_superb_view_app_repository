import Loading from "components/ui-elements/Loading";
import getCurrentUser from "features/auth/api/currentUserApi";
import useMessage from "hooks/useMessage";
import { FC, useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const GuestRestrictedRoute: FC = () => {
  const { showMessage } = useMessage();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    const checkUser = async () => {
      try {
        const res = await getCurrentUser();
        if (res.status === 200) {
          if (res.data.status === 200) {
            if (res.data.currentUser.email === "guest@example.com") {
              showMessage({ title: "ゲストユーザーはアクセスできません。", status: "error" });
              navigate("/home");
            }
            return;
          }
          if (res.data.status === 500) {
            showMessage({ title: "ログインしてください。", status: "error" });
            navigate("/login");
          }
        }
      } catch (e) {
        showMessage({ title: "エラーが発生しました。", status: "error" });
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };
    checkUser();
  }, []);
  if (loading) {
    return <Loading />;
  }
  return <Outlet />;
};

export default GuestRestrictedRoute;
