import { AuthContext } from "contexts/AuthContext";
import {  FC, ReactNode, useContext, useState } from "react";
import { User } from "types/api/user";

type Props ={
  children: ReactNode;
};

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: FC<Props> = ({ children }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<User | undefined>();

  const value={
    loading,
    setLoading,
    isSignedIn,
    setIsSignedIn,
    currentUser,
    setCurrentUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
