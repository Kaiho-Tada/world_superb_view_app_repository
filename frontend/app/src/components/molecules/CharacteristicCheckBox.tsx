import { Center, Checkbox, Spinner } from "@chakra-ui/react";
import useCharacteristicHandleChange from "hooks/api/characteristic/useCharacteristicHandleChange";
import { useSuperbViewListContext } from "hooks/providers/SuperbViewListProvider";
import { FC } from "react";
import { CharacteristicCheckBoxItem } from "types/api/characteristic/characteristicCheckBoxItem";

const CharacteristicCheckBox: FC = () => {
  const {
    loadingSearchSuperbViews,
    characteristicCheckBoxItems,
    loadingCharacteristicCheckBoxItems,
  } = useSuperbViewListContext();
  const { handleChangeCharacteristic } = useCharacteristicHandleChange();

  return loadingCharacteristicCheckBoxItems === true ? (
    <Center h="10vh">
      <Spinner role="status" aria-label="読み込み中" />
    </Center>
  ) : (
    <>
      {characteristicCheckBoxItems.map((characteristicCheckBoxItem: CharacteristicCheckBoxItem) => (
        <Checkbox
          aria-hidden="false"
          key={characteristicCheckBoxItem.label}
          size="md"
          colorScheme="green"
          isChecked={characteristicCheckBoxItem.checked}
          value={characteristicCheckBoxItem.label}
          onChange={handleChangeCharacteristic}
          isDisabled={loadingSearchSuperbViews}
        >
          {characteristicCheckBoxItem.label}
        </Checkbox>
      ))}
    </>
  );
};

export default CharacteristicCheckBox;
