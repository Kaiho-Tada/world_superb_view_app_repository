import AuthContext from "contexts/AuthContext";
import { FC, memo, ReactNode, useContext, useMemo, useState } from "react";
import { User } from "types/api/user";

type Props = {
  children: ReactNode;
};

export const useAuth = () => {
  const authContext = useContext(AuthContext);
  return useMemo(() => authContext, [authContext]);
};

export const AuthProvider: FC<Props> = memo(({ children }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<User | undefined>();

  const value = useMemo(
    () => ({
      loading,
      setLoading,
      isSignedIn,
      setIsSignedIn,
      currentUser,
      setCurrentUser,
    }),
    [loading, setLoading, isSignedIn, setIsSignedIn, currentUser, setCurrentUser]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
});
