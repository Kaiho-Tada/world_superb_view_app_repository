import { useWorldViewListContext } from "providers/WorldViewListProvider";
import { ChangeEvent, useCallback } from "react";

const useCharacteristicHandleChange = () => {
  const { state, dispatch } = useWorldViewListContext();

  const handleChangeCharacteristic = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const newCharacteristicCheckBoxItems = state.characteristicCheckBoxItems.map(
        (originalCharacteristicCheckBoxItem) => {
          const characteristicCheckBoxItem = { ...originalCharacteristicCheckBoxItem };
          if (characteristicCheckBoxItem.label === e.target.value) {
            characteristicCheckBoxItem.checked = !characteristicCheckBoxItem.checked;
          }
          return characteristicCheckBoxItem;
        }
      );
      dispatch({
        type: "SET_CHARACTERISTIC_CHECKBOX_ITEMS",
        payload: newCharacteristicCheckBoxItems,
      });

      const checkedCharacteristicCheckBoxItems = newCharacteristicCheckBoxItems.filter(
        (newCharacteristicCheckBoxItem) => newCharacteristicCheckBoxItem.checked === true
      );
      const newCheckedCharacteristicLabels = checkedCharacteristicCheckBoxItems.map(
        (checkedCharacteristicCheckBoxItem) => checkedCharacteristicCheckBoxItem.label
      );
      dispatch({
        type: "SET_CHECKED_CHARACTERISTIC_LABELS",
        payload: newCheckedCharacteristicLabels,
      });
    },
    [state.characteristicCheckBoxItems]
  );
  return { handleChangeCharacteristic };
};
export default useCharacteristicHandleChange;
