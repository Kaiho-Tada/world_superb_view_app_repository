import getAllCountriesApi from "features/worldView/api/countryApi";
import { Country } from "features/worldView/types/api/country";
import useMessage from "hooks/useMessage";
import { useWorldViewListContext } from "providers/WorldViewListProvider";

const useGetCountryCheckBoxItems = () => {
  const { dispatch } = useWorldViewListContext();
  const { showMessage } = useMessage();

  const getCountryCheckBoxItems = async () => {
    dispatch({ type: "SET_LOADING_COUNTRY_CHECKBOX_ITEMS", payload: true });
    try {
      const res = await getAllCountriesApi();
      const countries = res.data;
      const countriesWithCheckBox = countries.map((country: Country) => ({
        label: country.name,
        parentLabel: country.state.name,
        checked: false,
      }));
      dispatch({ type: "SET_COUNTRY_CHECKBOX_ITEMS", payload: countriesWithCheckBox });
    } catch (error) {
      showMessage({ title: "countriesの取得に失敗しました。", status: "error" });
    } finally {
      dispatch({ type: "SET_LOADING_COUNTRY_CHECKBOX_ITEMS", payload: false });
    }
  };
  return {
    getCountryCheckBoxItems,
  };
};
export default useGetCountryCheckBoxItems;
