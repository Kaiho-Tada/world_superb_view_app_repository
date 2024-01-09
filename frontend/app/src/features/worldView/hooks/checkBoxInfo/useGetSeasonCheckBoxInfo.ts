import { useWorldViewListContext } from "providers/WorldViewListProvider";

const useGetSeasonCheckBoxInfo = () => {
  const handleGetSeasonCheckBoxInfo = (season: string) => {
    const { state } = useWorldViewListContext();

    if (season === "春") {
      const filteredCheckedItems = state.monthCheckBoxItems.filter((item) => item.season === "春");
      const checkedItemBooleans = filteredCheckedItems.map((checkedItem) => checkedItem.checked);
      const allChecked = checkedItemBooleans.every(Boolean);
      const isIndeterminate = checkedItemBooleans.some(Boolean) && !allChecked;
      return { allChecked, isIndeterminate, label: "春" };
    }
    if (season === "夏") {
      const filteredCheckedItems = state.monthCheckBoxItems.filter((item) => item.season === "夏");
      const checkedItemBooleans = filteredCheckedItems.map((checkedItem) => checkedItem.checked);
      const allChecked = checkedItemBooleans.every(Boolean);
      const isIndeterminate = checkedItemBooleans.some(Boolean) && !allChecked;
      return { allChecked, isIndeterminate, label: "夏" };
    }
    if (season === "秋") {
      const filteredCheckedItems = state.monthCheckBoxItems.filter((item) => item.season === "秋");
      const checkedItemBooleans = filteredCheckedItems.map((checkedItem) => checkedItem.checked);
      const allChecked = checkedItemBooleans.every(Boolean);
      const isIndeterminate = checkedItemBooleans.some(Boolean) && !allChecked;
      return { allChecked, isIndeterminate, label: "秋" };
    }
    const filteredCheckedItems = state.monthCheckBoxItems.filter((item) => item.season === "冬");
    const checkedItemBooleans = filteredCheckedItems.map((checkedItem) => checkedItem.checked);
    const allChecked = checkedItemBooleans.every(Boolean);
    const isIndeterminate = checkedItemBooleans.some(Boolean) && !allChecked;
    return { allChecked, isIndeterminate, label: "冬" };
  };
  return { handleGetSeasonCheckBoxInfo };
};

export default useGetSeasonCheckBoxInfo;
