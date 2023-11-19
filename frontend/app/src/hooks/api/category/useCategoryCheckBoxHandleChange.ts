import { useSuperbViewListContext } from "hooks/providers/SuperbViewListProvider";
import useMessage from "hooks/useMessage";
import { searchSuperbViewsApi } from "lib/api/superbView";
import { ChangeEvent, useCallback } from "react";

const useCategoryCheckBoxHandleChange = () => {
  const {
    setLoadingSearchSuperbViews,
    setCheckedCategoryLabels,
    setSuperbViews,
    categoriesWithCheckBoxData,
    setCategoriesWithCheckBoxData,
    checkedCountryLabels,
    checkedCharacteristicLabels,
    checkedRiskLevelLabels,
  } = useSuperbViewListContext();
  const { showMessage } = useMessage();
  const handleChange = useCallback(
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

      const checkedCategoryLabels = checkedCategoriesWithCheckBoxData.map(
        (checkedCategoryWithCheckBoxData) => checkedCategoryWithCheckBoxData.label
      );
      setCheckedCategoryLabels(checkedCategoryLabels);

      const searchSuperbViews = async () => {
        setLoadingSearchSuperbViews(true);
        try {
          const res = await searchSuperbViewsApi({
            checkedCategoryLabels,
            checkedCountryLabels,
            checkedCharacteristicLabels,
            checkedRiskLevelLabels,
          });
          setSuperbViews(res.data);
        } catch (error) {
          showMessage({ title: "絶景一覧の取得に失敗しました。", status: "error" });
        } finally {
          setLoadingSearchSuperbViews(false);
        }
      };
      searchSuperbViews();
    },
    [categoriesWithCheckBoxData, checkedCountryLabels, checkedCharacteristicLabels]
  );
  return { handleChange };
};
export default useCategoryCheckBoxHandleChange;
