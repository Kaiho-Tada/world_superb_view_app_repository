import { isAxiosError } from 'axios';
import { useMessage } from 'hooks/useMessage';
import Cookies from 'js-cookie';
import { deleteUser } from 'lib/api/auth';
import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from 'types/api/user';

type useDeleteUserProps = {
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentUser: React.Dispatch<React.SetStateAction<User | undefined>>;
  setIsSignedIn: React.Dispatch<React.SetStateAction<boolean>>;
};

export const useDeleteUser = (props: useDeleteUserProps) => {
  const { setLoading, setIsSignedIn, setCurrentUser } = props;
  const navigate = useNavigate();
  const { showMessage } = useMessage();

  const handleDeleteUser = useCallback(async() => {
    setLoading(true);
    try {
      const res = await deleteUser();
      Cookies.remove("_access_token");
      Cookies.remove("_client");
      Cookies.remove("_uid");
      setIsSignedIn(false);
      setCurrentUser(undefined);
      showMessage({title: res.data.message, status: "success"});
      navigate("/login");
    } catch (e) {
      if (isAxiosError(e) && e.response && e.response.status === 404){
        e.response.data.errors.map((errorMessage: string) => {
          return showMessage({title: errorMessage, status: "error"});
        });
      } else{
        showMessage({title: "エラーが発生しました。", status: "error"});
      };
    } finally {
      setLoading(false);
    };
  }, []);
  return { handleDeleteUser };
};
