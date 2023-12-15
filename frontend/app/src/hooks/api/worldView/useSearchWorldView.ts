import { useWorldViewListContext } from "hooks/providers/WorldViewListProvider";
import useMessage from "hooks/useMessage";
import { searchWorldViewsApi } from "lib/api/worldView";
import { useCallback } from "react";

const useSearchWorldView = () => {
  const { showMessage } = useMessage();
  const {
    setLoadingSearchWorldViews,
    setWorldViews,
    checkedCategoryLabels,
    checkedCountryLabels,
    checkedCharacteristicLabels,
    checkedRiskLevelLabels,
    checkedMonthLabels,
    keyword,
  } = useWorldViewListContext();

  const handleSearchWorldView = useCallback(async () => {
    setLoadingSearchWorldViews(true);
    try {
      const res = await searchWorldViewsApi({
        checkedCategoryLabels,
        checkedCountryLabels,
        checkedCharacteristicLabels,
        checkedRiskLevelLabels,
        checkedMonthLabels,
        keyword,
      });
      setWorldViews(res.data);
    } catch (error) {
      showMessage({
        title: "絶景一覧の取得に失敗しました。",
        status: "error",
      });
    } finally {
      setLoadingSearchWorldViews(false);
    }
  }, [
    checkedCategoryLabels,
    checkedCountryLabels,
    checkedCharacteristicLabels,
    checkedRiskLevelLabels,
    checkedMonthLabels,
    keyword,
  ]);
  return { handleSearchWorldView };
};
export default useSearchWorldView;
