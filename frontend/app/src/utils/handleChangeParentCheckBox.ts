import { ChangeEvent } from "react";
import { NestedCheckBoxItem } from "types/nestedCheckBoxItem";

const handleChangeParentCheckBox = ({
  e,
  checkBoxItems,
  checkBoxItemsDispatch,
  checkedLabelsDispatch,
}: {
  e: ChangeEvent<HTMLInputElement>;
  checkBoxItems: NestedCheckBoxItem[];
  checkBoxItemsDispatch: (newCheckBoxItems: NestedCheckBoxItem[]) => void;
  checkedLabelsDispatch: (newCheckedLabels: string[]) => void;
}) => {
  const newCheckBoxItems = checkBoxItems.map((originalCheckBoxItem) => {
    const checkBoxItem = { ...originalCheckBoxItem };
    if (e.target.value === checkBoxItem.parentLabel) {
      checkBoxItem.checked = e.target.checked;
    }
    return checkBoxItem;
  });
  checkBoxItemsDispatch(newCheckBoxItems);

  const checkedCheckBoxItems = newCheckBoxItems.filter(
    (newCheckBoxItem) => newCheckBoxItem.checked === true
  );

  const newCheckedLabels = checkedCheckBoxItems.map(
    (checkedCheckBoxItem) => checkedCheckBoxItem.label
  );
  checkedLabelsDispatch(newCheckedLabels);
};
export default handleChangeParentCheckBox;
