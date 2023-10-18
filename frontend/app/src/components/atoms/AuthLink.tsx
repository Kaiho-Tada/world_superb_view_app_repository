import {
  Avatar,
  Flex,
  Image,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Text,
} from "@chakra-ui/react";
import useSignout from "hooks/api/useSignout";
import { useAuth } from "hooks/providers/useAuthProvider";
import personIcon from "img/person.png";
import profileIcon from "img/profile.png";
import { FC, memo, useCallback } from "react";
import { useNavigate } from "react-router-dom";

type AuthLinkProps = {
  isSignedIn: boolean;
};

const AuthLink: FC<AuthLinkProps> = memo((props) => {
  const { isSignedIn } = props;
  const navigate = useNavigate();
  const onClickLogin = useCallback(() => navigate("/login"), [navigate]);
  const onClickProfile = useCallback(() => navigate("/profile"), [navigate]);
  const onClickSignup = useCallback(() => navigate("/signup"), [navigate]);
  const { loading, setLoading, setIsSignedIn, setCurrentUser } = useAuth();
  const { handleSignout } = useSignout({ setLoading, setIsSignedIn, setCurrentUser });
  if (!loading) {
    if (isSignedIn) {
      return (
        <Popover size="xs" variant="responsive">
          <PopoverTrigger>
            <Avatar size="sm" _hover={{ cursor: "pointer" }} />
          </PopoverTrigger>
          <PopoverContent width="220px" color="black" bg="gray.100">
            <PopoverArrow />
            <PopoverHeader p="0">
              <Flex
                _hover={{ cursor: "pointer", bg: "blackAlpha.100" }}
                p="2.5"
                justify="center"
                onClick={handleSignout}
              >
                <Flex align="center">
                  <Image alt="account_icon" boxSize="20px" src={personIcon} mr="3" />
                  <Text textShadow="0.5px 0.5px #000000">サインアウト</Text>
                </Flex>
              </Flex>
            </PopoverHeader>
            <PopoverBody p="0">
              <Flex
                onClick={onClickProfile}
                as="a"
                _hover={{ cursor: "pointer", bg: "blackAlpha.100" }}
                p="2.5"
                justify="center"
              >
                <Image alt="profile_icon" boxSize="20px" src={profileIcon} mr="3" />
                <Text textShadow="0.5px 0.5px #000000">プロフィール</Text>
              </Flex>
            </PopoverBody>
          </PopoverContent>
        </Popover>
      );
    }
    return (
      <>
        <Avatar
          size="sm"
          as="a"
          onClick={onClickLogin}
          _hover={{ cursor: "pointer" }}
          display={{ base: "block", md: "none" }}
        />
        <Flex display={{ base: "none", md: "flex" }}>
          <Text role="link" pr={4} onClick={onClickLogin} _hover={{ cursor: "pointer" }}>
            ログイン
          </Text>
          <Text role="link" onClick={onClickSignup} _hover={{ cursor: "pointer" }}>
            新規登録
          </Text>
        </Flex>
      </>
    );
  }
  return null;
});
export default AuthLink;
