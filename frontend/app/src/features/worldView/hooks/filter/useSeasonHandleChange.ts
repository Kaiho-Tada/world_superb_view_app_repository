import { useWorldViewListContext } from "providers/WorldViewListProvider";
import { ChangeEvent } from "react";

const useSeasonHandleChange = () => {
  const { state, dispatch } = useWorldViewListContext();

  const handleChangeSeason = (e: ChangeEvent<HTMLInputElement>) => {
    const newCheckBoxItems = state.monthCheckBoxItems.map((originalCheckBoxItem) => {
      const checkBoxItem = { ...originalCheckBoxItem };
      if (e.target.value === checkBoxItem.season) {
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

  const handleChangeMonth = (e: ChangeEvent<HTMLInputElement>) => {
    const newCheckBoxItems = state.monthCheckBoxItems.map((originalcheckBoxItem) => {
      const checkBoxItem = { ...originalcheckBoxItem };
      if (checkBoxItem.label === e.target.value) {
        checkBoxItem.checked = !checkBoxItem.checked;
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
  return { handleChangeSeason, handleChangeMonth };
};

export default useSeasonHandleChange;
