import { NestedCheckBoxItem } from "types/nestedCheckBoxItem";

const useGetCheckBoxInfo = () => {
  const handleGetCheckBoxInfo = ({
    parentLabel,
    checkBoxItems,
  }: {
    parentLabel: string;
    checkBoxItems: NestedCheckBoxItem[];
  }) => {
    const filteredCheckedItems = checkBoxItems.filter((item) => item.parentLabel === parentLabel);

    if (checkBoxItems.length && !filteredCheckedItems.length) {
      throw new Error(`${parentLabel}プロパティは引数のcheckBoxItemsに存在しません`);
    }
    const checkedItemBooleans = filteredCheckedItems.map((checkedItem) => checkedItem.checked);
    const allChecked = checkedItemBooleans.every(Boolean);
    const isIndeterminate = checkedItemBooleans.some(Boolean) && !allChecked;
    return { allChecked, isIndeterminate, label: parentLabel };
  };
  return { handleGetCheckBoxInfo };
};
export default useGetCheckBoxInfo;
