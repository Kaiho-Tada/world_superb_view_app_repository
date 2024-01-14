import { Box, Checkbox } from "@chakra-ui/react";
import useHandleChangeCheckBox from "features/worldView/hooks/useHandleChangeCheckBox";
import { BmiCheckBoxItem } from "features/worldView/types/checkBoxItems/bmiCheckBoxItem";
import { useWorldViewListContext } from "providers/WorldViewListProvider";
import { ChangeEvent } from "react";

const BmiCheckBox = () => {
  const { state, dispatch } = useWorldViewListContext();
  const { handleChangeCheckBox } = useHandleChangeCheckBox();

  const checkBoxItemsDispatch = (newCheckBoxItems: BmiCheckBoxItem[]) => {
    dispatch({ type: "SET_BMI_CHECKBOX_ITEMS", payload: newCheckBoxItems });
  };

  const checkedLabelsDispatch = (newCheckedLabels: string[]) => {
    dispatch({ type: "SET_CHECKED_BMI_LABELS", payload: newCheckedLabels });
  };

  const handleChenge = (e: ChangeEvent<HTMLInputElement>) => {
    handleChangeCheckBox({
      e,
      checkBoxItems: state.bmiCheckBoxItems,
      checkBoxItemsDispatch,
      checkedLabelsDispatch,
    });
  };

  return (
    <Box style={{ display: "flex", flexDirection: "column" }}>
      {state.bmiCheckBoxItems.map((bmiCheckBoxIem: BmiCheckBoxItem) => (
        <Checkbox
          key={bmiCheckBoxIem.label}
          size="md"
          colorScheme="teal"
          isChecked={bmiCheckBoxIem.checked}
          value={bmiCheckBoxIem.label}
          onChange={handleChenge}
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
