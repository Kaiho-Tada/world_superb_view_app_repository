import {
  Flex,
  RangeSlider,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  RangeSliderTrack,
  Text,
} from "@chakra-ui/react";
import { FC } from "react";

interface Props {
  value: number[];
  min: number;
  max: number;
  step: number;
  handleChange: (newValue: number[]) => void;
}
const FilterRangeSlider: FC<Props> = (props) => {
  const { value, min, max, step, handleChange } = props;
  return (
    <RangeSlider
      value={value}
      min={min}
      max={max}
      step={step}
      onChange={handleChange}
      colorScheme="teal"
      position="relative"
      my="3"
    >
      <RangeSliderTrack>
        <RangeSliderFilledTrack />
      </RangeSliderTrack>
      <RangeSliderThumb index={0}>
        <Text position="absolute" top="-20px">
          {value[0]}
        </Text>
      </RangeSliderThumb>
      <RangeSliderThumb index={1}>
        <Text position="absolute" top="-20px">
          {value[1]}
        </Text>
      </RangeSliderThumb>
      <Flex color="gray.400" fontSize="sm">
        <Text position="absolute" bottom="-15px" left="-2%">
          {min}
        </Text>
        <Text position="absolute" bottom="-15px" left="48%">
          {(max - min) / 2}
        </Text>
        <Text position="absolute" bottom="-15px" left="96.5%">
          {max}
        </Text>
      </Flex>
    </RangeSlider>
  );
};

export default FilterRangeSlider;
