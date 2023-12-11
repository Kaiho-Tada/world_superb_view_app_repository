import { useSuperbViewListContext } from "hooks/providers/SuperbViewListProvider";
import { ChangeEvent } from "react";

const useSeasonHandleChange = () => {
  const { monthCheckBoxItems, setMonthCheckBoxItems, setCheckedMonthLabels } =
    useSuperbViewListContext();

  const handleChangeSeason = (e: ChangeEvent<HTMLInputElement>) => {
    const newCheckBoxItems = monthCheckBoxItems.map((originalCheckBoxItem) => {
      const checkBoxItem = { ...originalCheckBoxItem };
      if (e.target.value === checkBoxItem.season) {
        checkBoxItem.checked = e.target.checked;
      }
      return checkBoxItem;
    });
    setMonthCheckBoxItems(newCheckBoxItems);

    const checkedCheckBoxItems = newCheckBoxItems.filter(
      (newCheckBoxItem) => newCheckBoxItem.checked === true
    );

    const newCheckBoxItemLabels = checkedCheckBoxItems.map(
      (checkedCheckBoxItem) => checkedCheckBoxItem.label
    );
    setCheckedMonthLabels(newCheckBoxItemLabels);
  };

  const handleChangeMonth = (e: ChangeEvent<HTMLInputElement>) => {
    const newCheckBoxItems = monthCheckBoxItems.map((originalcheckBoxItem) => {
      const checkBoxItem = { ...originalcheckBoxItem };
      if (checkBoxItem.label === e.target.value) {
        checkBoxItem.checked = !checkBoxItem.checked;
      }
      return checkBoxItem;
    });
    setMonthCheckBoxItems(newCheckBoxItems);
    const checkedCheckBoxItems = newCheckBoxItems.filter(
      (newCheckBoxItem) => newCheckBoxItem.checked === true
    );

    const newCheckBoxItemLabels = checkedCheckBoxItems.map(
      (checkedCheckBoxItem) => checkedCheckBoxItem.label
    );
    setCheckedMonthLabels(newCheckBoxItemLabels);
  };
  return { handleChangeSeason, handleChangeMonth };
};

export default useSeasonHandleChange;
