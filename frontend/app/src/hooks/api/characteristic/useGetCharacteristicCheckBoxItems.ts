import { useWorldViewListContext } from "hooks/providers/WorldViewListProvider";
import useMessage from "hooks/useMessage";
import getAllCharacteristicsApi from "lib/api/characteristicApi";
import { Characteristic } from "types/api/characteristic/characteristic";

const useGetCharacteristicCheckBoxItems = () => {
  const { dispatch } = useWorldViewListContext();
  const { showMessage } = useMessage();

  const getCharacteristicCheckBoxItems = async () => {
    dispatch({ type: "SET_LOADING_CHARACTERISTIC_CHECKBOX_ITEMS", payload: true });
    try {
      const res = await getAllCharacteristicsApi();
      const characteristics = res.data;
      const newCharacteristicCheckBoxItems = characteristics.map(
        (characteristic: Characteristic) => ({
          label: characteristic.name,
          checked: false,
        })
      );
      dispatch({
        type: "SET_CHARACTERISTIC_CHECKBOX_ITEMS",
        payload: newCharacteristicCheckBoxItems,
      });
    } catch (error) {
      showMessage({ title: "characteristicsの取得に失敗しました。", status: "error" });
    } finally {
      dispatch({ type: "SET_LOADING_CHARACTERISTIC_CHECKBOX_ITEMS", payload: false });
    }
  };
  return {
    getCharacteristicCheckBoxItems,
  };
};
export default useGetCharacteristicCheckBoxItems;
