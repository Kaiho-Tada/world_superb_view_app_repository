import { useCallback } from "react";
import { useSuperbViewListContext } from "../../providers/SuperbViewListProvider";

const useClear = () => {
  const {
    categoryCheckBoxItems,
    setCategoryCheckBoxItems,
    countryCheckBoxItems,
    setCountryCheckBoxItems,
    characteristicCheckBoxItems,
    setCharacteristicCheckBoxItems,
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

    const clearedCharacteristicCheckBoxItems = characteristicCheckBoxItems.map(
      (originalCharacteristicCheckBoxItem) => {
        const characteristicCheckBoxItem = { ...originalCharacteristicCheckBoxItem };
        if (characteristicCheckBoxItem.checked === true) {
          characteristicCheckBoxItem.checked = !characteristicCheckBoxItem.checked;
        }
        return characteristicCheckBoxItem;
      }
    );
    setCharacteristicCheckBoxItems(clearedCharacteristicCheckBoxItems);

    const clearedCountryCheckBoxItems = countryCheckBoxItems.map((originalCountryCheckBoxItem) => {
      const countryCheckBoxItem = { ...originalCountryCheckBoxItem };
      if (countryCheckBoxItem.checked === true) {
        countryCheckBoxItem.checked = !countryCheckBoxItem.checked;
      }
      return countryCheckBoxItem;
    });
    setCountryCheckBoxItems(clearedCountryCheckBoxItems);

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
  }, [categoryCheckBoxItems, countryCheckBoxItems, characteristicCheckBoxItems, riskLevels]);
  return { handleClear };
};
export default useClear;
