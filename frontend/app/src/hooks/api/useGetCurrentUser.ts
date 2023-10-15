import { getCurrentUser } from "lib/api/auth";
import React from "react";
import { User } from "types/api/user";

type UseGetCurrentUserProps = {
  setIsSignedIn: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentUser: React.Dispatch<React.SetStateAction<User | undefined>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  loading: boolean;
};

const useGetCurrentUser = (props: UseGetCurrentUserProps) => {
  const { setLoading, setIsSignedIn, setCurrentUser } = props;
  const handelGetCurrentUser = async () => {
    setLoading(true);
    try {
      const res = await getCurrentUser();
      if (res.data.status === 200) {
        setIsSignedIn(true);
        setCurrentUser(res.data.currentUser);
      }
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };
  return { handelGetCurrentUser };
};
export default useGetCurrentUser;
