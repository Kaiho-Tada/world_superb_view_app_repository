import { NestedCheckBoxItem } from "types/nestedCheckBoxItem";

const useGetCheckBoxInfo = () => {
  const handleGetCheckBoxInfo = ({
    parent,
    checkBoxItems,
  }: {
    parent: string;
    checkBoxItems: NestedCheckBoxItem[];
  }) => {
    const filteredCheckedItems = checkBoxItems.filter((item) => item.parentLabel === parent);

    if (checkBoxItems.length && !filteredCheckedItems.length) {
      throw new Error(`${parent}プロパティは引数のcheckBoxItemsに存在しません`);
    }
    const checkedItemBooleans = filteredCheckedItems.map((checkedItem) => checkedItem.checked);
    const allChecked = checkedItemBooleans.every(Boolean);
    const isIndeterminate = checkedItemBooleans.some(Boolean) && !allChecked;
    return { allChecked, isIndeterminate, label: parent };
  };
  return { handleGetCheckBoxInfo };
};
export default useGetCheckBoxInfo;
