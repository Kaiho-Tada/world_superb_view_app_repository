import { useSuperbViewListContext } from "hooks/providers/SuperbViewListProvider";
import { ChangeEvent, useCallback } from "react";

const useCategoryHandleChange = () => {
  const { setCheckedCategoryLabels, categoriesWithCheckBoxData, setCategoriesWithCheckBoxData } =
    useSuperbViewListContext();

  const handleChangeCategory = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const newCategoriesWithCheckBoxData = categoriesWithCheckBoxData.map(
        (originalCategoryWithCheckBoxData) => {
          const categoryWithCheckBoxData = { ...originalCategoryWithCheckBoxData };
          if (categoryWithCheckBoxData.label === e.target.value) {
            categoryWithCheckBoxData.checked = !categoryWithCheckBoxData.checked;
          }
          return categoryWithCheckBoxData;
        }
      );
      setCategoriesWithCheckBoxData(newCategoriesWithCheckBoxData);

      const checkedCategoriesWithCheckBoxData = newCategoriesWithCheckBoxData.filter(
        (newCategoryWithCheckBoxData) => newCategoryWithCheckBoxData.checked === true
      );

      const newCheckedCategoryLabels = checkedCategoriesWithCheckBoxData.map(
        (checkedCategoryWithCheckBoxData) => checkedCategoryWithCheckBoxData.label
      );
      setCheckedCategoryLabels(newCheckedCategoryLabels);
    },
    [categoriesWithCheckBoxData]
  );
  return { handleChangeCategory };
};
export default useCategoryHandleChange;
