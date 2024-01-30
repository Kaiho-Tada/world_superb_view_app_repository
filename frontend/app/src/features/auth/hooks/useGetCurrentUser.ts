import useMessage from "hooks/useMessage";
import { useAuth } from "providers/useAuthProvider";
import getCurrentUserApi from "../api/currentUserApi";

const useGetCurrentUser = () => {
  const { setIsSignedIn, setCurrentUser, setLoading } = useAuth();
  const { showMessage } = useMessage();

  const handelGetCurrentUser = async () => {
    setLoading(true);
    try {
      const res = await getCurrentUserApi();
      if (res.data.status === 200) {
        setIsSignedIn(true);
        setCurrentUser(res.data.currentUser);
      }
    } catch {
      showMessage({ title: "current_user取得時にエラーが発生しました。", status: "error" });
    } finally {
      setLoading(false);
    }
  };
  return { handelGetCurrentUser };
};
export default useGetCurrentUser;
