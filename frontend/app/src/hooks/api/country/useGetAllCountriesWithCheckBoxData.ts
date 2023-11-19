import useMessage from "hooks/useMessage";
import getAllCountriesApi from "lib/api/country";
import { useState } from "react";
import { Country } from "types/api/country/country";
import { CountryWithCheckBoxData } from "types/api/country/countryWithCheckBoxData";

const useGetAllCountriesWithCheckBoxData = () => {
  const [loadingCountriesWithCheckBoxData, setloadingCountriesWithCheckBoxData] = useState(false);
  const [countriesWithCheckBoxData, setCountriesWithCheckBoxData] = useState<
    Array<CountryWithCheckBoxData>
  >([]);
  const { showMessage } = useMessage();

  const getAllCountriesWithCheckBoxData = async () => {
    setloadingCountriesWithCheckBoxData(true);
    try {
      const res = await getAllCountriesApi();
      const countries = res.data;
      const countriesWithCheckBox = countries.map((country: Country) => ({
        label: country.name,
        stateName: country.state.name,
        superbViewNames: country.superbViews.map((superbView) => superbView.name),
        checked: false,
      }));
      setCountriesWithCheckBoxData(countriesWithCheckBox);
    } catch (error) {
      showMessage({ title: "countriesの取得に失敗しました。", status: "error" });
    } finally {
      setloadingCountriesWithCheckBoxData(false);
    }
  };

  return {
    getAllCountriesWithCheckBoxData,
    countriesWithCheckBoxData,
    setCountriesWithCheckBoxData,
    loadingCountriesWithCheckBoxData,
  };
};
export default useGetAllCountriesWithCheckBoxData;
