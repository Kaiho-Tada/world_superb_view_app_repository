import { isAxiosError } from "axios";
import useMessage from "hooks/useMessage";
import { signUp } from "lib/api/auth";
import React, { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SignUpData } from "types/api/auth";

type UseSignUpApiProps = {
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

const useSignUp = (props: UseSignUpApiProps) => {
  const { setLoading } = props;
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { showMessage } = useMessage();
  const navigate = useNavigate();

  const handleSignUp = useCallback(
    async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.preventDefault();
      setLoading(true);

      const data: SignUpData = {
        email,
        password,
        confirm_success_url: "http://localhost:3000/login",
      };

      try {
        await signUp(data);
        showMessage({
          title:
            "登録メールアドレスにユーザー認証メールを送信しました。認証が完了しましたら、ログインしてください。",
          status: "success",
        });
        navigate("/login");
      } catch (error) {
        if (isAxiosError(error) && error.response && error.response.status === 422) {
          error.response.data.errors.fullMessages.map((message: string) =>
            showMessage({ title: message, status: "error" })
          );
        } else {
          showMessage({ title: "エラーが発生しました。", status: "error" });
        }
      }
      setLoading(false);
    },
    [email, password]
  );
  return { handleSignUp, email, setEmail, password, setPassword };
};
export default useSignUp;
