import { AxiosResponse, isAxiosError } from "axios";
import useMessage from "hooks/useMessage";
import { NestedCheckBoxItem } from "types/nestedCheckBoxItem";

type Props<T> = {
  loadingGetModelDispatch: (payload: boolean) => void;
  checkBoxItemsDispatch: (newCheckBoxItems: NestedCheckBoxItem[]) => void;
  getAllModelApi: () => Promise<AxiosResponse<T[]>>;
};

const useGetNestedCheckBoxItems = () => {
  const { showMessage } = useMessage();

  const handleGetNestedCheckBoxItems = async <T extends { name: string; parent: string }>(
    props: Props<T>
  ) => {
    const { loadingGetModelDispatch, checkBoxItemsDispatch, getAllModelApi } = props;
    loadingGetModelDispatch(true);
    try {
      const res = await getAllModelApi();
      const models = res.data;
      const newCheckBoxItems = models.map((model: T) => ({
        label: model.name,
        parentLabel: model.parent,
        checked: false,
        isVisible: false,
      }));
      checkBoxItemsDispatch(newCheckBoxItems);
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
  return { handleGetNestedCheckBoxItems };
};

export default useGetNestedCheckBoxItems;
