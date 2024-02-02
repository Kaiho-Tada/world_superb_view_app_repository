import getCurrentUser from "features/auth/api/currentUserApi";
import useMessage from "hooks/useMessage";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const useCheckGuestUser = () => {
  const { showMessage } = useMessage();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const handleCheckGuestUser = async () => {
    try {
      const res = await getCurrentUser();
      if (!res.data.currentUser) {
        showMessage({ title: "ログインしてください。", status: "error" });
        navigate("/login");
      }
      if (res.data.currentUser && res.data.currentUser.role === "guest") {
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
  return { handleCheckGuestUser, loading };
};

export default useCheckGuestUser;
