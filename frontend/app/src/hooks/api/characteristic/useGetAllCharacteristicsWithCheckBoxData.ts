import useMessage from "hooks/useMessage";
import getAllCharacteristicsApi from "lib/api/characteristic";
import { useState } from "react";
import { Characteristic } from "types/api/characteristic/characteristic";
import { CharacteristicWithCheckBoxData } from "types/api/characteristic/characteristicsWithCheckBoxData";

const useGetAllCharacteristicsWithCheckBoxData = () => {
  const [loadingCharacteristicsWithCheckBoxData, setloadingCharacteristicsWithCheckBoxData] =
    useState(false);
  const [characteristicsWithCheckBoxData, setCharacteristicsWithCheckBoxData] = useState<
    Array<CharacteristicWithCheckBoxData>
  >([]);
  const { showMessage } = useMessage();

  const getAllCharacteristicsWithCheckBoxData = async () => {
    setloadingCharacteristicsWithCheckBoxData(true);
    try {
      const res = await getAllCharacteristicsApi();
      const characteristics = res.data;
      const characteristicsWithCheckBox = characteristics.map((characteristic: Characteristic) => ({
        label: characteristic.name,
        superbViewNames: characteristic.superbViews.map((superbView) => superbView.name),
        checked: false,
      }));
      setCharacteristicsWithCheckBoxData(characteristicsWithCheckBox);
    } catch (error) {
      showMessage({ title: "characteristicsの取得に失敗しました。", status: "error" });
    } finally {
      setloadingCharacteristicsWithCheckBoxData(false);
    }
  };

  return {
    getAllCharacteristicsWithCheckBoxData,
    characteristicsWithCheckBoxData,
    setCharacteristicsWithCheckBoxData,
    loadingCharacteristicsWithCheckBoxData,
  };
};
export default useGetAllCharacteristicsWithCheckBoxData;
