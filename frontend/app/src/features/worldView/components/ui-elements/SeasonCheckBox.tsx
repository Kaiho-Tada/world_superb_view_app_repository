import { Box, Checkbox } from "@chakra-ui/react";
import useGetCheckBoxInfo from "features/worldView/hooks/useGetCheckBoxInfo";
import { useWorldViewListContext } from "providers/WorldViewListProvider";
import { ChangeEvent } from "react";
import { NestedCheckBoxItem } from "types/nestedCheckBoxItem";
import handleChangeCheckBox from "utils/handleChangeCheckBox";
import handleChangeParentCheckBox from "utils/handleChangeParentCheckBox";

const SeasonCheckBox = () => {
  const { state, dispatch } = useWorldViewListContext();
  const checkBoxItems = state.monthCheckBoxItems;

  const checkBoxItemsDispatch = (newCheckBoxItems: NestedCheckBoxItem[]) => {
    dispatch({ type: "SET_MONTH_CHECKBOX_ITEMS", payload: newCheckBoxItems });
  };

  const checkedLabelsDispatch = (newCheckedLabels: string[]) => {
    dispatch({ type: "SET_CHECKED_MONTH_LABELS", payload: newCheckedLabels });
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleChangeCheckBox<NestedCheckBoxItem[]>({
      checkBoxItems,
      checkBoxItemsDispatch,
      e,
      checkedLabelsDispatch,
    });
  };

  const handleChaneParent = (e: ChangeEvent<HTMLInputElement>) => {
    handleChangeParentCheckBox({
      e,
      checkBoxItems: state.monthCheckBoxItems,
      checkBoxItemsDispatch,
      checkedLabelsDispatch,
    });
  };

  const { handleGetCheckBoxInfo } = useGetCheckBoxInfo();
  const checkBoxInfo = [
    handleGetCheckBoxInfo({ parent: "春", checkBoxItems: state.monthCheckBoxItems }),
    handleGetCheckBoxInfo({ parent: "夏", checkBoxItems: state.monthCheckBoxItems }),
    handleGetCheckBoxInfo({ parent: "秋", checkBoxItems: state.monthCheckBoxItems }),
    handleGetCheckBoxInfo({ parent: "冬", checkBoxItems: state.monthCheckBoxItems }),
  ];

  return (
    <>
      {checkBoxInfo.map((information) => (
        <Box key={information.label}>
          <Checkbox
            isChecked={information.allChecked}
            isIndeterminate={information.isIndeterminate}
            value={information.label}
            disabled={state.loadingSearchWorldViews}
            onChange={handleChaneParent}
            colorScheme="teal"
          >
            {information.label}
          </Checkbox>
          <Box pl={6} my={1}>
            {state.monthCheckBoxItems.map((checkBoxItem) =>
              checkBoxItem.parentLabel === information.label ? (
                <Checkbox
                  key={checkBoxItem.label}
                  isChecked={checkBoxItem.checked}
                  value={checkBoxItem.label}
                  disabled={state.loadingSearchWorldViews}
                  onChange={handleChange}
                  colorScheme="teal"
                >
                  {checkBoxItem.label}
                </Checkbox>
              ) : null
            )}
          </Box>
        </Box>
      ))}
    </>
  );
};
export default SeasonCheckBox;
