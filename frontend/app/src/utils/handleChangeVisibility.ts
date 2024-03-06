import { ChangeEvent } from "react";
import { NestedCheckItem } from "types/nestedCheckItem";

const handleChangeVisibility = ({
  e,
  checkItems,
  checkItemsDispatch,
}: {
  e: ChangeEvent<HTMLInputElement>;
  checkItems: NestedCheckItem[];
  checkItemsDispatch: (newCheckBoxItems: NestedCheckItem[]) => void;
}) => {
  const newCheckItems = checkItems.map((originalCheckItem) => {
    const checkItem = { ...originalCheckItem };
    if (e.target.value === checkItem.parentLabel) {
      checkItem.isVisible = e.target.checked;
    }
    return checkItem;
  });
  checkItemsDispatch(newCheckItems);
};

export default handleChangeVisibility;
