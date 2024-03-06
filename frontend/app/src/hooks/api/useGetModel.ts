import { AxiosResponse, isAxiosError } from "axios";
import useMessage from "hooks/useMessage";

type Props<T> = {
  loadingGetModelDispatch: (payload: boolean) => void;
  modelDispatch: (responseData: T[]) => void;
  getModelApi: () => Promise<AxiosResponse<T[]>>;
};
const useGetModel = () => {
  const { showMessage } = useMessage();
  const handleGetModel = async <T>(props: Props<T>) => {
    const { loadingGetModelDispatch, modelDispatch, getModelApi } = props;
    loadingGetModelDispatch(true);
    try {
      const response = await getModelApi();
      modelDispatch(response.data);
    } catch (error) {
      if (isAxiosError(error) && error.response && error.response.status === 500) {
        showMessage({
          title: "データの取得に失敗しました。",
          status: "error",
        });
      }
    } finally {
      loadingGetModelDispatch(false);
    }
  };
  return { handleGetModel };
};
export default useGetModel;
