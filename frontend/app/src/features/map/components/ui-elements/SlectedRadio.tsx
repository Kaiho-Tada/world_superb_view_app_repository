import { Radio, RadioGroup, Stack } from "@chakra-ui/react";
import { useMapContext } from "providers/MapProvider";

const SelectedRadio = () => {
  const { state, dispatch } = useMapContext();
  const { selectedValue } = state;

  const setSelectedValue = (value: string) => {
    dispatch({ type: "SET_SELECTED_VALUE", payload: value });
  };

  return (
    <RadioGroup
      aria-label="検索するコンテンツの選択"
      onChange={setSelectedValue}
      value={selectedValue}
      colorScheme="teal"
      size="sm"
    >
      <Stack spacing="0">
        <Radio value="worldView">世界の舞台を探す</Radio>
        <Radio value="video">TV・映画作品を探す</Radio>
      </Stack>
    </RadioGroup>
  );
};

export default SelectedRadio;
