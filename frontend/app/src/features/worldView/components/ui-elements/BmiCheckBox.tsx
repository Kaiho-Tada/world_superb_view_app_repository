import { Box, Checkbox } from "@chakra-ui/react";
import useBmiHandleChange from "features/worldView/hooks/filter/useBmiHandleChange";
import { BmiCheckBoxItem } from "features/worldView/types/checkBoxItems/bmiCheckBoxItem";
import { useWorldViewListContext } from "providers/WorldViewListProvider";

const BmiCheckBox = () => {
  const { state } = useWorldViewListContext();
  const { handleChangeBmi } = useBmiHandleChange();
  return (
    <Box style={{ display: "flex", flexDirection: "column" }}>
      {state.bmiCheckBoxItems.map((bmiCheckBoxIem: BmiCheckBoxItem) => (
        <Checkbox
          key={bmiCheckBoxIem.label}
          size="md"
          colorScheme="teal"
          isChecked={bmiCheckBoxIem.checked}
          value={bmiCheckBoxIem.label}
          onChange={handleChangeBmi}
          isDisabled={state.loadingSearchWorldViews}
          mb="1"
        >
          {bmiCheckBoxIem.label}
        </Checkbox>
      ))}
    </Box>
  );
};

export default BmiCheckBox;
