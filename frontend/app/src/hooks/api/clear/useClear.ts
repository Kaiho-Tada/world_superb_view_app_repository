import _ from "lodash";
import { useCallback } from "react";
import { useSuperbViewListContext } from "../../providers/SuperbViewListProvider";

const useClear = () => {
  const {
    categoriesWithCheckBoxData,
    setCategoriesWithCheckBoxData,
    countriesWithCheckBoxData,
    setCountriesWithCheckBoxData,
    characteristicsWithCheckBoxData,
    setCharacteristicsWithCheckBoxData,
    riskLevels,
    setRiskLevels,
    getAllSuperbViews,
    loadingSearchSuperbViews,
  } = useSuperbViewListContext();

  const handleClear = useCallback(() => {
    if (loadingSearchSuperbViews) {
      return;
    }
    const clearedCategoriesWithCheckBoxData = categoriesWithCheckBoxData.map(
      (originalCategoryWithCheckBoxData) => {
        const categoryWithCheckBoxData = { ...originalCategoryWithCheckBoxData };
        if (categoryWithCheckBoxData.checked === true) {
          categoryWithCheckBoxData.checked = !categoryWithCheckBoxData.checked;
        }
        return categoryWithCheckBoxData;
      }
    );
    setCategoriesWithCheckBoxData(clearedCategoriesWithCheckBoxData);

    const clearedCharacteristicsWithCheckBoxData = characteristicsWithCheckBoxData.map(
      (originalCharacteristicWithCheckBoxData) => {
        const CharacteristicWithCheckBoxData = { ...originalCharacteristicWithCheckBoxData };
        if (CharacteristicWithCheckBoxData.checked === true) {
          CharacteristicWithCheckBoxData.checked = !CharacteristicWithCheckBoxData.checked;
        }
        return CharacteristicWithCheckBoxData;
      }
    );
    setCharacteristicsWithCheckBoxData(clearedCharacteristicsWithCheckBoxData);

    const clearedCountriesWithCheckBoxData = countriesWithCheckBoxData.map(
      (originalCountryWithCheckBoxData) => {
        const CountryWithCheckBoxData = { ...originalCountryWithCheckBoxData };
        if (CountryWithCheckBoxData.checked === true) {
          CountryWithCheckBoxData.checked = !CountryWithCheckBoxData.checked;
        }
        return CountryWithCheckBoxData;
      }
    );
    setCountriesWithCheckBoxData(clearedCountriesWithCheckBoxData);

    const clearedRiskLevels = riskLevels.map((originalRiskLevel) => {
      const riskLevel = { ...originalRiskLevel };
      if (riskLevel.checked === true) {
        riskLevel.checked = !riskLevel.checked;
      }
      return riskLevel;
    });
    setRiskLevels(clearedRiskLevels);

    if (
      !_.isEqual(categoriesWithCheckBoxData, clearedCategoriesWithCheckBoxData) ||
      !_.isEqual(countriesWithCheckBoxData, clearedCountriesWithCheckBoxData) ||
      !_.isEqual(countriesWithCheckBoxData, clearedCountriesWithCheckBoxData) ||
      !_.isEqual(riskLevels, clearedRiskLevels)
    ) {
      getAllSuperbViews();
    }
  }, [
    categoriesWithCheckBoxData,
    countriesWithCheckBoxData,
    characteristicsWithCheckBoxData,
    riskLevels,
    loadingSearchSuperbViews,
  ]);
  return { handleClear };
};
export default useClear;
