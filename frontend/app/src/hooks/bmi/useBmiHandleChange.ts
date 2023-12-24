import { useWorldViewListContext } from "hooks/providers/WorldViewListProvider";
import { ChangeEvent, useCallback } from "react";

const useBmiHandleChange = () => {
  const { state, dispatch } = useWorldViewListContext();

  const handleChangeBmi = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const newCheckBoxItems = state.bmiCheckBoxItems.map((originalCheckBoxIems) => {
        const checkBoxIem = { ...originalCheckBoxIems };
        if (checkBoxIem.label === e.target.value) {
          checkBoxIem.checked = !checkBoxIem.checked;
        }
        return checkBoxIem;
      });
      dispatch({ type: "SET_BMI_CHECKBOX_ITEMS", payload: newCheckBoxItems });

      const checkedCheckBoxItems = newCheckBoxItems.filter(
        (newCheckBoxItem) => newCheckBoxItem.checked === true
      );
      const newCheckedLabels = checkedCheckBoxItems.map(
        (checkedCheckBoxItem) => checkedCheckBoxItem.label
      );
      dispatch({ type: "SET_CHECKED_BMI_LABELS", payload: newCheckedLabels });
    },
    [state.bmiCheckBoxItems]
  );
  return { handleChangeBmi };
};

export default useBmiHandleChange;
