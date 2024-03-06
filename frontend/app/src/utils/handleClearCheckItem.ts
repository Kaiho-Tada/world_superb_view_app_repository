import CheckItem from "types/checkItem";

type Props<T> = {
  checkItems: T[];
  checkItemsDispatch: (clearedCheckItems: T[]) => void;
};
const handleClearCheckItem = <T extends CheckItem>({
  checkItems,
  checkItemsDispatch,
}: Props<T>) => {
  const clearedCheckItems = checkItems.map((originalCheckItem) => {
    const checkItem = { ...originalCheckItem };
    if (checkItem.checked === true) {
      checkItem.checked = !checkItem.checked;
    }
    return checkItem;
  });
  checkItemsDispatch(clearedCheckItems);
};

export default handleClearCheckItem;
