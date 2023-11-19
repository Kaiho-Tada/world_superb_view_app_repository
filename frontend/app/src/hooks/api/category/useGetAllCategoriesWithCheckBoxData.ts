import useMessage from "hooks/useMessage";
import getAllCategoriesApi from "lib/api/category";
import { useState } from "react";
import { Category } from "types/api/category/category";
import { CategoryWithCheckBoxData } from "types/api/category/categoryWithCheckBoxData";

const useGetAllCategoriesWithCheckBoxData = () => {
  const [loadingCategoriesWithCheckBoxData, setloadingCategoriesWithCheckBoxData] = useState(false);
  const [categoriesWithCheckBoxData, setCategoriesWithCheckBoxData] = useState<
    Array<CategoryWithCheckBoxData>
  >([]);
  const { showMessage } = useMessage();

  const getAllCategoriesWithCheckBoxData = async () => {
    setloadingCategoriesWithCheckBoxData(true);
    try {
      const res = await getAllCategoriesApi();
      const categories = res.data;
      const categoriesWithCheckBox = categories.map((category: Category) => ({
        label: category.name,
        classification: category.classification,
        superbViewNames: category.superbViews.map((superbView) => superbView.name),
        checked: false,
      }));
      setCategoriesWithCheckBoxData(categoriesWithCheckBox);
    } catch (error) {
      showMessage({ title: "categoriesの取得に失敗しました。", status: "error" });
    } finally {
      setloadingCategoriesWithCheckBoxData(false);
    }
  };
  return {
    getAllCategoriesWithCheckBoxData,
    categoriesWithCheckBoxData,
    setCategoriesWithCheckBoxData,
    loadingCategoriesWithCheckBoxData,
  };
};

export default useGetAllCategoriesWithCheckBoxData;
