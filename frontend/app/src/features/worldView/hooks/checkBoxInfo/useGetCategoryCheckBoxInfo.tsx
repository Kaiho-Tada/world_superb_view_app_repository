import { useWorldViewListContext } from "providers/WorldViewListProvider";

const useGetCategoryCheckBoxInfo = () => {
  const handleGetCategoryCheckBoxInfo = (classification: string) => {
    const { state } = useWorldViewListContext();

    if (classification === "自然") {
      const filteredCheckedItems = state.categoryCheckBoxItems.filter(
        (item) => item.classification === "自然"
      );
      const checkedItemBooleans = filteredCheckedItems.map((checkedItem) => checkedItem.checked);
      const allChecked = checkedItemBooleans.every(Boolean);
      const isIndeterminate = checkedItemBooleans.some(Boolean) && !allChecked;
      return { allChecked, isIndeterminate, label: "自然" };
    }
    const filteredCheckedItems = state.categoryCheckBoxItems.filter(
      (item) => item.classification === "人工"
    );
    const checkedItemBooleans = filteredCheckedItems.map((checkedItem) => checkedItem.checked);
    const allChecked = checkedItemBooleans.every(Boolean);
    const isIndeterminate = checkedItemBooleans.some(Boolean) && !allChecked;
    return { allChecked, isIndeterminate, label: "人工" };
  };
  return { handleGetCategoryCheckBoxInfo };
};
export default useGetCategoryCheckBoxInfo;
