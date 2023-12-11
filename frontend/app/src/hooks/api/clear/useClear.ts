import { useCallback } from "react";
import { useSuperbViewListContext } from "../../providers/SuperbViewListProvider";

const useClear = () => {
  const {
    categoryCheckBoxItems,
    setCategoryCheckBoxItems,
    countriesWithCheckBoxData,
    setCountriesWithCheckBoxData,
    characteristicsWithCheckBoxData,
    setCharacteristicsWithCheckBoxData,
    riskLevels,
    setRiskLevels,
    monthCheckBoxItems,
    setMonthCheckBoxItems,
    setCheckedCategoryLabels,
    setCheckedCountryLabels,
    setCheckedCharacteristicLabels,
    setCheckedRiskLevelLabels,
    setCheckedMonthLabels,
    setKeyword,
  } = useSuperbViewListContext();

  const handleClear = useCallback(() => {
    const clearedCategoryCheckBoxItems = categoryCheckBoxItems.map(
      (originalCategoryCheckBoxItem) => {
        const categoryCheckBoxItem = { ...originalCategoryCheckBoxItem };
        if (categoryCheckBoxItem.checked === true) {
          categoryCheckBoxItem.checked = !categoryCheckBoxItem.checked;
        }
        return categoryCheckBoxItem;
      }
    );
    setCategoryCheckBoxItems(clearedCategoryCheckBoxItems);

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

    const clearedMonthCheckBoxItems = monthCheckBoxItems.map((originalMonthCheckBoxItem) => {
      const monthCheckBoxItem = { ...originalMonthCheckBoxItem };
      if (monthCheckBoxItem.checked === true) {
        monthCheckBoxItem.checked = !monthCheckBoxItem.checked;
      }
      return monthCheckBoxItem;
    });
    setMonthCheckBoxItems(clearedMonthCheckBoxItems);

    setCheckedCategoryLabels([]);
    setCheckedCountryLabels([]);
    setCheckedCharacteristicLabels([]);
    setCheckedRiskLevelLabels([]);
    setCheckedMonthLabels([]);
    setKeyword("");
  }, [
    categoryCheckBoxItems,
    countriesWithCheckBoxData,
    characteristicsWithCheckBoxData,
    riskLevels,
  ]);
  return { handleClear };
};
export default useClear;
