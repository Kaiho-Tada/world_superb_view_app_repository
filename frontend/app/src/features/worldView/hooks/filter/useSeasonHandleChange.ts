import { useWorldViewListContext } from "providers/WorldViewListProvider";
import { ChangeEvent } from "react";

const useSeasonHandleChange = () => {
  const { state, dispatch } = useWorldViewListContext();

  const handleChangeSeason = (e: ChangeEvent<HTMLInputElement>) => {
    const newCheckBoxItems = state.monthCheckBoxItems.map((originalCheckBoxItem) => {
      const checkBoxItem = { ...originalCheckBoxItem };
      if (e.target.value === checkBoxItem.parentLabel) {
        checkBoxItem.checked = e.target.checked;
      }
      return checkBoxItem;
    });
    dispatch({ type: "SET_MONTH_CHECKBOX_ITEMS", payload: newCheckBoxItems });

    const checkedCheckBoxItems = newCheckBoxItems.filter(
      (newCheckBoxItem) => newCheckBoxItem.checked === true
    );
    const newCheckBoxItemLabels = checkedCheckBoxItems.map(
      (checkedCheckBoxItem) => checkedCheckBoxItem.label
    );
    dispatch({ type: "SET_CHECKED_MONTH_LABELS", payload: newCheckBoxItemLabels });
  };

  return { handleChangeSeason };
};

export default useSeasonHandleChange;
