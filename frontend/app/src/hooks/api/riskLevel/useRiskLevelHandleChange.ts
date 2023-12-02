import { useSuperbViewListContext } from "hooks/providers/SuperbViewListProvider";
import { ChangeEvent, useCallback } from "react";

const useRiskLevelHandleChange = () => {
  const { riskLevels, setRiskLevels, setCheckedRiskLevelLabels } = useSuperbViewListContext();

  const handleChangeRiskLevel = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const newRiskLevels = riskLevels.map((originalRiskLevel) => {
        const riskLevel = { ...originalRiskLevel };
        if (riskLevel.label === e.target.value) {
          riskLevel.checked = !riskLevel.checked;
        }
        return riskLevel;
      });
      setRiskLevels(newRiskLevels);

      const checkedRiskLevels = newRiskLevels.filter(
        (newRiskLevel) => newRiskLevel.checked === true
      );

      const newCheckedRiskLevelLabels = checkedRiskLevels.map(
        (checkedRiskLevel) => checkedRiskLevel.label
      );
      setCheckedRiskLevelLabels(newCheckedRiskLevelLabels);
    },
    [riskLevels]
  );
  return { handleChangeRiskLevel };
};
export default useRiskLevelHandleChange;
