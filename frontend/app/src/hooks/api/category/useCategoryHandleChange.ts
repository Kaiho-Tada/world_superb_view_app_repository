import { useWorldViewListContext } from "hooks/providers/WorldViewListProvider";
import { ChangeEvent, useCallback } from "react";

const useCategoryHandleChange = () => {
  const { setCheckedCategoryLabels, categoryCheckBoxItems, setCategoryCheckBoxItems } =
    useWorldViewListContext();

  const handleChangeClassification = (e: ChangeEvent<HTMLInputElement>) => {
    const newCheckBoxItems = categoryCheckBoxItems.map((originalCheckBoxItem) => {
      const checkBoxItem = { ...originalCheckBoxItem };
      if (e.target.value === checkBoxItem.classification) {
        checkBoxItem.checked = e.target.checked;
      }
      return checkBoxItem;
    });
    setCategoryCheckBoxItems(newCheckBoxItems);

    const checkedCheckBoxItems = newCheckBoxItems.filter(
      (newCheckBoxItem) => newCheckBoxItem.checked === true
    );

    const newCheckBoxItemLabels = checkedCheckBoxItems.map(
      (checkedCheckBoxItem) => checkedCheckBoxItem.label
    );
    setCheckedCategoryLabels(newCheckBoxItemLabels);
  };

  const handleChangeCategory = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const newCategoryCheckBoxItems = categoryCheckBoxItems.map((originalCategoryCheckBoxItem) => {
        const categoryCheckBoxItem = { ...originalCategoryCheckBoxItem };
        if (categoryCheckBoxItem.label === e.target.value) {
          categoryCheckBoxItem.checked = !categoryCheckBoxItem.checked;
        }
        return categoryCheckBoxItem;
      });
      setCategoryCheckBoxItems(newCategoryCheckBoxItems);

      const checkedCategoryCheckBoxItems = newCategoryCheckBoxItems.filter(
        (newCategoryWithCheckBoxData) => newCategoryWithCheckBoxData.checked === true
      );

      const newCheckedCategoryLabels = checkedCategoryCheckBoxItems.map(
        (checkedCategoryCheckBoxItem) => checkedCategoryCheckBoxItem.label
      );
      setCheckedCategoryLabels(newCheckedCategoryLabels);
    },
    [categoryCheckBoxItems]
  );
  return { handleChangeClassification, handleChangeCategory };
};
export default useCategoryHandleChange;
