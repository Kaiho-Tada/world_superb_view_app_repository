import { isAxiosError } from "axios";
import useMessage from "hooks/useMessage";
import Cookies from "js-cookie";
import { useAuth } from "providers/useAuthProvider";
import { useNavigate } from "react-router-dom";
import deleteUserApi from "../api/deleteUserApi";

const useDeleteUser = () => {
  const { setCurrentUser, setLoading, setIsSignedIn } = useAuth();
  const navigate = useNavigate();
  const { showMessage } = useMessage();

  const handleDeleteUser = async () => {
    setLoading(true);
    try {
      const res = await deleteUserApi();
      Cookies.remove("_access_token");
      Cookies.remove("_client");
      Cookies.remove("_uid");
      setIsSignedIn(false);
      setCurrentUser(undefined);
      showMessage({ title: res.data.message, status: "success" });
      navigate("/login");
    } catch (error) {
      if (isAxiosError(error) && error.response && error.response.status === 403) {
        showMessage({ title: error.response.data.error, status: "error" });
      } else if (isAxiosError(error) && error.response && error.response.status === 404) {
        error.response.data.errors.map((errorMessage: string) =>
          showMessage({ title: errorMessage, status: "error" })
        );
      } else {
        showMessage({ title: "サーバーでエラーが発生しました。", status: "error" });
      }
    } finally {
      setLoading(false);
    }
  };
  return { handleDeleteUser };
};
export default useDeleteUser;
