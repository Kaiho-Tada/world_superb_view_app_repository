import { Center, Checkbox, Spinner } from "@chakra-ui/react";
import useCharacteristicHandleChange from "hooks/api/characteristic/useCharacteristicHandleChange";
import { useWorldViewListContext } from "hooks/providers/WorldViewListProvider";
import { FC } from "react";
import { CharacteristicCheckBoxItem } from "types/api/characteristic/characteristicCheckBoxItem";

const CharacteristicCheckBox: FC = () => {
  const {
    loadingSearchWorldViews,
    characteristicCheckBoxItems,
    loadingCharacteristicCheckBoxItems,
  } = useWorldViewListContext();
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
          isDisabled={loadingSearchWorldViews}
        >
          {characteristicCheckBoxItem.label}
        </Checkbox>
      ))}
    </>
  );
};

export default CharacteristicCheckBox;
