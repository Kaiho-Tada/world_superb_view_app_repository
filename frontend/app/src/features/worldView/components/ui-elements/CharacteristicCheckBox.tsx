import { Center, Checkbox, Spinner } from "@chakra-ui/react";
import useHandleChangeCheckBox from "features/worldView/hooks/useHandleChangeCheckBox";
import { CharacteristicCheckBoxItem } from "features/worldView/types/checkBoxItems/characteristicCheckBoxItem";
import { useWorldViewListContext } from "providers/WorldViewListProvider";
import { ChangeEvent, FC } from "react";

const CharacteristicCheckBox: FC = () => {
  const { state, dispatch } = useWorldViewListContext();
  const { handleChangeCheckBox } = useHandleChangeCheckBox();
  const checkBoxItems = state.characteristicCheckBoxItems;

  const checkBoxItemsDispatch = (newCheckBoxItems: CharacteristicCheckBoxItem[]) => {
    dispatch({
      type: "SET_CHARACTERISTIC_CHECKBOX_ITEMS",
      payload: newCheckBoxItems,
    });
  };

  const checkedLabelsDispatch = (newCheckedLabels: string[]) => {
    dispatch({
      type: "SET_CHECKED_CHARACTERISTIC_LABELS",
      payload: newCheckedLabels,
    });
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleChangeCheckBox({ checkBoxItems, checkBoxItemsDispatch, e, checkedLabelsDispatch });
  };

  return state.loadingCharacteristicCheckBoxItems === true ? (
    <Center h="10vh">
      <Spinner role="status" aria-label="読み込み中" />
    </Center>
  ) : (
    <>
      {state.characteristicCheckBoxItems.map(
        (characteristicCheckBoxItem: CharacteristicCheckBoxItem) => (
          <Checkbox
            aria-hidden="false"
            key={characteristicCheckBoxItem.label}
            size="md"
            colorScheme="green"
            isChecked={characteristicCheckBoxItem.checked}
            value={characteristicCheckBoxItem.label}
            onChange={handleChange}
            isDisabled={state.loadingSearchWorldViews}
          >
            {characteristicCheckBoxItem.label}
          </Checkbox>
        )
      )}
    </>
  );
};

export default CharacteristicCheckBox;
