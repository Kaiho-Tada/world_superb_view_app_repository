import { isAxiosError } from "axios";
import { useAuth } from "hooks/providers/useAuthProvider";
import useMessage from "hooks/useMessage";
import Cookies from "js-cookie";
import { deleteUser } from "lib/api/auth";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

const useDeleteUser = () => {
  const { setCurrentUser, setLoading, setIsSignedIn } = useAuth();
  const navigate = useNavigate();
  const { showMessage } = useMessage();

  const handleDeleteUser = useCallback(async () => {
    setLoading(true);
    try {
      const res = await deleteUser();
      Cookies.remove("_access_token");
      Cookies.remove("_client");
      Cookies.remove("_uid");
      setIsSignedIn(false);
      setCurrentUser(undefined);
      showMessage({ title: res.data.message, status: "success" });
      navigate("/login");
    } catch (error) {
      if (isAxiosError(error) && error.response && error.response.status === 404) {
        error.response.data.errors.map((errorMessage: string) =>
          showMessage({ title: errorMessage, status: "error" })
        );
      } else {
        showMessage({ title: "エラーが発生しました。", status: "error" });
      }
    } finally {
      setLoading(false);
    }
  }, []);
  return { handleDeleteUser };
};
export default useDeleteUser;
