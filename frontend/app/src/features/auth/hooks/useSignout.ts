import { isAxiosError } from "axios";
import { signout } from "features/auth/api/auth";
import useMessage from "hooks/useMessage";
import Cookies from "js-cookie";
import { useAuth } from "providers/useAuthProvider";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

const useSignout = () => {
  const { setLoading, setIsSignedIn, setCurrentUser } = useAuth();
  const { showMessage } = useMessage();
  const navigate = useNavigate();

  const handleSignout = useCallback(async () => {
    setLoading(true);
    try {
      await signout();
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
        showMessage({ title: "エラーが発生しました。", status: "error" });
      }
    }
    setLoading(false);
  }, []);
  return { handleSignout };
};
export default useSignout;
