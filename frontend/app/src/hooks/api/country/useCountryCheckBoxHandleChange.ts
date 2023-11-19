import { useSuperbViewListContext } from "hooks/providers/SuperbViewListProvider";
import useMessage from "hooks/useMessage";
import { searchSuperbViewsApi } from "lib/api/superbView";
import { ChangeEvent, useCallback } from "react";

const useCountryCheckBoxHandleChange = () => {
  const {
    setLoadingSearchSuperbViews,
    countriesWithCheckBoxData,
    setCountriesWithCheckBoxData,
    setCheckedCountryLabels,
    setSuperbViews,
    checkedCategoryLabels,
    checkedCharacteristicLabels,
    checkedRiskLevelLabels,
  } = useSuperbViewListContext();
  const { showMessage } = useMessage();

  const handleChange = useCallback(
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

      const checkedCountryLabels = checkedCountriesWithCheckBoxData.map(
        (checkedCountryWithCheckBoxData) => checkedCountryWithCheckBoxData.label
      );
      setCheckedCountryLabels(checkedCountryLabels);

      const searchSuperbViews = async () => {
        setLoadingSearchSuperbViews(true);

        try {
          const res = await searchSuperbViewsApi({
            checkedCountryLabels,
            checkedCategoryLabels,
            checkedCharacteristicLabels,
            checkedRiskLevelLabels,
          });
          setSuperbViews(res.data);
        } catch (error) {
          showMessage({ title: "絶景一覧の取得に失敗しました。", status: "error" });
        } finally {
          setLoadingSearchSuperbViews(false);
        }
      };
      searchSuperbViews();
    },
    [countriesWithCheckBoxData, checkedCategoryLabels, checkedCharacteristicLabels]
  );
  return { handleChange };
};
export default useCountryCheckBoxHandleChange;
