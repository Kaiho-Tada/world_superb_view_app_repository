import { isAxiosError } from "axios";
import { updateUser } from "features/auth/api/auth";
import { UpdateUserData } from "features/auth/types/auth";
import useMessage from "hooks/useMessage";
import Cookies from "js-cookie";
import { useAuth } from "providers/useAuthProvider";
import React, { useCallback, useState } from "react";

const useUpdateUser = () => {
  const { setCurrentUser, setLoading } = useAuth();

  const [name, setName] = useState<string>("");
  const [nickname, setNickname] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const { showMessage } = useMessage();

  const handleUpdateUser = useCallback(
    async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.preventDefault();
      setLoading(true);

      const data: UpdateUserData = {
        name,
        nickname,
        email,
      };

      try {
        const res = await updateUser(data);
        if (res.data.status === 403) {
          showMessage({ title: res.data.message, status: "error" });
        } else {
          Cookies.set("_uid", res.headers.uid);
          showMessage({ title: "プロフィールを更新しました。", status: "success" });
          setCurrentUser(res.data.data);
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
    [name, nickname, email]
  );
  return { handleUpdateUser, name, setName, nickname, setNickname, email, setEmail };
};
export default useUpdateUser;
