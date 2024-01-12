type CheckBoxItem = {
  label: string;
  checked: boolean;
  classification?: string;
  stateName?: string;
  season?: string;
};
const useGetCheckBoxInfo = () => {
  const handleGetCheckBoxInfo = ({
    parent,
    checkBoxItems,
  }: {
    parent: string;
    checkBoxItems: CheckBoxItem[];
  }) => {
    const filteredCheckedItems = checkBoxItems.filter(
      (item) =>
        (item.classification && item.classification === parent) ||
        (item.stateName && item.stateName === parent) ||
        (item.season && item.season === parent)
    );

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
