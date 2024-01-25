import { Flex, Heading, Text } from "@chakra-ui/react";
import AuthLink from "features/auth/components/ui-elements/AuthLink";
import { useAuth } from "providers/useAuthProvider";
import { FC, useCallback } from "react";
import { useNavigate } from "react-router-dom";

const Header: FC = () => {
  const navigate = useNavigate();
  const onClickHome = useCallback(() => navigate("/home"), [navigate]);
  const onClickSuperbViews = useCallback(() => navigate("/world_views"), [navigate]);
  const { isSignedIn } = useAuth();

  return (
    <Flex
      as="nav"
      color="gray.50"
      align="center"
      justify="space-between"
      padding={{ base: 3, md: 4 }}
      boxShadow="xl"
      mx={{ base: 3, md: 5 }}
    >
      <Flex>
        <Flex as="a" role="link" _hover={{ cursor: "pointer" }} onClick={onClickHome} mr="10">
          <Heading as="h1" fontSize={{ base: "lg", md: "xl" }}>
            App
          </Heading>
        </Flex>
        <Text as="a" role="link" onClick={onClickSuperbViews} _hover={{ cursor: "pointer" }}>
          絶景一覧
        </Text>
      </Flex>
      <AuthLink isSignedIn={isSignedIn} />
    </Flex>
  );
};

export default Header;
