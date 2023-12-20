import { isAxiosError } from "axios";
import useMessage from "hooks/useMessage";
import worldViewFavoriteApi from "lib/api/worldViewFavoriteApi";

type Props = {
  selectedId: number;
  favoriteId: number | null;
  setFavoriteId: (value: React.SetStateAction<number | null>) => void;
};
const useHandleChangeFavorite = () => {
  const { showMessage } = useMessage();
  const { createFavoriteApi, deleteFavoriteApi } = worldViewFavoriteApi();
  const handleChangeFavorite = async ({ selectedId, favoriteId, setFavoriteId }: Props) => {
    if (favoriteId) {
      try {
        await deleteFavoriteApi(favoriteId);
        setFavoriteId(null);
      } catch (error) {
        if (isAxiosError(error) && error.response && error.response.status === 404) {
          showMessage({ title: "削除するリソースが見つかりませんでした。", status: "error" });
        } else {
          showMessage({ title: "サーバーエラーが発生しました。", status: "error" });
        }
      }
    } else {
      try {
        const res = await createFavoriteApi(selectedId);
        setFavoriteId(res.data.id);
      } catch (error) {
        if (isAxiosError(error) && error.response && error.response.status === 422) {
          showMessage({ title: "お気に入りの登録に失敗しました。", status: "error" });
        } else if (isAxiosError(error) && error.response && error.response.status === 401) {
          showMessage({ title: "ユーザーが認証されていません。", status: "error" });
        } else {
          showMessage({ title: "サーバーエラーが発生しました。", status: "error" });
        }
      }
    }
  };
  return { handleChangeFavorite };
};

export default useHandleChangeFavorite;
