import { useCallback } from "react";
import { useWorldViewListContext } from "../../providers/WorldViewListProvider";

const useClear = () => {
  const { state, dispatch } = useWorldViewListContext();

  const handleClear = useCallback(() => {
    const clearedCategoryCheckBoxItems = state.categoryCheckBoxItems.map(
      (originalCategoryCheckBoxItem) => {
        const categoryCheckBoxItem = { ...originalCategoryCheckBoxItem };
        if (categoryCheckBoxItem.checked === true) {
          categoryCheckBoxItem.checked = !categoryCheckBoxItem.checked;
        }
        return categoryCheckBoxItem;
      }
    );
    dispatch({ type: "SET_CATEGORY_CHECKBOX_ITEMS", payload: clearedCategoryCheckBoxItems });

    const clearedCharacteristicCheckBoxItems = state.characteristicCheckBoxItems.map(
      (originalCharacteristicCheckBoxItem) => {
        const characteristicCheckBoxItem = { ...originalCharacteristicCheckBoxItem };
        if (characteristicCheckBoxItem.checked === true) {
          characteristicCheckBoxItem.checked = !characteristicCheckBoxItem.checked;
        }
        return characteristicCheckBoxItem;
      }
    );
    dispatch({
      type: "SET_CHARACTERISTIC_CHECKBOX_ITEMS",
      payload: clearedCharacteristicCheckBoxItems,
    });

    const clearedCountryCheckBoxItems = state.countryCheckBoxItems.map(
      (originalCountryCheckBoxItem) => {
        const countryCheckBoxItem = { ...originalCountryCheckBoxItem };
        if (countryCheckBoxItem.checked === true) {
          countryCheckBoxItem.checked = !countryCheckBoxItem.checked;
        }
        return countryCheckBoxItem;
      }
    );
    dispatch({ type: "SET_COUNTRY_CHECKBOX_ITEMS", payload: clearedCountryCheckBoxItems });

    const clearedRiskLevels = state.riskLevelCheckBoxItems.map((originalRiskLevelCheckBoxItem) => {
      const riskLevel = { ...originalRiskLevelCheckBoxItem };
      if (riskLevel.checked === true) {
        riskLevel.checked = !riskLevel.checked;
      }
      return riskLevel;
    });
    dispatch({ type: "SET_RISK_LEVEL_CHECKBOX_ITEMS", payload: clearedRiskLevels });

    const clearedMonthCheckBoxItems = state.monthCheckBoxItems.map((originalMonthCheckBoxItem) => {
      const monthCheckBoxItem = { ...originalMonthCheckBoxItem };
      if (monthCheckBoxItem.checked === true) {
        monthCheckBoxItem.checked = !monthCheckBoxItem.checked;
      }
      return monthCheckBoxItem;
    });
    dispatch({ type: "SET_MONTH_CHECKBOX_ITEMS", payload: clearedMonthCheckBoxItems });

    const clearedBmiCheckBoxItems = state.bmiCheckBoxItems.map((originalCheckBoxitems) => {
      const checkBoxItems = { ...originalCheckBoxitems };
      if (checkBoxItems.checked === true) {
        checkBoxItems.checked = !checkBoxItems.checked;
      }
      return checkBoxItems;
    });
    dispatch({ type: "SET_BMI_CHECKBOX_ITEMS", payload: clearedBmiCheckBoxItems });

    dispatch({ type: "SET_CHECKED_CATEGORY_LABELS", payload: [] });
    dispatch({ type: "SET_CHECKED_COUNTRY_LABELS", payload: [] });
    dispatch({
      type: "SET_CHECKED_CHARACTERISTIC_LABELS",
      payload: [],
    });
    dispatch({ type: "SET_CHECKED_RISK_LEVEL_LABELS", payload: [] });
    dispatch({ type: "SET_CHECKED_MONTH_LABELS", payload: [] });
    dispatch({ type: "SET_CHECKED_BMI_LABELS", payload: [] });
    dispatch({ type: "SET_KEYWORD", payload: "" });
  }, [
    state.categoryCheckBoxItems,
    state.countryCheckBoxItems,
    state.characteristicCheckBoxItems,
    state.riskLevelCheckBoxItems,
  ]);
  return { handleClear };
};
export default useClear;
