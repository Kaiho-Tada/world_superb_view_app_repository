import { AxiosResponse, isAxiosError } from "axios";
import useMessage from "hooks/useMessage";
import { NestedCheckItem } from "types/nestedCheckItem";

type Props = {
  loadingGetModelDispatch: (payload: boolean) => void;
  checkItemsDispatch: (newCheckItems: NestedCheckItem[]) => void;
  getAllModelApi: () => Promise<AxiosResponse<{ name: string; parent: string }[]>>;
};

const useGetNestedCheckItems = () => {
  const { showMessage } = useMessage();

  const handleGetNestedCheckItems = async (props: Props) => {
    const { loadingGetModelDispatch, checkItemsDispatch, getAllModelApi } = props;
    loadingGetModelDispatch(true);
    try {
      const res = await getAllModelApi();
      const models = res.data;
      const newCheckItems = models.map((model) => ({
        label: model.name,
        parentLabel: model.parent,
        checked: false,
        isVisible: false,
      }));
      checkItemsDispatch(newCheckItems);
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
  return { handleGetNestedCheckItems };
};

export default useGetNestedCheckItems;
