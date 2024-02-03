import getCurrentUserApi from "features/auth/api/currentUserApi";
import useMessage from "hooks/useMessage";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const useAuthorizeAdminUser = () => {
  const { showMessage } = useMessage();
  const [loadingAuthorizeAdminUser, setLoading] = useState(true);
  const navigate = useNavigate();

  const handleAuthorizeAdminUser = async () => {
    try {
      const res = await getCurrentUserApi();
      if (res.data.status === 500 && !res.data.currentUser) {
        showMessage({ title: "ログインしてください。", status: "error" });
        navigate("/login");
      }
      if (
        res.data.status === 200 &&
        res.data.currentUser &&
        res.data.currentUser.role !== "admin"
      ) {
        showMessage({ title: "一般ユーザーはアクセスできません。", status: "error" });
        navigate("/home");
      }
    } catch (e) {
      showMessage({ title: "エラーが発生しました。", status: "error" });
      navigate("/login");
    } finally {
      setLoading(false);
    }
  };
  return { handleAuthorizeAdminUser, loadingAuthorizeAdminUser };
};

export default useAuthorizeAdminUser;
