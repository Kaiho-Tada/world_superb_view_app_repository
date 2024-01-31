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
import AuthButton from "features/auth/components/ui-elements/AuthButton";
import useSignUp from "features/auth/hooks/useSignUp";
import { useAuth } from "providers/useAuthProvider";
import { ChangeEvent, FC, memo, useCallback } from "react";
import { useNavigate } from "react-router-dom";

const SignUp: FC = memo(() => {
  const { loading } = useAuth();
  const { handleSignUp, email, setEmail, password, setPassword } = useSignUp();

  const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);
  const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);

  const navigate = useNavigate();
  const onClickLogin = useCallback(() => navigate("/login"), [navigate]);
  return (
    <Flex role="form" align="center" justify="center" height="90vh">
      <Box w="md" p={4} boxShadow="2xl" border="1px" borderColor="gray.200">
        <Box mx="10" textShadow="2px 2px #000000">
          <Text as="h3" fontSize="xl" textAlign="center" mt={3}>
            新規登録
          </Text>
          <Stack spacing={4} px={6} py={2}>
            <FormControl>
              <Flex align="center">
                <EmailIcon role="img" aria-label="メールアイコン" mr="3" boxSize={5} pb="1.5" />
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
                <LockIcon role="img" aria-label="パスワードアイコン" mr="3" boxSize={5} pb="1.5" />
                <FormLabel as="h4">パスワード</FormLabel>
              </Flex>
              <Input
                aria-label="password"
                size="sm"
                placeholder="6文字以上の半角英数字"
                type="password"
                value={password}
                onChange={onChangePassword}
                shadow="2xl"
              />
            </FormControl>
          </Stack>
          <Box textAlign="center" mt="6" mb="4">
            <AuthButton
              loading={loading}
              isDisabled={email === "" || password === ""}
              onClick={handleSignUp}
            >
              新規登録
            </AuthButton>
          </Box>
          <Divider mt="6" mb="4" />
          <Text textAlign="center" as="h4">
            アカウントをお持ちの方
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
              onClick={onClickLogin}
            >
              ログインページへ
            </Button>
          </Box>
        </Box>
      </Box>
    </Flex>
  );
});

SignUp.displayName = "SignUp";
export default SignUp;
