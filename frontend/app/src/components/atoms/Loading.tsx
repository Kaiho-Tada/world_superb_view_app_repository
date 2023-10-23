import { Center, Spinner } from "@chakra-ui/react";
import { FC, memo } from "react";

const Loading: FC = memo(() => (
  <Center h="90vh">
    <Spinner />
  </Center>
));
Loading.displayName = "Loading";
export default Loading;
