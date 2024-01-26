import { CheckBoxItem } from "types/checkBoxItem";

type Props<T> = {
  checkBoxItems: T[];
  checkBoxItemsDispatch: (clearedCheckBoxItems: T[]) => void;
};
const handleClearCheckBox = <T extends CheckBoxItem>({
  checkBoxItems,
  checkBoxItemsDispatch,
}: Props<T>) => {
  const clearedCheckBoxItems = checkBoxItems.map((originalCheckBoxItem) => {
    const checkBoxItem = { ...originalCheckBoxItem };
    if (checkBoxItem.checked === true) {
      checkBoxItem.checked = !checkBoxItem.checked;
    }
    return checkBoxItem;
  });
  checkBoxItemsDispatch(clearedCheckBoxItems);
};

export default handleClearCheckBox;
