import getCurrentUser from "features/auth/api/currentUserApi";
import useMessage from "hooks/useMessage";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const useAuthorizeLoggedOutUser = () => {
  const { showMessage } = useMessage();
  const [loadingAuthorizeLoggedOutUser, setLoading] = useState(true);
  const navigate = useNavigate();

  const handleAuthorizeLoggedOutUser = async () => {
    try {
      const res = await getCurrentUser();
      if (res.data.status === 200 && res.data.currentUser) {
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
  return { handleAuthorizeLoggedOutUser, loadingAuthorizeLoggedOutUser };
};

export default useAuthorizeLoggedOutUser;
