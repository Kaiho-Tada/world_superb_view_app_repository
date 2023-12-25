import { Center, Checkbox, Spinner } from "@chakra-ui/react";
import useCharacteristicHandleChange from "hooks/characteristic/useCharacteristicHandleChange";
import { useWorldViewListContext } from "hooks/providers/WorldViewListProvider";
import { FC } from "react";
import { CharacteristicCheckBoxItem } from "types/api/characteristic/characteristicCheckBoxItem";

const CharacteristicCheckBox: FC = () => {
  const { state } = useWorldViewListContext();
  const { handleChangeCharacteristic } = useCharacteristicHandleChange();

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
            onChange={handleChangeCharacteristic}
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
