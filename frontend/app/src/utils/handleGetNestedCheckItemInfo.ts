import { NestedCheckItem } from "types/nestedCheckItem";

const handleGetNestedCheckItemInfo = ({ checkItems }: { checkItems: NestedCheckItem[] }) => {
  const checkItemGroups = checkItems.reduce(
    (
      acc: {
        parentLabel: string;
        allBooleanChecked: boolean[];
        allBooleanVisible: boolean[];
      }[],
      checkItem
    ) => {
      const { parentLabel, checked, isVisible } = checkItem;
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
  const checkBoxInfo = checkItemGroups.map((checkItemGroup) => {
    const allChecked = checkItemGroup.allBooleanChecked.every(Boolean);
    const isIndeterminate = checkItemGroup.allBooleanChecked.some(Boolean) && !allChecked;
    const allVisible = checkItemGroup.allBooleanVisible.every(Boolean);
    return { allChecked, isIndeterminate, allVisible, parentLabel: checkItemGroup.parentLabel };
  });
  return checkBoxInfo;
};

export default handleGetNestedCheckItemInfo;
