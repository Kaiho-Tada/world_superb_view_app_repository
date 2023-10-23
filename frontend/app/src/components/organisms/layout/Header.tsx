import { Flex, Heading } from "@chakra-ui/react";
import AuthLink from "components/atoms/AuthLink";
import { useAuth } from "hooks/providers/useAuthProvider";
import { FC, memo, useCallback } from "react";
import { useNavigate } from "react-router-dom";

const Header: FC = memo(() => {
  const navigate = useNavigate();
  const onClickHome = useCallback(() => navigate("/home"), [navigate]);
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
      <Flex as="a" role="link" _hover={{ cursor: "pointer" }} onClick={onClickHome}>
        <Heading as="h1" fontSize={{ base: "lg", md: "xl" }}>
          App
        </Heading>
      </Flex>
      <AuthLink isSignedIn={isSignedIn} />
    </Flex>
  );
});
Header.displayName = "Header";
export default Header;
