import useMessage from "hooks/useMessage";
import Cookies from "js-cookie";
import { useAuth } from "providers/useAuthProvider";
import { useNavigate } from "react-router-dom";
import guestLoginApi from "../api/guestLoginApi";

const useGuestLogin = () => {
  const { setIsSignedIn, setCurrentUser, setLoading } = useAuth();
  const { showMessage } = useMessage();
  const navigate = useNavigate();
  const handleGuestLogin = async () => {
    setLoading(true);

    try {
      const res = await guestLoginApi();
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
  };
  return { handleGuestLogin };
};
export default useGuestLogin;
