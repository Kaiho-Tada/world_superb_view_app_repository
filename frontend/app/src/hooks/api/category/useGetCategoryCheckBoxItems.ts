import { useWorldViewListContext } from "hooks/providers/WorldViewListProvider";
import useMessage from "hooks/useMessage";
import getAllCategoriesApi from "lib/api/categoryApi";
import { Category } from "types/api/category/category";

const useGetCategoryCheckBoxItems = () => {
  const { dispatch } = useWorldViewListContext();
  const { showMessage } = useMessage();

  const getCategoryCheckBoxItems = async () => {
    dispatch({ type: "SET_LOADING_CATEGORY_CHECKBOX_ITEMS", payload: true });
    try {
      const res = await getAllCategoriesApi();
      const categories = res.data;
      const newCategoryCheckBoxItems = categories.map((category: Category) => ({
        label: category.name,
        classification: category.classification,
        checked: false,
      }));
      dispatch({ type: "SET_CATEGORY_CHECKBOX_ITEMS", payload: newCategoryCheckBoxItems });
    } catch (error) {
      showMessage({ title: "categoriesの取得に失敗しました。", status: "error" });
    } finally {
      dispatch({ type: "SET_LOADING_CATEGORY_CHECKBOX_ITEMS", payload: false });
    }
  };
  return {
    getCategoryCheckBoxItems,
  };
};

export default useGetCategoryCheckBoxItems;
