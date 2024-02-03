import getCurrentUser from "features/auth/api/currentUserApi";
import useMessage from "hooks/useMessage";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const useAuthorizeRegisteredUser = () => {
  const { showMessage } = useMessage();
  const [loadingAuthorizeRegisteredUser, setLoading] = useState(true);
  const navigate = useNavigate();

  const handleAuthorizeRegisteredUser = async () => {
    try {
      const res = await getCurrentUser();
      if (res.data.status === 500 && !res.data.currentUser) {
        showMessage({ title: "ログインしてください。", status: "error" });
        navigate("/login");
      }
      if (
        res.data.status === 200 &&
        res.data.currentUser &&
        res.data.currentUser.role === "guest"
      ) {
        showMessage({ title: "ゲストユーザーはアクセスできません。", status: "error" });
        navigate("/home");
      }
    } catch (e) {
      showMessage({ title: "エラーが発生しました。", status: "error" });
      navigate("/login");
    } finally {
      setLoading(false);
    }
  };
  return { handleAuthorizeRegisteredUser, loadingAuthorizeRegisteredUser };
};

export default useAuthorizeRegisteredUser;
