import { isAxiosError } from "axios";
import { useMessage } from "hooks/useMessage";
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

export const useSignout = (props: Props) => {
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
      showMessage({title: "サインアウトしました。", status: "success"});
      navigate("/login");
    } catch (e) {
      if (isAxiosError(e) && e.response && e.response.status === 404){
        e.response.data.errors.map((errorMessage: string) => {
          return showMessage({title: errorMessage, status: "error"});
        });
      } else{
        showMessage({title: "エラーが発生しました。", status: "error"});
      };
    };
    setLoading(false);
  }, []);
  return { handleSignout };
};
