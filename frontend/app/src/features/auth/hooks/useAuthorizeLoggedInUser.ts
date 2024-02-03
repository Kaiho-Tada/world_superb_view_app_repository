import getCurrentUser from "features/auth/api/currentUserApi";
import useMessage from "hooks/useMessage";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const useAuthorizeLoggedInUser = () => {
  const { showMessage } = useMessage();
  const [loadingAuthorizeLoggedInUser, setLoading] = useState(true);
  const navigate = useNavigate();

  const handleAuthorizeLoggedInUser = async () => {
    try {
      const res = await getCurrentUser();
      if (res.data.status === 500 && !res.data.currentUser) {
        showMessage({ title: "ログインしてください。", status: "error" });
        navigate("/login");
      }
    } catch (e) {
      showMessage({ title: "エラーが発生しました。", status: "error" });
      navigate("/login");
    } finally {
      setLoading(false);
    }
  };
  return { handleAuthorizeLoggedInUser, loadingAuthorizeLoggedInUser };
};

export default useAuthorizeLoggedInUser;
