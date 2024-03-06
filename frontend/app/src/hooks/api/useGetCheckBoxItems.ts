import { AxiosResponse, isAxiosError } from "axios";
import useMessage from "hooks/useMessage";
import { CheckBoxItem } from "types/checkBoxItem";

type Props = {
  loadingGetModelDispatch: (payload: boolean) => void;
  checkBoxItemsDispatch: (newCheckBoxItems: CheckBoxItem[]) => void;
  getAllModelApi: () => Promise<AxiosResponse<{ name: string }[]>>;
};
const useGetCheckBoxItems = () => {
  const { showMessage } = useMessage();

  const handleGetCheckBoxItems = async (props: Props) => {
    const { loadingGetModelDispatch, checkBoxItemsDispatch, getAllModelApi } = props;
    loadingGetModelDispatch(true);
    try {
      const res = await getAllModelApi();
      const models = res.data;
      const newCheckBoxItems = models.map((model: { name: string }) => ({
        label: model.name,
        checked: false,
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
  return { handleGetCheckBoxItems };
};
export default useGetCheckBoxItems;
