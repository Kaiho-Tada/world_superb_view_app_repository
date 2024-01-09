import { useWorldViewListContext } from "providers/WorldViewListProvider";

const useGetCountryCheckBoxInfo = () => {
  const handleGetCountryCheckBoxInfo = (classification: string) => {
    const { state } = useWorldViewListContext();

    if (classification === "アジア") {
      const filteredCheckedItems = state.countryCheckBoxItems.filter(
        (item) => item.stateName === "アジア"
      );
      const checkedItemBooleans = filteredCheckedItems.map((checkedItem) => checkedItem.checked);
      const allChecked = checkedItemBooleans.every(Boolean);
      const isIndeterminate = checkedItemBooleans.some(Boolean) && !allChecked;
      return { allChecked, isIndeterminate, label: "アジア" };
    }
    if (classification === "大洋州") {
      const filteredCheckedItems = state.countryCheckBoxItems.filter(
        (item) => item.stateName === "大洋州"
      );
      const checkedItemBooleans = filteredCheckedItems.map((checkedItem) => checkedItem.checked);
      const allChecked = checkedItemBooleans.every(Boolean);
      const isIndeterminate = checkedItemBooleans.some(Boolean) && !allChecked;
      return { allChecked, isIndeterminate, label: "大洋州" };
    }
    if (classification === "北米") {
      const filteredCheckedItems = state.countryCheckBoxItems.filter(
        (item) => item.stateName === "北米"
      );
      const checkedItemBooleans = filteredCheckedItems.map((checkedItem) => checkedItem.checked);
      const allChecked = checkedItemBooleans.every(Boolean);
      const isIndeterminate = checkedItemBooleans.some(Boolean) && !allChecked;
      return { allChecked, isIndeterminate, label: "北米" };
    }
    if (classification === "中南米") {
      const filteredCheckedItems = state.countryCheckBoxItems.filter(
        (item) => item.stateName === "中南米"
      );
      const checkedItemBooleans = filteredCheckedItems.map((checkedItem) => checkedItem.checked);
      const allChecked = checkedItemBooleans.every(Boolean);
      const isIndeterminate = checkedItemBooleans.some(Boolean) && !allChecked;
      return { allChecked, isIndeterminate, label: "中南米" };
    }
    if (classification === "ヨーロッパ") {
      const filteredCheckedItems = state.countryCheckBoxItems.filter(
        (item) => item.stateName === "ヨーロッパ"
      );
      const checkedItemBooleans = filteredCheckedItems.map((checkedItem) => checkedItem.checked);
      const allChecked = checkedItemBooleans.every(Boolean);
      const isIndeterminate = checkedItemBooleans.some(Boolean) && !allChecked;
      return { allChecked, isIndeterminate, label: "ヨーロッパ" };
    }
    if (classification === "中東") {
      const filteredCheckedItems = state.countryCheckBoxItems.filter(
        (item) => item.stateName === "中東"
      );
      const checkedItemBooleans = filteredCheckedItems.map((checkedItem) => checkedItem.checked);
      const allChecked = checkedItemBooleans.every(Boolean);
      const isIndeterminate = checkedItemBooleans.some(Boolean) && !allChecked;
      return { allChecked, isIndeterminate, label: "中東" };
    }
    const filteredCheckedItems = state.countryCheckBoxItems.filter(
      (item) => item.stateName === "アフリカ"
    );
    const checkedItemBooleans = filteredCheckedItems.map((checkedItem) => checkedItem.checked);
    const allChecked = checkedItemBooleans.every(Boolean);
    const isIndeterminate = checkedItemBooleans.some(Boolean) && !allChecked;
    return { allChecked, isIndeterminate, label: "アフリカ" };
  };
  return { handleGetCountryCheckBoxInfo };
};
export default useGetCountryCheckBoxInfo;
