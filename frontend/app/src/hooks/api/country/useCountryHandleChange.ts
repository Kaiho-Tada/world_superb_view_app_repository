import { useSuperbViewListContext } from "hooks/providers/SuperbViewListProvider";
import { ChangeEvent, useCallback } from "react";

const useCountryHandleChange = () => {
  const { countriesWithCheckBoxData, setCountriesWithCheckBoxData, setCheckedCountryLabels } =
    useSuperbViewListContext();

  const handleChangeCountry = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const newCountriesWithCheckBoxData = countriesWithCheckBoxData.map(
        (originalCountryWithCheckBoxData) => {
          const CountryWithCheckBoxData = { ...originalCountryWithCheckBoxData };
          if (CountryWithCheckBoxData.label === e.target.value) {
            CountryWithCheckBoxData.checked = !CountryWithCheckBoxData.checked;
          }
          return CountryWithCheckBoxData;
        }
      );
      setCountriesWithCheckBoxData(newCountriesWithCheckBoxData);

      const checkedCountriesWithCheckBoxData = newCountriesWithCheckBoxData.filter(
        (newCountryWithCheckBoxData) => newCountryWithCheckBoxData.checked === true
      );

      const newCheckedCountryLabels = checkedCountriesWithCheckBoxData.map(
        (checkedCountryWithCheckBoxData) => checkedCountryWithCheckBoxData.label
      );
      setCheckedCountryLabels(newCheckedCountryLabels);
    },
    [countriesWithCheckBoxData]
  );
  return { handleChangeCountry };
};
export default useCountryHandleChange;
