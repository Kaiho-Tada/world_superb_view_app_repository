import { Center, Checkbox, Spinner } from "@chakra-ui/react";
import useCharacteristicCheckBoxHandleChange from "hooks/api/characteristic/useCharacteristicCheckBoxHandleChange";
import { useSuperbViewListContext } from "hooks/providers/SuperbViewListProvider";
import { FC, useEffect } from "react";
import { CharacteristicWithCheckBoxData } from "types/api/characteristic/characteristicsWithCheckBoxData";

const CharacteristicCheckBox: FC = () => {
  const {
    loadingSearchSuperbViews,
    characteristicsWithCheckBoxData,
    getAllCharacteristicsWithCheckBoxData,
    loadingCharacteristicsWithCheckBoxData,
    loadingSuperbViews,
  } = useSuperbViewListContext();
  useEffect(() => {
    getAllCharacteristicsWithCheckBoxData();
  }, []);

  const { handleChange } = useCharacteristicCheckBoxHandleChange();
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
            onChange={handleChange}
            isDisabled={loadingSuperbViews || loadingSearchSuperbViews}
          >
            {characteristicWithCheckBoxData.label}
          </Checkbox>
        )
      )}
    </>
  );
};

export default CharacteristicCheckBox;
