import { useWorldViewListContext } from "hooks/providers/WorldViewListProvider";
import useMessage from "hooks/useMessage";
import getAllCountriesApi from "lib/api/country";
import { Country } from "types/api/country/country";

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
        stateName: country.state.name,
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
