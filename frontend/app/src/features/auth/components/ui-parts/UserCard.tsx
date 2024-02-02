import { Avatar, Box, Button, Flex, Stack, Text, WrapItem } from "@chakra-ui/react";
import useDeleteUserByAdmin from "features/auth/hooks/useDeleteUserByAdmin";
import { User } from "features/auth/types/user";
import { FC } from "react";

const UserCard: FC<Omit<User, "role">> = (props) => {
  const { id, name, nickname, email } = props;
  const { handleDeleteUserByAdmin } = useDeleteUserByAdmin();

  return (
    <WrapItem role="listitem" aria-label={`ユーザーID: ${id}`}>
      <Box w="260px" bg="white" borderRadius="10px" shadow="md" color="black">
        <Stack align="center" spacing={3} my="6">
          <Avatar size="xl" role="img" aria-label="プロフィール画像" />
          <Text>email: {email}</Text>
          <Text>name: {name}</Text>
          <Text>nickname: {nickname}</Text>
        </Stack>
        <Flex justify="center" mb="5">
          <Button
            variant="danger"
            w="100px"
            onClick={() => {
              handleDeleteUserByAdmin({ userId: id });
            }}
          >
            削除
          </Button>
        </Flex>
      </Box>
    </WrapItem>
  );
};

export default UserCard;
