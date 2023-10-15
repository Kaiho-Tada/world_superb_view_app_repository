import { Flex, Heading } from "@chakra-ui/react";
import AuthLink from "components/atoms/AuthLink";
import useSignout from "hooks/api/useSignout";
import { useAuth } from "hooks/providers/useAuthProvider";
import { FC, memo, useCallback } from "react";
import { useNavigate } from "react-router-dom";

const Header: FC = memo(() => {
  const navigate = useNavigate();
  const onClickHome = useCallback(() => navigate("/home"), [navigate]);
  const onClickLogin = useCallback(() => navigate("/login"), [navigate]);
  const onClickProfile = useCallback(() => navigate("/profile"), [navigate]);
  const onClickSignup = useCallback(() => navigate("/signup"), [navigate]);

  const { loading, setLoading, isSignedIn, setIsSignedIn, setCurrentUser } = useAuth();
  const { handleSignout } = useSignout({ setLoading, setIsSignedIn, setCurrentUser });

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
      <AuthLink
        loading={loading}
        isSignedIn={isSignedIn}
        handleSignout={handleSignout}
        onClickProfile={onClickProfile}
        onClickLogin={onClickLogin}
        onClickSignup={onClickSignup}
      />
    </Flex>
  );
});
Header.displayName = "Header";
export default Header;
