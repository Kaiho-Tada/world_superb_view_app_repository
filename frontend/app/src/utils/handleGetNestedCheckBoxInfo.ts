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
        allBooleanChecked: boolean[];
        allBooleanVisible: boolean[];
      }[],
      checkBoxItem
    ) => {
      const { parentLabel, checked, isVisible } = checkBoxItem;
      const existingGroup = acc.find((group) => group.parentLabel === parentLabel);

      if (existingGroup) {
        existingGroup.allBooleanChecked.push(checked);
        existingGroup.allBooleanVisible.push(isVisible);
      } else {
        acc.push({ parentLabel, allBooleanChecked: [checked], allBooleanVisible: [isVisible] });
      }
      return acc;
    },
    []
  );
  const checkBoxInfo = checkBoxItemGroups.map((checkBoxItemGroup) => {
    const allChecked = checkBoxItemGroup.allBooleanChecked.every(Boolean);
    const isIndeterminate = checkBoxItemGroup.allBooleanChecked.some(Boolean) && !allChecked;
    const allVisible = checkBoxItemGroup.allBooleanVisible.every(Boolean);
    return { allChecked, isIndeterminate, allVisible, parentLabel: checkBoxItemGroup.parentLabel };
  });
  return checkBoxInfo;
};

export default handleGetNestedCheckBoxInfo;
