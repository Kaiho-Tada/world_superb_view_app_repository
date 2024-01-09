import { useWorldViewListContext } from "providers/WorldViewListProvider";
import { ChangeEvent, useCallback } from "react";

const useCountryHandleChange = () => {
  const { state, dispatch } = useWorldViewListContext();

  const handleChangeState = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const newCheckBoxItems = state.countryCheckBoxItems.map((originalCheckBoxItem) => {
        const checkBoxItem = { ...originalCheckBoxItem };
        if (e.target.value === checkBoxItem.stateName) {
          checkBoxItem.checked = e.target.checked;
        }
        return checkBoxItem;
      });
      dispatch({ type: "SET_COUNTRY_CHECKBOX_ITEMS", payload: newCheckBoxItems });

      const checkedCheckBoxItems = newCheckBoxItems.filter(
        (newCheckBoxItem) => newCheckBoxItem.checked === true
      );
      const newCheckBoxItemLabels = checkedCheckBoxItems.map(
        (checkedCheckBoxItem) => checkedCheckBoxItem.label
      );
      dispatch({ type: "SET_CHECKED_COUNTRY_LABELS", payload: newCheckBoxItemLabels });
    },
    [state.countryCheckBoxItems]
  );

  const handleChangeCountry = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const newCountryCheckBoxItems = state.countryCheckBoxItems.map(
        (originalCountryCheckBoxItem) => {
          const countryCheckBoxItem = { ...originalCountryCheckBoxItem };
          if (countryCheckBoxItem.label === e.target.value) {
            countryCheckBoxItem.checked = !countryCheckBoxItem.checked;
          }
          return countryCheckBoxItem;
        }
      );
      dispatch({ type: "SET_COUNTRY_CHECKBOX_ITEMS", payload: newCountryCheckBoxItems });

      const checkedCountryCheckBoxItems = newCountryCheckBoxItems.filter(
        (newCountryCheckBoxItem) => newCountryCheckBoxItem.checked === true
      );
      const newCheckedCountryLabels = checkedCountryCheckBoxItems.map(
        (checkedCountryCheckBoxItem) => checkedCountryCheckBoxItem.label
      );
      dispatch({ type: "SET_CHECKED_COUNTRY_LABELS", payload: newCheckedCountryLabels });
    },
    [state.countryCheckBoxItems]
  );
  return { handleChangeState, handleChangeCountry };
};
export default useCountryHandleChange;
