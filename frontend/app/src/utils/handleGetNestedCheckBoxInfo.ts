import { NestedCheckBoxItem } from "types/nestedCheckBoxItem";

const handleGetNestedCheckBoxInfo = ({
  checkBoxItems,
}: {
  checkBoxItems: NestedCheckBoxItem[];
}) => {
  const checkBoxItemGroups = checkBoxItems.reduce(
    (acc: { parentLabel: string; checkItems: { checked: boolean }[] }[], checkBoxItem) => {
      const { parentLabel, checked } = checkBoxItem;
      const existingGroup = acc.find((group) => group.parentLabel === parentLabel);

      if (existingGroup) {
        existingGroup.checkItems.push({ checked });
      } else {
        acc.push({ parentLabel, checkItems: [{ checked }] });
      }
      return acc;
    },
    []
  );
  const checkBoxInfo = checkBoxItemGroups.map((checkBoxItemGroup) => {
    const checkedItemBooleans = checkBoxItemGroup.checkItems.map((checkItem) => checkItem.checked);
    const allChecked = checkedItemBooleans.every(Boolean);
    const isIndeterminate = checkedItemBooleans.some(Boolean) && !allChecked;
    return { allChecked, isIndeterminate, parentLabel: checkBoxItemGroup.parentLabel };
  });
  return checkBoxInfo;
};

export default handleGetNestedCheckBoxInfo;
