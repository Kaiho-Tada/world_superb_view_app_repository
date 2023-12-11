import { useSuperbViewListContext } from "hooks/providers/SuperbViewListProvider";
import { ChangeEvent, useCallback } from "react";

const useCountryHandleChange = () => {
  const { countryCheckBoxItems, setCountryCheckBoxItems, setCheckedCountryLabels } =
    useSuperbViewListContext();

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
  return { handleChangeCountry };
};
export default useCountryHandleChange;
