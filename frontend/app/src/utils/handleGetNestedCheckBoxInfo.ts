import { NestedCheckBoxItem } from "types/nestedCheckBoxItem";

const handleGetNestedCheckBoxInfo = ({
  checkBoxItems,
}: {
  checkBoxItems: NestedCheckBoxItem[];
}) => {
  const checkBoxItemGroups = checkBoxItems.reduce(
    (
      acc: {
        parentLabel: string;
        checkItems: { checked: boolean }[];
        allBooleanVisible: boolean[];
      }[],
      checkBoxItem
    ) => {
      const { parentLabel, checked, isVisible } = checkBoxItem;
      const existingGroup = acc.find((group) => group.parentLabel === parentLabel);

      if (existingGroup) {
        existingGroup.checkItems.push({ checked });
        existingGroup.allBooleanVisible.push(isVisible);
      } else {
        acc.push({ parentLabel, checkItems: [{ checked }], allBooleanVisible: [isVisible] });
      }
      return acc;
    },
    []
  );
  const checkBoxInfo = checkBoxItemGroups.map((checkBoxItemGroup) => {
    const checkedItemBooleans = checkBoxItemGroup.checkItems.map((checkItem) => checkItem.checked);

    const allChecked = checkedItemBooleans.every(Boolean);
    const isIndeterminate = checkedItemBooleans.some(Boolean) && !allChecked;
    const allVisible = checkBoxItemGroup.allBooleanVisible.every(Boolean);
    return { allChecked, isIndeterminate, allVisible, parentLabel: checkBoxItemGroup.parentLabel };
  });
  return checkBoxInfo;
};

export default handleGetNestedCheckBoxInfo;
