import { ChangeEvent } from "react";
import { NestedCheckBoxItem } from "types/nestedCheckBoxItem";

const handleChangeVisibility = ({
  e,
  checkBoxItems,
  checkBoxItemsDispatch,
}: {
  e: ChangeEvent<HTMLInputElement>;
  checkBoxItems: NestedCheckBoxItem[];
  checkBoxItemsDispatch: (newCheckBoxItems: NestedCheckBoxItem[]) => void;
}) => {
  const newCheckBoxItems = checkBoxItems.map((originalCheckBoxItem) => {
    const checkBoxItem = { ...originalCheckBoxItem };
    if (e.target.value === checkBoxItem.parentLabel) {
      checkBoxItem.isVisible = e.target.checked;
    }
    return checkBoxItem;
  });
  checkBoxItemsDispatch(newCheckBoxItems);
};

export default handleChangeVisibility;
