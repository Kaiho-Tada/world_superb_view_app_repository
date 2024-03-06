import { ChangeEvent } from "react";
import { NestedCheckItem } from "types/nestedCheckItem";

const handleChangeParentCheckBox = ({
  e,
  checkItems,
  checkItemsDispatch,
}: {
  e: ChangeEvent<HTMLInputElement>;
  checkItems: NestedCheckItem[];
  checkItemsDispatch: (newCheckBoxItems: NestedCheckItem[]) => void;
}) => {
  const newCheckItems = checkItems.map((originalCheckItem: NestedCheckItem) => {
    const checkItem = { ...originalCheckItem };
    if (e.target.value === checkItem.parentLabel) {
      checkItem.checked = e.target.checked;
    }
    return checkItem;
  });
  checkItemsDispatch(newCheckItems);
};
export default handleChangeParentCheckBox;
