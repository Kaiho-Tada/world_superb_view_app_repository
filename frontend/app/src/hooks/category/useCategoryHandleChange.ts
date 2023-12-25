import { useWorldViewListContext } from "hooks/providers/WorldViewListProvider";
import { ChangeEvent, useCallback } from "react";

const useCategoryHandleChange = () => {
  const { state, dispatch } = useWorldViewListContext();

  const handleChangeClassification = (e: ChangeEvent<HTMLInputElement>) => {
    const newCheckBoxItems = state.categoryCheckBoxItems.map((originalCheckBoxItem) => {
      const checkBoxItem = { ...originalCheckBoxItem };
      if (e.target.value === checkBoxItem.classification) {
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

  const handleChangeCategory = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const newCategoryCheckBoxItems = state.categoryCheckBoxItems.map(
        (originalCategoryCheckBoxItem) => {
          const categoryCheckBoxItem = { ...originalCategoryCheckBoxItem };
          if (categoryCheckBoxItem.label === e.target.value) {
            categoryCheckBoxItem.checked = !categoryCheckBoxItem.checked;
          }
          return categoryCheckBoxItem;
        }
      );
      dispatch({ type: "SET_CATEGORY_CHECKBOX_ITEMS", payload: newCategoryCheckBoxItems });

      const checkedCategoryCheckBoxItems = newCategoryCheckBoxItems.filter(
        (newCategoryWithCheckBoxData) => newCategoryWithCheckBoxData.checked === true
      );

      const newCheckedCategoryLabels = checkedCategoryCheckBoxItems.map(
        (checkedCategoryCheckBoxItem) => checkedCategoryCheckBoxItem.label
      );
      dispatch({ type: "SET_CHECKED_CATEGORY_LABELS", payload: newCheckedCategoryLabels });
    },
    [state.categoryCheckBoxItems]
  );
  return { handleChangeClassification, handleChangeCategory };
};
export default useCategoryHandleChange;
