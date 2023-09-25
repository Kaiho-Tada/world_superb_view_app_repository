import { FC, memo, ChangeEvent } from "react";
import { Box, Flex, FormControl, FormLabel, Input, Stack, Text } from "@chakra-ui/react";
import { useAuth } from "hooks/providers/useAuthProvider";
import { AuthButton } from "components/atoms/button/AuthButton";
import { useSignUpApi } from "hooks/api/useSignUpApi";
import { EmailIcon, LockIcon } from "@chakra-ui/icons";

export const SignUp: FC = memo(() => {
  const { loading, setLoading } = useAuth();
  const { onClickSignUp, email, setEmail, password, setPassword, passwordConfirmation, setPasswordConfirmation } = useSignUpApi({setLoading});

  const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);
  const onChangePassword  = (e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);
  const onChangePasswordConfirmation = (e: ChangeEvent<HTMLInputElement>) => setPasswordConfirmation(e.target.value);

  return (
    <Flex role="form" align="center" justify="center" height="90vh">
      <Box w="md" p={4} boxShadow="2xl" border='1px' borderColor='gray.200'>
        <Box mx="10" textShadow="2px 2px #000000">
          <Text as="h3" fontSize="xl" textAlign="center" mt={3}>新規登録</Text>
          <Stack spacing={4} px={6} py={2}>
            <FormControl>
              <Flex align="center">
                <EmailIcon mr="3" boxSize={5} pb="1.5" />
                <FormLabel as="h4" >Email</FormLabel>
              </Flex>
              <Input size="sm" value={email} onChange={onChangeEmail} shadow="2xl" />
            </FormControl>
            <FormControl>
              <Flex align="center">
                <LockIcon mr="3" boxSize={5} pb="1.5" />
                <FormLabel as="h4" htmlFor="password">パスワード</FormLabel>
              </Flex>
              <Input id="password" size="sm" placeholder="6文字以上の半角英数字" type="password" value={password} onChange={onChangePassword} shadow="2xl" />
            </FormControl>
            <FormControl>
              <Flex align="center">
                <LockIcon mr="3" boxSize={5} pb="1.5" />
                <FormLabel as="h4" htmlFor="passwordConfirmation">パスワード確認</FormLabel>
              </Flex>
              <Input id="passwordConfirmation" size="sm" placeholder="パスワードを確認してください" type="password" value={passwordConfirmation} onChange={onChangePasswordConfirmation} shadow="2xl" />
            </FormControl>
          </Stack>
          <Box textAlign="center" mt="6" mb="4" >
            <AuthButton loading={loading} isDisabled={ email === "" || password === "" || passwordConfirmation === "" } onClick={onClickSignUp}>
              新規登録
            </AuthButton>
          </Box>
        </Box>
      </Box>
    </Flex>
  );
});
