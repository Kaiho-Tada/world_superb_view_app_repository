import { useSuperbViewListContext } from "hooks/providers/SuperbViewListProvider";
import useMessage from "hooks/useMessage";
import { searchSuperbViewsApi } from "lib/api/superbView";
import { useCallback } from "react";

const useSearchSuperbView = () => {
  const { showMessage } = useMessage();
  const {
    setLoadingSearchSuperbViews,
    setSuperbViews,
    checkedCategoryLabels,
    checkedCountryLabels,
    checkedCharacteristicLabels,
    checkedRiskLevelLabels,
    keyword,
  } = useSuperbViewListContext();

  const handleSearchSuperbView = useCallback(async () => {
    setLoadingSearchSuperbViews(true);
    try {
      const res = await searchSuperbViewsApi({
        checkedCategoryLabels,
        checkedCountryLabels,
        checkedCharacteristicLabels,
        checkedRiskLevelLabels,
        keyword,
      });
      setSuperbViews(res.data);
    } catch (error) {
      showMessage({
        title: "絶景一覧の取得に失敗しました。",
        status: "error",
      });
    } finally {
      setLoadingSearchSuperbViews(false);
    }
  }, [
    checkedCategoryLabels,
    checkedCountryLabels,
    checkedCharacteristicLabels,
    checkedRiskLevelLabels,
    keyword,
  ]);
  return { handleSearchSuperbView };
};
export default useSearchSuperbView;
