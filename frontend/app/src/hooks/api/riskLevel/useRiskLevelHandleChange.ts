import { useWorldViewListContext } from "hooks/providers/WorldViewListProvider";
import { ChangeEvent, useCallback } from "react";

const useRiskLevelHandleChange = () => {
  const { state, dispatch } = useWorldViewListContext();

  const handleChangeRiskLevel = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const newCheckBoxItems = state.riskLevelCheckBoxItems.map((originalRiskLevel) => {
        const riskLevel = { ...originalRiskLevel };
        if (riskLevel.label === e.target.value) {
          riskLevel.checked = !riskLevel.checked;
        }
        return riskLevel;
      });
      dispatch({ type: "SET_RISK_LEVEL_CHECKBOX_ITEMS", payload: newCheckBoxItems });

      const checkedCheckBoxItems = newCheckBoxItems.filter(
        (newRiskLevel) => newRiskLevel.checked === true
      );
      const newCheckedRiskLevelLabels = checkedCheckBoxItems.map(
        (checkedRiskLevel) => checkedRiskLevel.label
      );
      dispatch({ type: "SET_CHECKED_RISK_LEVEL_LABELS", payload: newCheckedRiskLevelLabels });
    },
    [state.riskLevelCheckBoxItems]
  );
  return { handleChangeRiskLevel };
};
export default useRiskLevelHandleChange;
