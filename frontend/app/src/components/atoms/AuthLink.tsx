import { FC, memo } from "react";
import { Avatar, Flex, Image, Link, Popover, PopoverArrow, PopoverBody, PopoverContent, PopoverHeader, PopoverTrigger, Text } from "@chakra-ui/react";
import personIcon from "img/person.png";
import profileIcon from "img/profile.png";

type AuthLinksProps = {
  loading: boolean;
  isSignedIn: boolean;
  handleSignout: () => Promise<void>;
  onClickProfile: () => void;
  onClickLogin: () => void;
  onClickSignup: () => void;
};

export const AuthLink: FC<AuthLinksProps> = memo((props) => {
  const { loading, isSignedIn, handleSignout, onClickProfile, onClickLogin, onClickSignup } = props;
  if (!loading) {
    if (isSignedIn) {
      return (
        <Popover size="xs" variant="responsive" >
          <PopoverTrigger>
            <Avatar size='sm' _hover={{ cursor: "pointer" }} />
          </PopoverTrigger>
          <PopoverContent width="220px" color="black" bg="gray.100">
            <PopoverArrow />
            <PopoverHeader p="0">
                <Flex _hover={{ cursor: "pointer", bg: "blackAlpha.100" }} p="2.5" justify="center" onClick={handleSignout}>
                  <Flex align="center">
                    <Image alt="account_icon" boxSize="20px" src={ personIcon } mr="3"/>
                    <Text textShadow="0.5px 0.5px #000000">
                      サインアウト
                    </Text>
                  </Flex>
                </Flex>
            </PopoverHeader>
            <PopoverBody p="0">
              <Flex onClick={onClickProfile} as="a" _hover={{ cursor: "pointer", bg: "blackAlpha.100" }} p="2.5" justify="center">
                <Image alt="profile_icon" boxSize="20px" src={ profileIcon } mr="3"/>
                <Text textShadow="0.5px 0.5px #000000">
                  プロフィール
                </Text>
              </Flex>
            </PopoverBody>
          </PopoverContent>
        </Popover>
      )
    } else {
      return (
        <>
          <Avatar size='sm' as="a" onClick={onClickLogin} _hover={{ cursor: "pointer" }}  display={{ base: "block", md: "none"}} />
          <Flex display={{ base: "none", md: "flex"}}>
            <Link role="link" pr={4} onClick={onClickLogin}>ログイン</Link>
            <Link role="link" onClick={onClickSignup}>新規登録</Link>
          </Flex>
        </>
      )
    }
  } else {
    return <></>
  };
});
