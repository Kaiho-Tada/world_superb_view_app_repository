import { isAxiosError } from "axios";
import useMessage from "hooks/useMessage";
import { useAuth } from "providers/useAuthProvider";
import deleteUserByAdminApi from "../api/deleteUserByAdminApi";

const useDeleteUserByAdmin = () => {
  const { setLoading } = useAuth();
  const { showMessage } = useMessage();

  const handleDeleteUserByAdmin = async ({ userId }: { userId: number }) => {
    setLoading(true);

    try {
      const res = await deleteUserByAdminApi(userId);
      showMessage({ title: res.data.message, status: "success" });
    } catch (error) {
      if (isAxiosError(error) && error.response && error.response.status === 404) {
        showMessage({ title: "リソースが見つかりません。", status: "error" });
      } else {
        showMessage({ title: "エラーが発生しました。", status: "error" });
      }
    } finally {
      setLoading(false);
    }
  };
  return { handleDeleteUserByAdmin };
};

export default useDeleteUserByAdmin;
