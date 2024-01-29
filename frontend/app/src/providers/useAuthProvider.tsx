import { User } from "features/auth/types/user";
import { createContext, FC, memo, ReactNode, useContext, useMemo, useState } from "react";

type Props = {
  children: ReactNode;
};

const AuthContext = createContext(
  {} as {
    loading: boolean;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
    isSignedIn: boolean;
    setIsSignedIn: React.Dispatch<React.SetStateAction<boolean>>;
    currentUser: User | undefined;
    setCurrentUser: React.Dispatch<React.SetStateAction<User | undefined>>;
  }
);

const AuthProvider: FC<Props> = memo(({ children }) => {
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

const useAuth = () => {
  const authContext = useContext(AuthContext);
  return useMemo(() => authContext, [authContext]);
};

export { AuthProvider, useAuth };
