import { useWorldViewListContext } from "hooks/providers/WorldViewListProvider";
import { ChangeEvent, useCallback } from "react";

const useBmiHandleChange = () => {
  const { bmiCheckBoxItems, setBmiCheckBoxItems, setCheckedBmiLabels } = useWorldViewListContext();
  const handleChangeBmi = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const newCheckBoxItems = bmiCheckBoxItems.map((originalCheckBoxIems) => {
        const checkBoxIem = { ...originalCheckBoxIems };
        if (checkBoxIem.label === e.target.value) {
          checkBoxIem.checked = !checkBoxIem.checked;
        }
        return checkBoxIem;
      });
      setBmiCheckBoxItems(newCheckBoxItems);

      const checkedCheckBoxItems = newCheckBoxItems.filter(
        (newCheckBoxItem) => newCheckBoxItem.checked === true
      );

      const newCheckedBmiLabels = checkedCheckBoxItems.map(
        (checkedCheckBoxItem) => checkedCheckBoxItem.label
      );
      setCheckedBmiLabels(newCheckedBmiLabels);
    },
    [bmiCheckBoxItems]
  );

  return { handleChangeBmi };
};

export default useBmiHandleChange;
