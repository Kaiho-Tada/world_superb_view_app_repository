import { useSuperbViewListContext } from "hooks/providers/SuperbViewListProvider";
import { ChangeEvent, useCallback } from "react";

const useCharacteristicHandleChange = () => {
  const {
    characteristicsWithCheckBoxData,
    setCharacteristicsWithCheckBoxData,
    setCheckedCharacteristicLabels,
  } = useSuperbViewListContext();
  const handleChangeCharacteristic = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const newCharacteristicsWithCheckBoxData = characteristicsWithCheckBoxData.map(
        (originalCharacteristicWithCheckBoxData) => {
          const CharacteristicWithCheckBoxData = { ...originalCharacteristicWithCheckBoxData };
          if (CharacteristicWithCheckBoxData.label === e.target.value) {
            CharacteristicWithCheckBoxData.checked = !CharacteristicWithCheckBoxData.checked;
          }
          return CharacteristicWithCheckBoxData;
        }
      );
      setCharacteristicsWithCheckBoxData(newCharacteristicsWithCheckBoxData);

      const checkedCharacteristicsWithCheckBoxData = newCharacteristicsWithCheckBoxData.filter(
        (newCharacteristicWithCheckBoxData) => newCharacteristicWithCheckBoxData.checked === true
      );

      const newCheckedCharacteristicLabels = checkedCharacteristicsWithCheckBoxData.map(
        (checkedCharacteristicWithCheckBoxData) => checkedCharacteristicWithCheckBoxData.label
      );
      setCheckedCharacteristicLabels(newCheckedCharacteristicLabels);
    },
    [characteristicsWithCheckBoxData]
  );
  return { handleChangeCharacteristic };
};
export default useCharacteristicHandleChange;
