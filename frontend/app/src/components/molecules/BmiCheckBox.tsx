import { Box, Checkbox } from "@chakra-ui/react";
import useBmiHandleChange from "hooks/bmi/useBmiHandleChange";
import { useWorldViewListContext } from "hooks/providers/WorldViewListProvider";
import { BmiCheckBoxItem } from "types/bmi/bmiCheckBoxItem";

const BmiCheckBox = () => {
  const { bmiCheckBoxItems, loadingSearchWorldViews } = useWorldViewListContext();
  const { handleChangeBmi } = useBmiHandleChange();
  return (
    <Box style={{ display: "flex", flexDirection: "column" }}>
      {bmiCheckBoxItems.map((bmiCheckBoxIem: BmiCheckBoxItem) => (
        <Checkbox
          key={bmiCheckBoxIem.label}
          size="md"
          colorScheme="teal"
          isChecked={bmiCheckBoxIem.checked}
          value={bmiCheckBoxIem.label}
          onChange={handleChangeBmi}
          isDisabled={loadingSearchWorldViews}
          mb="1"
        >
          {bmiCheckBoxIem.label}
        </Checkbox>
      ))}
    </Box>
  );
};

export default BmiCheckBox;
