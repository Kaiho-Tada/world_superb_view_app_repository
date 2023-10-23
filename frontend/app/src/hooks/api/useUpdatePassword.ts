import { isAxiosError } from "axios";
import { useAuth } from "hooks/providers/useAuthProvider";
import useMessage from "hooks/useMessage";
import { updatePassword } from "lib/api/auth";
import React, { useCallback, useState } from "react";
import { UpdatePasswordData } from "types/api/auth";

const useUpdatePassword = () => {
  const { setLoading } = useAuth();

  const [password, setPassword] = useState("");
  const [passwordConfirmation, setpasswordConfirmation] = useState("");
  const { showMessage } = useMessage();

  const handleUpdatePassword = useCallback(
    async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.preventDefault();
      setLoading(true);

      const data: UpdatePasswordData = {
        password,
        passwordConfirmation,
      };

      try {
        const res = await updatePassword(data);
        if (res.data.status === 403) {
          showMessage({ title: res.data.message, status: "error" });
        } else {
          showMessage({ title: res.data.message, status: "success" });
        }
      } catch (error) {
        if (isAxiosError(error) && error.response && error.response.status === 422) {
          error.response.data.errors.fullMessages.map((message: string) =>
            showMessage({ title: message, status: "error" })
          );
        } else {
          showMessage({ title: "エラーが発生しました。", status: "error" });
        }
      } finally {
        setLoading(false);
      }
    },
    [password, passwordConfirmation]
  );
  return {
    handleUpdatePassword,
    password,
    setPassword,
    passwordConfirmation,
    setpasswordConfirmation,
  };
};
export default useUpdatePassword;
