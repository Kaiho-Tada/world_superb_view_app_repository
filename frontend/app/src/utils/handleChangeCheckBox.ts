import { ChangeEvent } from "react";
import CheckItem from "types/checkItem";

const handleChangeCheckBox = <T extends CheckItem[]>({
  e,
  checkBoxItems,
  checkBoxItemsDispatch,
}: {
  e: ChangeEvent<HTMLInputElement>;
  checkBoxItems: T;
  checkBoxItemsDispatch: (newCheckBoxItems: T) => void;
}) => {
  const newCheckBoxItems = checkBoxItems.map((originalCheckBoxItem) => {
    const checkBoxItem = { ...originalCheckBoxItem };
    if (checkBoxItem.label === e.target.value) {
      checkBoxItem.checked = !checkBoxItem.checked;
    }
    return checkBoxItem;
  });
  checkBoxItemsDispatch(newCheckBoxItems as T);
};
export default handleChangeCheckBox;
