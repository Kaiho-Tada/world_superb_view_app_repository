import useMessage from "hooks/useMessage";
import getAllCharacteristicsApi from "lib/api/characteristic";
import { useState } from "react";
import { Characteristic } from "types/api/characteristic/characteristic";
import { CharacteristicCheckBoxItem } from "types/api/characteristic/characteristicCheckBoxItem";

const useGetCharacteristicCheckBoxItems = () => {
  const [loadingCharacteristicCheckBoxItems, setLoadingCharacteristicCheckBoxItems] =
    useState(false);
  const [characteristicCheckBoxItems, setCharacteristicCheckBoxItems] = useState<
    Array<CharacteristicCheckBoxItem>
  >([]);
  const { showMessage } = useMessage();

  const getCharacteristicCheckBoxItems = async () => {
    setLoadingCharacteristicCheckBoxItems(true);
    try {
      const res = await getAllCharacteristicsApi();
      const characteristics = res.data;
      const newCharacteristicCheckBoxItems = characteristics.map(
        (characteristic: Characteristic) => ({
          label: characteristic.name,
          checked: false,
        })
      );
      setCharacteristicCheckBoxItems(newCharacteristicCheckBoxItems);
    } catch (error) {
      showMessage({ title: "characteristicsの取得に失敗しました。", status: "error" });
    } finally {
      setLoadingCharacteristicCheckBoxItems(false);
    }
  };

  return {
    getCharacteristicCheckBoxItems,
    characteristicCheckBoxItems,
    setCharacteristicCheckBoxItems,
    loadingCharacteristicCheckBoxItems,
  };
};
export default useGetCharacteristicCheckBoxItems;
