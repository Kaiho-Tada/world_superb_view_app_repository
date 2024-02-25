import { useWorldViewListContext } from "providers/WorldViewListProvider";
import { CheckBoxItem } from "types/checkBoxItem";
import { NestedCheckBoxItem } from "types/nestedCheckBoxItem";
import handleClearCheckBox from "utils/handleClearCheckBox";

const useClear = () => {
  const { state, dispatch } = useWorldViewListContext();
  const { bmiRange, riskLevel, monthRange } = state;

  const handleClear = () => {
    handleClearCheckBox({
      checkBoxItems: state.characteristicCheckItems,
      checkBoxItemsDispatch: (clearedCheckBoxItems: CheckBoxItem[]) => {
        dispatch({
          type: "SET_CHARACTERISTIC_CHECK_ITEMS",
          payload: clearedCheckBoxItems,
        });
      },
    });

    handleClearCheckBox<NestedCheckBoxItem>({
      checkBoxItems: state.categoryCheckBoxItems,
      checkBoxItemsDispatch: (newCheckBoxItems: NestedCheckBoxItem[]) => {
        dispatch({ type: "SET_CATEGORY_CHECKBOX_ITEMS", payload: newCheckBoxItems });
      },
    });

    handleClearCheckBox<NestedCheckBoxItem>({
      checkBoxItems: state.countryCheckBoxItems,
      checkBoxItemsDispatch: (newCheckBoxItems: NestedCheckBoxItem[]) => {
        dispatch({ type: "SET_COUNTRY_CHECKBOX_ITEMS", payload: newCheckBoxItems });
      },
    });

    if (riskLevel !== undefined) {
      dispatch({ type: "SET_RISK_LEVEL", payload: undefined });
    }

    if (monthRange[0] !== 1 || monthRange[1] !== 12) {
      dispatch({ type: "SET_MONTH_RANGE", payload: [1, 12] });
    }

    if (bmiRange[0] !== -40 || bmiRange[1] !== 30) {
      dispatch({ type: "SET_BMI_RANGE", payload: [-40, 30] });
    }

    dispatch({ type: "SET_IS_DISABLED_SEARCH_BUTTON", payload: true });

    dispatch({ type: "SET_KEYWORD", payload: "" });
  };
  return { handleClear };
};
export default useClear;
