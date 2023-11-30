import { useSuperbViewListContext } from "hooks/providers/SuperbViewListProvider";
import useMessage from "hooks/useMessage";
import { searchSuperbViewsApi } from "lib/api/superbView";
import { ChangeEvent, useCallback } from "react";

const useRiskLevelCheckBoxHandleChange = () => {
  const {
    setLoadingSearchSuperbViews,
    riskLevels,
    setRiskLevels,
    setCheckedRiskLevelLabels,
    setSuperbViews,
    checkedCategoryLabels,
    checkedCountryLabels,
    checkedCharacteristicLabels,
    keyword,
  } = useSuperbViewListContext();
  const { showMessage } = useMessage();

  const handleChange = useCallback(
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

      const checkedRiskLevelLabels = checkedRiskLevels.map(
        (checkedRiskLevel) => checkedRiskLevel.label
      );
      setCheckedRiskLevelLabels(checkedRiskLevelLabels);

      const searchSuperbViews = async () => {
        setLoadingSearchSuperbViews(true);

        try {
          const res = await searchSuperbViewsApi({
            checkedCountryLabels,
            checkedCategoryLabels,
            checkedCharacteristicLabels,
            checkedRiskLevelLabels,
            keyword,
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
    [riskLevels, checkedCategoryLabels, checkedCountryLabels, checkedCharacteristicLabels, keyword]
  );
  return { handleChange };
};
export default useRiskLevelCheckBoxHandleChange;
