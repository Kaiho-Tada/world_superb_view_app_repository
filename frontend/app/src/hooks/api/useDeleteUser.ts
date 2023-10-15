import { isAxiosError } from "axios";
import useMessage from "hooks/useMessage";
import Cookies from "js-cookie";
import { deleteUser } from "lib/api/auth";
import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "types/api/user";

type UseDeleteUserProps = {
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentUser: React.Dispatch<React.SetStateAction<User | undefined>>;
  setIsSignedIn: React.Dispatch<React.SetStateAction<boolean>>;
};

const useDeleteUser = (props: UseDeleteUserProps) => {
  const { setLoading, setIsSignedIn, setCurrentUser } = props;
  const navigate = useNavigate();
  const { showMessage } = useMessage();

  const handleDeleteUser = useCallback(async () => {
    setLoading(true);
    try {
      const res = await deleteUser();
      Cookies.remove("_access_token");
      Cookies.remove("_client");
      Cookies.remove("_uid");
      setIsSignedIn(false);
      setCurrentUser(undefined);
      showMessage({ title: res.data.message, status: "success" });
      navigate("/login");
    } catch (error) {
      if (isAxiosError(error) && error.response && error.response.status === 404) {
        error.response.data.errors.map((errorMessage: string) =>
          showMessage({ title: errorMessage, status: "error" })
        );
      } else {
        showMessage({ title: "エラーが発生しました。", status: "error" });
      }
    } finally {
      setLoading(false);
    }
  }, []);
  return { handleDeleteUser };
};
export default useDeleteUser;
