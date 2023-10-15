import { isAxiosError } from "axios";
import useMessage from "hooks/useMessage";
import Cookies from "js-cookie";
import { signout } from "lib/api/auth";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "types/api/user";

type Props = {
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setIsSignedIn: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentUser: React.Dispatch<React.SetStateAction<User | undefined>>;
};

const useSignout = (props: Props) => {
  const { setLoading, setIsSignedIn, setCurrentUser } = props;
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
