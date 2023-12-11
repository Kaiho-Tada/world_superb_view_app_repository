import { useSuperbViewListContext } from "hooks/providers/SuperbViewListProvider";
import { ChangeEvent, useCallback } from "react";

const useCategoryHandleChange = () => {
  const { setCheckedCategoryLabels, categoryCheckBoxItems, setCategoryCheckBoxItems } =
    useSuperbViewListContext();

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
  return { handleChangeCategory };
};
export default useCategoryHandleChange;
