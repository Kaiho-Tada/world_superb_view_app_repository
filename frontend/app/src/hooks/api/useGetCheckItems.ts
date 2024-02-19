import { AxiosResponse } from "axios";
import useMessage from "hooks/useMessage";
import CheckItem from "types/checkItem";

type Props = {
  checkItemsDispatch: (newCheckItem: CheckItem[]) => void;
  loadingModelDispatch: (payload: boolean) => void;
  fetchModelApi: () => Promise<AxiosResponse<{ id: number; name: string }[]>>;
};

const useGetCheckItems = () => {
  const { showMessage } = useMessage();
  const handleGetCheckItems = async (props: Props) => {
    const { checkItemsDispatch, loadingModelDispatch, fetchModelApi } = props;
    loadingModelDispatch(true);
    try {
      const res = await fetchModelApi();
      const models = res.data;
      const newCheckItems = models.map((model) => ({
        label: model.name,
        checked: false,
      }));
      checkItemsDispatch(newCheckItems);
    } catch (error) {
      showMessage({
        title: "モデルの取得に失敗しました。",
        status: "error",
      });
    } finally {
      loadingModelDispatch(false);
    }
  };
  return { handleGetCheckItems };
};
export default useGetCheckItems;
