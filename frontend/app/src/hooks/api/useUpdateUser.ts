import { isAxiosError } from "axios";
import useMessage from "hooks/useMessage";
import Cookies from "js-cookie";
import { updateUser } from "lib/api/auth";
import React, { useCallback, useState } from "react";
import { UpdateUserData } from "types/api/auth";
import { User } from "types/api/user";

type UseUpdateUserProps = {
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentUser: React.Dispatch<React.SetStateAction<User | undefined>>;
};
const useUpdateUser = (props: UseUpdateUserProps) => {
  const { setLoading, setCurrentUser } = props;
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
        Cookies.set("_uid", res.headers.uid);
        showMessage({ title: "プロフィールを更新しました。", status: "success" });
        setCurrentUser(res.data.data);
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
