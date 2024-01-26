import { AxiosResponse, isAxiosError } from "axios";
import useMessage from "hooks/useMessage";

type Props<T> = {
  loadingSearchModelDispatch: (payload: boolean) => void;
  modelDispatch: (responseData: T[]) => void;
  searchModelApi: () => Promise<AxiosResponse<T[]>>;
};
const useSearchModel = () => {
  const { showMessage } = useMessage();
  const handleSearchModel = async <T>(props: Props<T>) => {
    const { loadingSearchModelDispatch, modelDispatch, searchModelApi } = props;
    loadingSearchModelDispatch(true);
    try {
      const response = await searchModelApi();
      modelDispatch(response.data);
    } catch (error) {
      if (isAxiosError(error) && error.response && error.response.status === 500) {
        showMessage({
          title: error.response.data.error,
          status: "error",
        });
      }
    } finally {
      loadingSearchModelDispatch(false);
    }
  };
  return { handleSearchModel };
};
export default useSearchModel;
