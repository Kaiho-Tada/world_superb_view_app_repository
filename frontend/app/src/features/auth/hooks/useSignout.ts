import { isAxiosError } from "axios";
import useMessage from "hooks/useMessage";
import Cookies from "js-cookie";
import { useAuth } from "providers/useAuthProvider";
import { useNavigate } from "react-router-dom";
import signoutApi from "../api/signOutApi";

const useSignout = () => {
  const { setIsSignedIn, setCurrentUser, setLoading } = useAuth();
  const { showMessage } = useMessage();
  const navigate = useNavigate();

  const handleSignout = async () => {
    setLoading(true);
    try {
      await signoutApi();
      Cookies.remove("_access_token");
      Cookies.remove("_client");
      Cookies.remove("_uid");
      setIsSignedIn(false);
      setCurrentUser(undefined);
      showMessage({ title: "サインアウトしました。", status: "success" });
      navigate("/login");
    } catch (error) {
      if (isAxiosError(error) && error.response && error.response.status === 404) {
        error.response.data.errors.map((errorMessage: string) =>
          showMessage({ title: errorMessage, status: "error" })
        );
      } else {
        showMessage({ title: "サインアウト時にエラーが発生しました。", status: "error" });
      }
    }
    setLoading(false);
  };
  return { handleSignout };
};
export default useSignout;
