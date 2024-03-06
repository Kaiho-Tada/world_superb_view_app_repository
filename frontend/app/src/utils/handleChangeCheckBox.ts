import { ChangeEvent } from "react";
import CheckItem from "types/checkItem";

const handleChangeCheckBox = <T extends CheckItem[]>({
  e,
  checkItems,
  checkItemsDispatch,
}: {
  e: ChangeEvent<HTMLInputElement>;
  checkItems: T;
  checkItemsDispatch: (newCheckBoxItems: T) => void;
}) => {
  const newCheckItems = checkItems.map((originalCheckItem) => {
    const checkItem = { ...originalCheckItem };
    if (checkItem.label === e.target.value) {
      checkItem.checked = !checkItem.checked;
    }
    return checkItem;
  });
  checkItemsDispatch(newCheckItems as T);
};
export default handleChangeCheckBox;
