import { useWorldViewListContext } from "providers/WorldViewListProvider";
import CheckItem from "types/checkItem";
import { NestedCheckItem } from "types/nestedCheckItem";
import handleClearCheckItem from "utils/handleClearCheckItem";

const useClear = () => {
  const { state, dispatch } = useWorldViewListContext();
  const { bmiRange, riskLevel, monthRange } = state;

  const handleClear = () => {
    handleClearCheckItem({
      checkItems: state.characteristicCheckItems,
      checkItemsDispatch: (clearedCheckItems: CheckItem[]) => {
        dispatch({
          type: "SET_CHARACTERISTIC_CHECK_ITEMS",
          payload: clearedCheckItems,
        });
      },
    });

    handleClearCheckItem<NestedCheckItem>({
      checkItems: state.categoryCheckItems,
      checkItemsDispatch: (newCheckItems: NestedCheckItem[]) => {
        dispatch({ type: "SET_CATEGORY_CHECK_ITEMS", payload: newCheckItems });
      },
    });

    handleClearCheckItem<NestedCheckItem>({
      checkItems: state.countryCheckItems,
      checkItemsDispatch: (newCheckItems: NestedCheckItem[]) => {
        dispatch({ type: "SET_COUNTRY_CHECK_ITEMS", payload: newCheckItems });
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
