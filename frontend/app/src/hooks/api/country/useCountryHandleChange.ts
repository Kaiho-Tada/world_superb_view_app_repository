import { useSuperbViewListContext } from "hooks/providers/SuperbViewListProvider";
import { ChangeEvent, useCallback } from "react";

const useCountryHandleChange = () => {
  const { countryCheckBoxItems, setCountryCheckBoxItems, setCheckedCountryLabels } =
    useSuperbViewListContext();

  const handleChangeState = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const newCheckBoxItems = countryCheckBoxItems.map((originalCheckBoxItem) => {
        const checkBoxItem = { ...originalCheckBoxItem };
        if (e.target.value === checkBoxItem.stateName) {
          checkBoxItem.checked = e.target.checked;
        }
        return checkBoxItem;
      });
      setCountryCheckBoxItems(newCheckBoxItems);

      const checkedCheckBoxItems = newCheckBoxItems.filter(
        (newCheckBoxItem) => newCheckBoxItem.checked === true
      );

      const newCheckBoxItemLabels = checkedCheckBoxItems.map(
        (checkedCheckBoxItem) => checkedCheckBoxItem.label
      );
      setCheckedCountryLabels(newCheckBoxItemLabels);
    },
    [countryCheckBoxItems]
  );

  const handleChangeCountry = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const newCountryCheckBoxItems = countryCheckBoxItems.map((originalCountryCheckBoxItem) => {
        const countryCheckBoxItem = { ...originalCountryCheckBoxItem };
        if (countryCheckBoxItem.label === e.target.value) {
          countryCheckBoxItem.checked = !countryCheckBoxItem.checked;
        }
        return countryCheckBoxItem;
      });
      setCountryCheckBoxItems(newCountryCheckBoxItems);

      const checkedCountryCheckBoxItems = newCountryCheckBoxItems.filter(
        (newCountryCheckBoxItem) => newCountryCheckBoxItem.checked === true
      );

      const newCheckedCountryLabels = checkedCountryCheckBoxItems.map(
        (checkedCountryCheckBoxItem) => checkedCountryCheckBoxItem.label
      );
      setCheckedCountryLabels(newCheckedCountryLabels);
    },
    [countryCheckBoxItems]
  );
  return { handleChangeState, handleChangeCountry };
};
export default useCountryHandleChange;
