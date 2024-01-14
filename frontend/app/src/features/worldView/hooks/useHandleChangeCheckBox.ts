import { ChangeEvent } from "react";

type CheckBoxItem = {
  label: string;
  checked: boolean;
};

const useHandleChangeCheckBox = () => {
  const handleChangeCheckBox = <T extends CheckBoxItem[]>({
    e,
    checkBoxItems,
    checkBoxItemsDispatch,
    checkedLabelsDispatch,
  }: {
    e: ChangeEvent<HTMLInputElement>;
    checkBoxItems: T;
    checkBoxItemsDispatch: (newCheckBoxItems: T) => void;
    checkedLabelsDispatch: (newCheckedLabels: string[]) => void;
  }) => {
    const newCheckBoxItems = checkBoxItems.map((originalCheckBoxItem) => {
      const checkBoxItem = { ...originalCheckBoxItem };
      if (checkBoxItem.label === e.target.value) {
        checkBoxItem.checked = !checkBoxItem.checked;
      }
      return checkBoxItem;
    });
    checkBoxItemsDispatch(newCheckBoxItems as T);

    const checkedCheckBoxItems = newCheckBoxItems.filter(
      (newCheckBoxItem) => newCheckBoxItem.checked === true
    );
    const newCheckedLabels = checkedCheckBoxItems.map(
      (checkedCheckBoxItem) => checkedCheckBoxItem.label
    );
    checkedLabelsDispatch(newCheckedLabels);
  };

  return { handleChangeCheckBox };
};

export default useHandleChangeCheckBox;
