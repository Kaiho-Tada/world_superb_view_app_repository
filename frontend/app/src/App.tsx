import { FC, useEffect } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import { Router } from "router/Router";
import theme from "theme/theme";
import { useAuth } from "hooks/providers/useAuthProvider";
import { useGetCurrentUser } from "hooks/api/useGetCurrentUser";

const App: FC = () => {
  const { setIsSignedIn, setCurrentUser, setLoading, loading } = useAuth();
  const { handelGetCurrentUser } = useGetCurrentUser({setIsSignedIn, setCurrentUser, setLoading, loading});
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
};

export default App;
