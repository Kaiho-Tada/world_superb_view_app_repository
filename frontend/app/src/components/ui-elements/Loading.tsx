import { Center, Spinner } from "@chakra-ui/react";
import { FC } from "react";

const Loading: FC = () => (
  <Center h="90vh">
    <Spinner />
  </Center>
);

export default Loading;
