import Loading from "components/atoms/Loading";
import useMessage from "hooks/useMessage";
import { getCurrentUser } from "lib/api/auth";
import { FC, memo, useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const PublicRoute: FC = memo(() => {
  const { showMessage } = useMessage();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    const checkUser = async () => {
      try {
        const res = await getCurrentUser();
        if (res.data.status === 200) {
          showMessage({ title: "既にログインしています。", status: "error" });
          navigate("/home");
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
});

export default PublicRoute;
