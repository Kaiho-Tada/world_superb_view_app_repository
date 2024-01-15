import { useWorldViewListContext } from "providers/WorldViewListProvider";
import { ChangeEvent } from "react";

const useCategoryHandleChange = () => {
  const { state, dispatch } = useWorldViewListContext();

  const handleChangeClassification = (e: ChangeEvent<HTMLInputElement>) => {
    const newCheckBoxItems = state.categoryCheckBoxItems.map((originalCheckBoxItem) => {
      const checkBoxItem = { ...originalCheckBoxItem };
      if (e.target.value === checkBoxItem.parentLabel) {
        checkBoxItem.checked = e.target.checked;
      }
      return checkBoxItem;
    });
    dispatch({ type: "SET_CATEGORY_CHECKBOX_ITEMS", payload: newCheckBoxItems });

    const checkedCheckBoxItems = newCheckBoxItems.filter(
      (newCheckBoxItem) => newCheckBoxItem.checked === true
    );

    const newCheckBoxItemLabels = checkedCheckBoxItems.map(
      (checkedCheckBoxItem) => checkedCheckBoxItem.label
    );
    dispatch({ type: "SET_CHECKED_CATEGORY_LABELS", payload: newCheckBoxItemLabels });
  };

  return { handleChangeClassification };
};
export default useCategoryHandleChange;
