import { Radio, RadioGroup, Stack } from "@chakra-ui/react";
import { useMapContext } from "providers/MapProvider";

const MapRadioButton = () => {
  const { state, dispatch } = useMapContext();
  const { visibleValue } = state;

  const setVisibleValue = (value: string) => {
    dispatch({ type: "SET_VISIBLE_VALUE", payload: value });
  };

  return (
    <RadioGroup onChange={setVisibleValue} value={visibleValue} colorScheme="teal" size="sm">
      <Stack spacing="0">
        <Radio value="worldView">世界の舞台を表示</Radio>
        <Radio value="video">TV・映画作品を表示</Radio>
      </Stack>
    </RadioGroup>
  );
};

export default MapRadioButton;
