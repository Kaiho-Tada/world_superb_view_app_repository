import { ChakraProvider } from "@chakra-ui/react";
import useGetCurrentUser from "features/auth/hooks/useGetCurrentUser";
import { useAuth } from "providers/useAuthProvider";
import { FC, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import Router from "routes/Router";
import theme from "theme/theme";

const App: FC = () => {
  const { setCurrentUser } = useAuth();
  const { handelGetCurrentUser } = useGetCurrentUser();
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
