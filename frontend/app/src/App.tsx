import { ChakraProvider } from "@chakra-ui/react";
import useGetCurrentUser from "features/auth/hooks/useGetCurrentUser";
import { useAuth } from "providers/useAuthProvider";
import { VideoListProvider } from "providers/VideoListProvider";
import { WorldViewListProvider } from "providers/WorldViewListProvider";
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
      <WorldViewListProvider>
        <VideoListProvider>
          <BrowserRouter>
            <Router />
          </BrowserRouter>
        </VideoListProvider>
      </WorldViewListProvider>
    </ChakraProvider>
  );
};
export default App;
