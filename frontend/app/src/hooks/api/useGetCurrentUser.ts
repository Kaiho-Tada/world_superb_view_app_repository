import { getCurrentUser } from 'lib/api/auth';
import React from 'react';
import { User } from 'types/api/user';

type useGetCurrentUserProps = {
  setIsSignedIn: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentUser: React.Dispatch<React.SetStateAction<User | undefined>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  loading: boolean;
};

export const useGetCurrentUser = (props: useGetCurrentUserProps) => {
  const { setLoading, setIsSignedIn, setCurrentUser} = props;
  const handelGetCurrentUser = async () => {
    setLoading(true);
    try {
      const res = await getCurrentUser();
      console.log(res);
      if (res.data.status === 200) {
        setIsSignedIn(true);
        setCurrentUser(res.data.currentUser);
      } else {
        console.log("ユーザーが見つかりません。");
      };
    } catch (err) {
      console.log(err);
      console.log("エラーが発生しました。");
    } finally {
      setLoading(false);
    };
  };
  return { handelGetCurrentUser };
};
