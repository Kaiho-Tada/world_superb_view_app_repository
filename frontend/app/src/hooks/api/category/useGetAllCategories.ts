import useMessage from "hooks/useMessage";
import getAllCategoriesApi from "lib/api/category";
import { useState } from "react";
import { Category } from "types/api/category/category";

const useGetAllCategories = () => {
  const [loadingCategories, setloadingCategories] = useState(false);
  const [categories, setCategories] = useState<Array<Category>>([]);
  const { showMessage } = useMessage();

  const getAllCategories = async () => {
    setloadingCategories(true);
    try {
      const res = await getAllCategoriesApi();
      setCategories(res.data);
    } catch (error) {
      showMessage({ title: "categoriesの取得に失敗しました。", status: "error" });
    } finally {
      setloadingCategories(false);
    }
  };
  return {
    getAllCategories,
    categories,
    loadingCategories,
  };
};
export default useGetAllCategories;
