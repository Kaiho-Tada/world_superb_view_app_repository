import useMessage from "hooks/useMessage";
import getAllCountriesApi from "lib/api/country";
import { useState } from "react";
import { Country } from "types/api/country/country";
import { CountryCheckBoxItem } from "types/api/country/CountryCheckBoxItem";

const useGetCountryCheckBoxItems = () => {
  const [loadingCountryCheckBoxItems, setLoadingCountryCheckBoxItems] = useState(false);
  const [countryCheckBoxItems, setCountryCheckBoxItems] = useState<Array<CountryCheckBoxItem>>([]);

  const { showMessage } = useMessage();

  const getCountryCheckBoxItems = async () => {
    setLoadingCountryCheckBoxItems(true);
    try {
      const res = await getAllCountriesApi();
      const countries = res.data;
      const countriesWithCheckBox = countries.map((country: Country) => ({
        label: country.name,
        stateName: country.state.name,
        checked: false,
      }));
      setCountryCheckBoxItems(countriesWithCheckBox);
    } catch (error) {
      showMessage({ title: "countriesの取得に失敗しました。", status: "error" });
    } finally {
      setLoadingCountryCheckBoxItems(false);
    }
  };

  return {
    getCountryCheckBoxItems,
    countryCheckBoxItems,
    setCountryCheckBoxItems,
    loadingCountryCheckBoxItems,
  };
};
export default useGetCountryCheckBoxItems;
