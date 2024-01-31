import { isAxiosError } from "axios";
import { UpdateUserData } from "features/auth/types/auth";
import useMessage from "hooks/useMessage";
import Cookies from "js-cookie";
import { useAuth } from "providers/useAuthProvider";
import React, { useState } from "react";
import updateUserApi from "../api/updateUserApi";

const useUpdateUser = () => {
  const { setCurrentUser, setLoading } = useAuth();
  const [name, setName] = useState<string>("");
  const [nickname, setNickname] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const { showMessage } = useMessage();

  const handleUpdateUser = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setLoading(true);

    const data: UpdateUserData = {
      name,
      nickname,
      email,
    };

    try {
      const res = await updateUserApi(data);
      Cookies.set("_uid", res.headers.uid);
      setCurrentUser(res.data.data);
      showMessage({ title: "プロフィールを更新しました。", status: "success" });
    } catch (error) {
      if (isAxiosError(error) && error.response && error.response.status === 403) {
        showMessage({ title: error.response.data.error, status: "error" });
      } else if (isAxiosError(error) && error.response && error.response.status === 422) {
        error.response.data.errors.fullMessages.map((message: string) =>
          showMessage({ title: message, status: "error" })
        );
      } else {
        showMessage({ title: "プロフィール更新時にエラーが発生しました。", status: "error" });
      }
    } finally {
      setLoading(false);
    }
  };
  return { handleUpdateUser, name, setName, nickname, setNickname, email, setEmail };
};
export default useUpdateUser;
