import { AxiosResponse, isAxiosError } from "axios";
import useMessage from "hooks/useMessage";

type Props<T> = {
  loadingSearchModelDispatch: (payload: boolean) => void;
  modelDispatch: (responseData: T[]) => void;
  searchModelApi: () => Promise<AxiosResponse<T[]>>;
};
const useGetModel = () => {
  const { showMessage } = useMessage();
  const handleGetModel = async <T>(props: Props<T>) => {
    const { loadingSearchModelDispatch, modelDispatch, searchModelApi } = props;
    loadingSearchModelDispatch(true);
    try {
      const response = await searchModelApi();
      modelDispatch(response.data);
    } catch (error) {
      if (isAxiosError(error) && error.response && error.response.status === 500) {
        showMessage({
          title: "データの取得に失敗しました。",
          status: "error",
        });
      }
    } finally {
      loadingSearchModelDispatch(false);
    }
  };
  return { handleGetModel };
};
export default useGetModel;
