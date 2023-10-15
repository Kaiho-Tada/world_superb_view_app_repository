import { isAxiosError } from "axios";
import useMessage from "hooks/useMessage";
import Cookies from "js-cookie";
import { login } from "lib/api/auth";
import React, { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginData } from "types/api/auth";
import { User } from "types/api/user";

type UseLoginApiProps = {
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setIsSignedIn: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentUser: React.Dispatch<React.SetStateAction<User | undefined>>;
};

const useLogin = (props: UseLoginApiProps) => {
  const { setLoading, setIsSignedIn, setCurrentUser } = props;
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { showMessage } = useMessage();
  const navigate = useNavigate();

  const handleLogin = useCallback(
    async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.preventDefault();
      setLoading(true);

      const data: LoginData = {
        email,
        password,
      };
      try {
        const res = await login(data);
        showMessage({ title: "ログインしました", status: "success" });

        Cookies.set("_access_token", res.headers["access-token"]);
        Cookies.set("_client", res.headers.client);
        Cookies.set("_uid", res.headers.uid);

        setIsSignedIn(true);
        setCurrentUser(res.data.data);

        navigate("/home");
      } catch (error) {
        if (isAxiosError(error) && error.response && error.response.status === 401) {
          error.response.data.errors.map((errorMessage: string) =>
            showMessage({ title: errorMessage, status: "error" })
          );
        } else {
          showMessage({ title: "エラーが発生しました。", status: "error" });
        }
      }
      setLoading(false);
    },
    [email, password]
  );
  return { handleLogin, email, setEmail, password, setPassword };
};
export default useLogin;
