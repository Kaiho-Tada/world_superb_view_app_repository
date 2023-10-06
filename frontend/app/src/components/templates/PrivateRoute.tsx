import { Loading } from "components/atoms/Loading";
import { useMessage } from "hooks/useMessage";
import { getCurrentUser } from "lib/api/auth";
import { FC, useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

export const PrivateRoute: FC = () => {
  const { showMessage } = useMessage();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    const checkUser = async () => {
      try {
        const res = await getCurrentUser();
        console.log(res);
        if (res.data.status === 200) {
          return
        } else {
          showMessage({title: "ログインしてください。", status: "error"});
          navigate('/login');
        };
      } catch (e) {
        showMessage({title: "ログインしてください。", status: "error"});
        navigate('/login');
      } finally {
        setLoading(false);
      };
    };
    checkUser();
  }, []);
  if (loading) {
    return (
      <Loading />
    );
  };
  return <Outlet />
};
