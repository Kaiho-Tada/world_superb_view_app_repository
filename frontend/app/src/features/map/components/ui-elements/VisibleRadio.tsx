import { Radio, RadioGroup, Stack } from "@chakra-ui/react";
import { useMapContext } from "providers/MapProvider";

const VisibleRadio = () => {
  const { state, dispatch } = useMapContext();
  const { visibleValue } = state;

  const setVisibleValue = (value: string) => {
    dispatch({ type: "SET_VISIBLE_VALUE", payload: value });
  };

  return (
    <RadioGroup
      aria-label="表示するコンテンツの選択"
      onChange={setVisibleValue}
      value={visibleValue}
      colorScheme="blue"
      size="sm"
    >
      <Stack spacing="0">
        <Radio value="marker">マーカーを表示</Radio>
        <Radio value="image">画像を表示</Radio>
      </Stack>
    </RadioGroup>
  );
};

export default VisibleRadio;
