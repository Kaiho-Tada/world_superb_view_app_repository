import { AxiosResponse } from "axios";
import useMessage from "hooks/useMessage";
import CheckItem from "types/checkItem";

type Props = {
  checkItemsDispatch: (newCheckItem: CheckItem[]) => void;
  loadingGetModelDispatch: (payload: boolean) => void;
  getModelApi: () => Promise<AxiosResponse<{ id: number; name: string }[]>>;
};

const useGetCheckItems = () => {
  const { showMessage } = useMessage();
  const handleGetCheckItems = async (props: Props) => {
    const { checkItemsDispatch, loadingGetModelDispatch, getModelApi } = props;
    loadingGetModelDispatch(true);
    try {
      const res = await getModelApi();
      const models = res.data;
      const newCheckItems = models.map((model) => ({
        label: model.name,
        checked: false,
      }));
      checkItemsDispatch(newCheckItems);
    } catch (error) {
      showMessage({
        title: "データの取得に失敗しました。",
        status: "error",
      });
    } finally {
      loadingGetModelDispatch(false);
    }
  };
  return { handleGetCheckItems };
};
export default useGetCheckItems;
