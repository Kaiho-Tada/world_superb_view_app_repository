import {
  Avatar,
  Flex,
  Image,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Text,
} from "@chakra-ui/react";
import personIcon from "assets/person.png";
import profileIcon from "assets/profile.png";
import useGuestLogin from "features/auth/hooks/useGuestLogin";
import useSignout from "features/auth/hooks/useSignout";
import { useAuth } from "providers/useAuthProvider";
import { FC, memo, useCallback } from "react";
import { useNavigate } from "react-router-dom";

type AuthMenuProps = {
  isSignedIn: boolean;
};

const AuthMenu: FC<AuthMenuProps> = memo(({ isSignedIn }) => {
  const navigate = useNavigate();
  const onClickLogin = useCallback(() => navigate("/login"), [navigate]);
  const onClickProfile = useCallback(() => navigate("/profile"), [navigate]);
  const onClickSignup = useCallback(() => navigate("/signup"), [navigate]);
  const { loading, currentUser } = useAuth();
  const { handleSignout } = useSignout();
  const { handleGuestLogin } = useGuestLogin();
  const isGuestUser = currentUser?.email === "guest@example.com";

  const AuthMenuContent = isSignedIn ? (
    <Popover size="xs" variant="responsive">
      <PopoverTrigger>
        <Avatar size="sm" _hover={{ cursor: "pointer" }} />
      </PopoverTrigger>
      <PopoverContent width="220px" color="black" bg="gray.100">
        <PopoverArrow />
        <PopoverBody p="0" role="menu" aria-label="Popoverのプロフィールメニュー">
          {!isGuestUser ? (
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
          ) : null}
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
        </PopoverBody>
      </PopoverContent>
    </Popover>
  ) : (
    <>
      <Avatar
        size="sm"
        as="a"
        onClick={onClickLogin}
        _hover={{ cursor: "pointer" }}
        display={{ base: "block", md: "none" }}
      />
      <Flex display={{ base: "none", md: "flex" }} role="menu" aria-label="プロフィールメニュー">
        <Text
          role="link"
          pr={4}
          fontSize={{ base: "sm", md: "md" }}
          fontWeight="bold"
          textShadow="1px 1px 1px #000000"
          _hover={{ cursor: "pointer" }}
          onClick={onClickLogin}
        >
          ログイン
        </Text>
        <Text
          role="link"
          pr={4}
          fontSize={{ base: "sm", md: "md" }}
          fontWeight="bold"
          textShadow="1px 1px 1px #000000"
          _hover={{ cursor: "pointer" }}
          onClick={onClickSignup}
        >
          新規登録
        </Text>
        <Text
          role="link"
          fontSize={{ base: "sm", md: "md" }}
          fontWeight="bold"
          textShadow="1px 1px 1px #000000"
          _hover={{ cursor: "pointer" }}
          onClick={handleGuestLogin}
        >
          ゲストログイン
        </Text>
      </Flex>
    </>
  );
  return !loading ? AuthMenuContent : null;
});
export default AuthMenu;
