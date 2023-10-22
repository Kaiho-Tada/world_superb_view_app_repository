import { EmailIcon, LockIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";
import AuthButton from "components/atoms/button/AuthButton";
import useGuestLogin from "hooks/api/useGuestLogin";
import useLogin from "hooks/api/useLogin";
import { useAuth } from "hooks/providers/useAuthProvider";
import { ChangeEvent, FC, memo, useCallback } from "react";
import { useNavigate } from "react-router-dom";

const Login: FC = memo(() => {
  const { loading } = useAuth();
  const { handleLogin, email, setEmail, password, setPassword } = useLogin();
  const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);
  const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);
  const navigate = useNavigate();
  const onClickSignup = useCallback(() => navigate("/signup"), [navigate]);
  const { handleGuestLogin } = useGuestLogin();
  return (
    <Flex align="center" justify="center" height="90vh">
      <Box w="md" p={4} boxShadow="2xl" border="1px" borderColor="gray.200">
        <Box mx="10" textShadow="2px 2px #000000">
          <Text as="h3" fontSize="xl" textAlign="center" mt={3}>
            ログイン
          </Text>
          <Stack spacing={4} px={6} py={2}>
            <FormControl>
              <Flex align="center">
                <EmailIcon mr="3" boxSize={5} pb="1.5" />
                <FormLabel as="h4">Email</FormLabel>
              </Flex>
              <Input
                size="sm"
                value={email}
                onChange={onChangeEmail}
                shadow="2xl"
                aria-label="email"
              />
            </FormControl>
            <FormControl>
              <Flex align="center">
                <LockIcon mr="3" boxSize={5} pb="1.5" />
                <FormLabel as="h4">パスワード</FormLabel>
              </Flex>
              <Input
                size="sm"
                placeholder="6文字以上の半角英数字"
                type="password"
                value={password}
                onChange={onChangePassword}
                shadow="2xl"
                aria-label="password"
              />
            </FormControl>
          </Stack>
          <Box textAlign="center" mt="6">
            <AuthButton
              loading={loading}
              isDisabled={email === "" || password === ""}
              onClick={handleLogin}
            >
              ログイン
            </AuthButton>
          </Box>
          <Divider mt="6" mb="6" />
          <Box textAlign="center">
            <Button
              variant="primaryC"
              size="sm"
              py="3"
              px="14"
              shadow="2xl"
              _hover={{ opacity: 0.6 }}
              textShadow="1px 1px #000000"
              onClick={handleGuestLogin}
            >
              ゲストログイン
            </Button>
          </Box>
          <Divider mt="6" mb="4" />
          <Text textAlign="center" as="h4">
            アカウントをお持ちでない方
          </Text>
          <Box textAlign="center" my="3">
            <Button
              variant="primaryB"
              size="sm"
              py="3"
              px="14"
              shadow="2xl"
              _hover={{ opacity: 0.6 }}
              textShadow="1px 1px #000000"
              onClick={onClickSignup}
            >
              登録する
            </Button>
          </Box>
        </Box>
      </Box>
    </Flex>
  );
});

Login.displayName = "login";
export default Login;
