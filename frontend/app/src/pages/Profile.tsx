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
import useDeleteUser from "features/auth/hooks/useDeleteUser";
import useUpdatePassword from "features/auth/hooks/useUpdatePassword";
import useUpdateUser from "features/auth/hooks/useUpdateUser";
import { useAuth } from "providers/useAuthProvider";
import { ChangeEvent, memo, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Profile = memo(() => {
  const { currentUser, loading } = useAuth();
  const navigate = useNavigate();
  const onClickHome = useCallback(() => navigate("/home"), [navigate]);
  const { handleUpdateUser, name, setName, nickname, setNickname, email, setEmail } =
    useUpdateUser();

  useEffect(() => {
    if (currentUser) {
      setName(currentUser.name || "");
      setNickname(currentUser.nickname || "");
      setEmail(currentUser.email);
    }
  }, [currentUser]);

  const onChangeName = (e: ChangeEvent<HTMLInputElement>) => setName(e.target.value);
  const onChangeNickname = (e: ChangeEvent<HTMLInputElement>) => setNickname(e.target.value);
  const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);

  const {
    handleUpdatePassword,
    password,
    setPassword,
    passwordConfirmation,
    setpasswordConfirmation,
  } = useUpdatePassword();
  const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);
  const onChangepasswordConfirmation = (e: ChangeEvent<HTMLInputElement>) =>
    setpasswordConfirmation(e.target.value);

  const { handleDeleteUser } = useDeleteUser();

  return (
    <Flex justify="center" my="12">
      <Box
        textAlign="center"
        px="24"
        py="8"
        textShadow="2px 2px #000000"
        border="1px"
        borderColor="gray.200"
        w="xl"
        mx="8"
      >
        <Text fontSize="2xl">プロフィール</Text>
        <Divider mt="4" mb="4" />
        <Box>
          <Stack>
            <FormControl>
              <Flex align="center">
                <FormLabel as="h4">名前</FormLabel>
              </Flex>
              <Input
                size="sm"
                value={name}
                onChange={onChangeName}
                shadow="2xl"
                aria-label="name"
              />
            </FormControl>
            <FormControl>
              <Flex align="center">
                <FormLabel as="h4">ニックネーム</FormLabel>
              </Flex>
              <Input
                size="sm"
                value={nickname}
                onChange={onChangeNickname}
                shadow="2xl"
                aria-label="nickName"
              />
            </FormControl>
            <FormControl>
              <Flex align="center">
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
            <Box textAlign="center" mt="6">
              <AuthButton loading={loading} isDisabled={email === ""} onClick={handleUpdateUser}>
                プロフィール更新
              </AuthButton>
            </Box>
          </Stack>
        </Box>
        <Divider mt="6" mb="4" />
        <Box>
          <Stack>
            <FormControl>
              <Flex align="center">
                <FormLabel as="h4">パスワード</FormLabel>
              </Flex>
              <Input
                placeholder="6文字以上の半角英数字"
                size="sm"
                shadow="2xl"
                type="password"
                value={password}
                onChange={onChangePassword}
                aria-label="password"
              />
            </FormControl>
            <FormControl>
              <Flex align="center">
                <FormLabel as="h4">パスワード(確認)</FormLabel>
              </Flex>
              <Input
                placeholder="パスワードを確認してください"
                size="sm"
                shadow="2xl"
                type="password"
                value={passwordConfirmation}
                onChange={onChangepasswordConfirmation}
                aria-label="passwordConfirmation"
              />
            </FormControl>
          </Stack>
          <Box textAlign="center" mt="6">
            <AuthButton
              loading={loading}
              isDisabled={password === "" || passwordConfirmation === ""}
              onClick={handleUpdatePassword}
            >
              パスワード更新
            </AuthButton>
          </Box>
          <Divider mt="6" mb="6" />
          <Box mb="5">
            <Button variant="secoundary" size="sm" onClick={onClickHome}>
              ホームに戻る
            </Button>
          </Box>
          <Box>
            <Button variant="danger" size="sm" onClick={handleDeleteUser}>
              アカウント削除
            </Button>
          </Box>
        </Box>
      </Box>
    </Flex>
  );
});
Profile.displayName = "Profile";
export default Profile;
