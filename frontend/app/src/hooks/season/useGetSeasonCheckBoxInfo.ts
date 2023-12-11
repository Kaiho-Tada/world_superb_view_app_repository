import { useSuperbViewListContext } from "hooks/providers/SuperbViewListProvider";

const useGetSeasonCheckBoxInfo = () => {
  const handleGetSeasonCheckBoxInfo = (season: string) => {
    const { monthCheckBoxItems } = useSuperbViewListContext();

    if (season === "春") {
      const filteredCheckedItems = monthCheckBoxItems.filter((item) => item.season === "春");
      const checkedItemBooleans = filteredCheckedItems.map((checkedItem) => checkedItem.checked);
      const allChecked = checkedItemBooleans.every(Boolean);
      const isIndeterminate = checkedItemBooleans.some(Boolean) && !allChecked;
      return { allChecked, isIndeterminate, label: "春" };
    }
    if (season === "夏") {
      const filteredCheckedItems = monthCheckBoxItems.filter((item) => item.season === "夏");
      const checkedItemBooleans = filteredCheckedItems.map((checkedItem) => checkedItem.checked);
      const allChecked = checkedItemBooleans.every(Boolean);
      const isIndeterminate = checkedItemBooleans.some(Boolean) && !allChecked;
      return { allChecked, isIndeterminate, label: "夏" };
    }
    if (season === "秋") {
      const filteredCheckedItems = monthCheckBoxItems.filter((item) => item.season === "秋");
      const checkedItemBooleans = filteredCheckedItems.map((checkedItem) => checkedItem.checked);
      const allChecked = checkedItemBooleans.every(Boolean);
      const isIndeterminate = checkedItemBooleans.some(Boolean) && !allChecked;
      return { allChecked, isIndeterminate, label: "秋" };
    }
    const filteredCheckedItems = monthCheckBoxItems.filter((item) => item.season === "冬");
    const checkedItemBooleans = filteredCheckedItems.map((checkedItem) => checkedItem.checked);
    const allChecked = checkedItemBooleans.every(Boolean);
    const isIndeterminate = checkedItemBooleans.some(Boolean) && !allChecked;
    return { allChecked, isIndeterminate, label: "冬" };
  };
  return { handleGetSeasonCheckBoxInfo };
};

export default useGetSeasonCheckBoxInfo;
