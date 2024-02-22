import { useWorldViewListContext } from "providers/WorldViewListProvider";
import { CheckBoxItem } from "types/checkBoxItem";
import { NestedCheckBoxItem } from "types/nestedCheckBoxItem";
import handleClearCheckBox from "utils/handleClearCheckBox";

const useClear = () => {
  const { state, dispatch } = useWorldViewListContext();
  const { bmiRange } = state;

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

    handleClearCheckBox({
      checkBoxItems: state.riskLevelCheckBoxItems,
      checkBoxItemsDispatch: (newCheckBoxItems: CheckBoxItem[]) => {
        dispatch({ type: "SET_RISK_LEVEL_CHECKBOX_ITEMS", payload: newCheckBoxItems });
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

    handleClearCheckBox<NestedCheckBoxItem>({
      checkBoxItems: state.monthCheckBoxItems,
      checkBoxItemsDispatch: (newCheckBoxItems: NestedCheckBoxItem[]) => {
        dispatch({ type: "SET_MONTH_CHECKBOX_ITEMS", payload: newCheckBoxItems });
      },
    });

    if (bmiRange[0] !== -40 || bmiRange[1] !== 30) {
      dispatch({ type: "SET_BMI_RANGE", payload: [-40, 30] });
    }
    dispatch({ type: "SET_IS_DISABLED_SEARCH_BUTTON", payload: true });

    dispatch({ type: "SET_KEYWORD", payload: "" });
  };
  return { handleClear };
};
export default useClear;
