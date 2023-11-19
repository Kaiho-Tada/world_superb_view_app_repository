import useMessage from "hooks/useMessage";
import getAllCountriesApi from "lib/api/country";
import { useState } from "react";
import { Country } from "types/api/country/country";

const useGetAllCountries = () => {
  const [loadingCountries, setloadingCountries] = useState(false);
  const [countries, setCountries] = useState<Array<Country>>([]);
  const { showMessage } = useMessage();

  const getAllCountries = async () => {
    setloadingCountries(true);
    try {
      const res = await getAllCountriesApi();
      setCountries(res.data);
    } catch (error) {
      showMessage({ title: "countriesの取得に失敗しました。", status: "error" });
    } finally {
      setloadingCountries(false);
    }
  };
  return {
    getAllCountries,
    countries,
    loadingCountries,
  };
};
export default useGetAllCountries;
