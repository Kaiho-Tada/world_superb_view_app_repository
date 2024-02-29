import { AxiosResponse, isAxiosError } from "axios";
import useMessage from "hooks/useMessage";

const useGetAllModels = () => {
  const { showMessage } = useMessage();

  const handleGetAllModels = async <T>({
    setModels,
    setLoading,
    getAllModelsApi,
  }: {
    setModels: React.Dispatch<React.SetStateAction<T[]>>;
    setLoading: React.Dispatch<React.SetStateAction<boolean | undefined>>;
    getAllModelsApi(): Promise<AxiosResponse<T[]>>;
  }) => {
    setLoading(true);
    try {
      const res = await getAllModelsApi();
      setModels(res.data);
    } catch (error) {
      if (isAxiosError(error) && error.response && error.response.status === 500) {
        showMessage({
          title: "データの取得に失敗しました。",
          status: "error",
        });
      }
    } finally {
      setLoading(false);
    }
  };
  return { handleGetAllModels };
};

export default useGetAllModels;
