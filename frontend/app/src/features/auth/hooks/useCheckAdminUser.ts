import getCurrentUserApi from "features/auth/api/currentUserApi";
import useMessage from "hooks/useMessage";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const useCheckAdminUser = () => {
  const { showMessage } = useMessage();
  const [loadingCheckAdminUser, setLoading] = useState(true);
  const navigate = useNavigate();

  const handleCheckAdminUser = async () => {
    try {
      const res = await getCurrentUserApi();
      if (!res.data.currentUser) {
        showMessage({ title: "ログインしてください。", status: "error" });
        navigate("/login");
      }
      if (res.data.currentUser && res.data.currentUser.role !== "admin") {
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
  return { handleCheckAdminUser, loadingCheckAdminUser };
};

export default useCheckAdminUser;
