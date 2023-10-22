import { useAuth } from "hooks/providers/useAuthProvider";
import useMessage from "hooks/useMessage";
import Cookies from "js-cookie";
import { guestLogin } from "lib/api/auth";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

const useGuestLogin = () => {
  const { setIsSignedIn, setCurrentUser, setLoading } = useAuth();
  const { showMessage } = useMessage();
  const navigate = useNavigate();
  const handleGuestLogin = useCallback(async () => {
    setLoading(true);

    try {
      const res = await guestLogin();
      Cookies.set("_access_token", res.headers["access-token"]);
      Cookies.set("_client", res.headers.client);
      Cookies.set("_uid", res.headers.uid);
      setIsSignedIn(true);
      setCurrentUser(res.data.data);
      showMessage({ title: "ゲストログインしました。", status: "success" });
      navigate("/home");
    } catch (err) {
      showMessage({ title: "エラーが発生しました。", status: "error" });
    } finally {
      setLoading(false);
    }
  }, []);
  return { handleGuestLogin };
};
export default useGuestLogin;
