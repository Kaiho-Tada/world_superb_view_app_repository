import { Center, Checkbox, Spinner } from "@chakra-ui/react";
import useCharacteristicHandleChange from "hooks/api/characteristic/useCharacteristicHandleChange";
import { useSuperbViewListContext } from "hooks/providers/SuperbViewListProvider";
import { FC, useEffect } from "react";
import { CharacteristicWithCheckBoxData } from "types/api/characteristic/characteristicsWithCheckBoxData";

const CharacteristicCheckBox: FC = () => {
  const {
    loadingSearchSuperbViews,
    characteristicsWithCheckBoxData,
    getAllCharacteristicsWithCheckBoxData,
    loadingCharacteristicsWithCheckBoxData,
  } = useSuperbViewListContext();
  useEffect(() => {
    getAllCharacteristicsWithCheckBoxData();
  }, []);

  const { handleChangeCharacteristic } = useCharacteristicHandleChange();
  return loadingCharacteristicsWithCheckBoxData === true ? (
    <Center h="10vh">
      <Spinner />
    </Center>
  ) : (
    <>
      {characteristicsWithCheckBoxData.map(
        (characteristicWithCheckBoxData: CharacteristicWithCheckBoxData) => (
          <Checkbox
            aria-hidden="false"
            key={characteristicWithCheckBoxData.label}
            size="md"
            colorScheme="green"
            isChecked={characteristicWithCheckBoxData.checked}
            value={characteristicWithCheckBoxData.label}
            onChange={handleChangeCharacteristic}
            isDisabled={loadingSearchSuperbViews}
          >
            {characteristicWithCheckBoxData.label}
          </Checkbox>
        )
      )}
    </>
  );
};

export default CharacteristicCheckBox;
