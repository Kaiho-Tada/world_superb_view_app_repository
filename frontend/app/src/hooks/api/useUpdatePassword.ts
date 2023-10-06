import { isAxiosError } from 'axios';
import { useMessage } from 'hooks/useMessage';
import { updatePassword } from 'lib/api/auth';
import React, { useCallback, useState } from 'react';
import { UpdatePasswordData } from 'types/api/auth';

type useUpdatePasswordProps = {
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
};
export const useUpdatePassword = (props: useUpdatePasswordProps) => {
  const { setLoading } = props;
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setpasswordConfirmation] = useState("");
  const { showMessage } = useMessage();

  const handleUpdatePassword = useCallback(async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setLoading(true);

    const data: UpdatePasswordData = {
      password: password,
      passwordConfirmation: passwordConfirmation
    };

    try {
      const res = await updatePassword(data);
      showMessage({title: res.data.message, status: "success"});
    } catch(e) {
      if (isAxiosError(e) && e.response && e.response.status === 422){
        e.response.data.errors.fullMessages.map((message: string) => {
          return showMessage({title: message, status: "error"});
        });
      } else{
        showMessage({title: "エラーが発生しました。", status: "error"});
      };
    };
    setLoading(false);
  }, [password, passwordConfirmation]);
  return { handleUpdatePassword, password, setPassword, passwordConfirmation, setpasswordConfirmation };
};
