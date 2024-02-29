import {
  Box,
  RangeSlider,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  RangeSliderTrack,
} from "@chakra-ui/react";
import { FC, memo, useState } from "react";

interface Props {
  value: number[];
  min: number;
  max: number;
  step: number;
  handleChange: (newRange: number[]) => void;
  rangeLabel: string;
}
const FilterRangeSlider: FC<Props> = memo((props) => {
  const { value, min, max, step, handleChange, rangeLabel } = props;
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <Box position="relative" width="100%">
      <RangeSlider
        value={value}
        min={min}
        max={max}
        step={step}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        colorScheme="teal"
        position="relative"
        my="3"
      >
        <RangeSliderTrack>
          <RangeSliderFilledTrack bg="#4FD1C5" />
        </RangeSliderTrack>
        <RangeSliderThumb index={0} bg="#4FD1C5" />
        <RangeSliderThumb index={1} bg="#4FD1C5" />
      </RangeSlider>
      {isFocused && (
        <Box
          position="absolute"
          top="-40px"
          left="50%"
          transform="translateX(-50%)"
          p="2"
          bg="gray.900"
          color="white"
          borderRadius="4px"
          fontSize="sm"
          textAlign="center"
        >
          {`${rangeLabel} ${value[0]} ~ ${value[1]}`}
        </Box>
      )}
    </Box>
  );
});

export default FilterRangeSlider;
