import useMessage from "hooks/useMessage";
import getAllCategoriesApi from "lib/api/category";
import { useState } from "react";
import { Category } from "types/api/category/category";
import { CategoryCheckBoxItem } from "types/api/category/categoryCheckBoxItem";

const useGetCategoryCheckBoxItems = () => {
  const [loadingCategoryCheckBoxItems, setLoadingCategoryCheckBoxItems] = useState(false);
  const [categoryCheckBoxItems, setCategoryCheckBoxItems] = useState<Array<CategoryCheckBoxItem>>(
    []
  );
  const { showMessage } = useMessage();

  const getCategoryCheckBoxItems = async () => {
    setLoadingCategoryCheckBoxItems(true);
    try {
      const res = await getAllCategoriesApi();
      const categories = res.data;
      const newCategoryCheckBoxItems = categories.map((category: Category) => ({
        label: category.name,
        classification: category.classification,
        checked: false,
      }));
      setCategoryCheckBoxItems(newCategoryCheckBoxItems);
    } catch (error) {
      showMessage({ title: "categoriesの取得に失敗しました。", status: "error" });
    } finally {
      setLoadingCategoryCheckBoxItems(false);
    }
  };
  return {
    getCategoryCheckBoxItems,
    categoryCheckBoxItems,
    setCategoryCheckBoxItems,
    loadingCategoryCheckBoxItems,
  };
};

export default useGetCategoryCheckBoxItems;
