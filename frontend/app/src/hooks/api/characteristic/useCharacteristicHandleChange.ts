import { useSuperbViewListContext } from "hooks/providers/SuperbViewListProvider";
import { ChangeEvent, useCallback } from "react";

const useCharacteristicHandleChange = () => {
  const {
    characteristicCheckBoxItems,
    setCharacteristicCheckBoxItems,
    setCheckedCharacteristicLabels,
  } = useSuperbViewListContext();
  const handleChangeCharacteristic = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const newCharacteristicCheckBoxItems = characteristicCheckBoxItems.map(
        (originalCharacteristicCheckBoxItem) => {
          const characteristicCheckBoxItem = { ...originalCharacteristicCheckBoxItem };
          if (characteristicCheckBoxItem.label === e.target.value) {
            characteristicCheckBoxItem.checked = !characteristicCheckBoxItem.checked;
          }
          return characteristicCheckBoxItem;
        }
      );
      setCharacteristicCheckBoxItems(newCharacteristicCheckBoxItems);

      const checkedCharacteristicCheckBoxItems = newCharacteristicCheckBoxItems.filter(
        (newCharacteristicCheckBoxItem) => newCharacteristicCheckBoxItem.checked === true
      );

      const newCheckedCharacteristicLabels = checkedCharacteristicCheckBoxItems.map(
        (checkedCharacteristicCheckBoxItem) => checkedCharacteristicCheckBoxItem.label
      );
      setCheckedCharacteristicLabels(newCheckedCharacteristicLabels);
    },
    [characteristicCheckBoxItems]
  );
  return { handleChangeCharacteristic };
};
export default useCharacteristicHandleChange;
