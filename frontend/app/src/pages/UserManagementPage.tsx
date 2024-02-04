import { Wrap } from "@chakra-ui/react";
import Loading from "components/ui-elements/Loading";
import getAllUsersApi from "features/auth/api/AllUsersApi";
import UserCard from "features/auth/components/ui-parts/UserCard";
import { User } from "features/auth/types/user";
import useGetAllModels from "hooks/api/useGetAllModels";
import { useEffect, useState } from "react";

const UserManagementPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>();

  const { handleGetAllModels } = useGetAllModels();

  useEffect(() => {
    handleGetAllModels({
      setModels: setUsers,
      setLoading,
      getAllModelsApi: getAllUsersApi,
    });
  }, []);

  return loading ? (
    <Loading />
  ) : (
    <Wrap role="list" aria-label="ユーザー一覧" ml="8" mt="8">
      {users.map((user: User) => (
        <UserCard
          key={user.id}
          id={user.id}
          email={user.email}
          name={user.name || "未登録"}
          nickname={user.nickname || "未登録"}
        />
      ))}
    </Wrap>
  );
};

export default UserManagementPage;
