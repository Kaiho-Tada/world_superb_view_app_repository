import { ChakraProvider } from "@chakra-ui/react";
import useGetCurrentUser from "hooks/api/useGetCurrentUser";
import { useAuth } from "hooks/providers/useAuthProvider";
import { FC, memo, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import Router from "router/Router";
import theme from "theme/theme";

const App: FC = memo(() => {
  const { setIsSignedIn, setCurrentUser, setLoading, loading } = useAuth();
  const { handelGetCurrentUser } = useGetCurrentUser({
    setIsSignedIn,
    setCurrentUser,
    setLoading,
    loading,
  });
  useEffect(() => {
    handelGetCurrentUser();
  }, [setCurrentUser]);

  return (
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </ChakraProvider>
  );
});
export default App;
