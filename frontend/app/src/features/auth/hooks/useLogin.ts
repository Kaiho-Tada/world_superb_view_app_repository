import { isAxiosError } from "axios";
import { LoginData } from "features/auth/types/auth";
import useMessage from "hooks/useMessage";
import Cookies from "js-cookie";
import { useAuth } from "providers/useAuthProvider";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import loginApi from "../api/loginApi";

const useLogin = () => {
  const { setIsSignedIn, setCurrentUser, setLoading } = useAuth();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { showMessage } = useMessage();
  const navigate = useNavigate();

  const handleLogin = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setLoading(true);

    const data: LoginData = {
      email,
      password,
    };
    try {
      const res = await loginApi(data);
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
  };
  return { handleLogin, email, setEmail, password, setPassword };
};
export default useLogin;
