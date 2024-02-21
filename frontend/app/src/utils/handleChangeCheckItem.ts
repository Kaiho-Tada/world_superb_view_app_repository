import { MouseEvent } from "react";
import CheckItem from "types/checkItem";

interface Props {
  e: MouseEvent<HTMLDivElement>;
  checkItems: CheckItem[];
  checkItemsDispatch: (responseData: CheckItem[]) => void;
}

const handleChangeCheckItem = ({ e, checkItems, checkItemsDispatch }: Props) => {
  const clickedElement = e.target as HTMLElement;
  const itemLabel = clickedElement.textContent;
  const newCheckItems = checkItems.map((originalCheckItem) => {
    const checkItem = { ...originalCheckItem };
    if (checkItem.label === itemLabel) {
      checkItem.checked = !checkItem.checked;
    }
    return checkItem;
  });
  checkItemsDispatch(newCheckItems);
};

export default handleChangeCheckItem;
