import { useWorldViewListContext } from "hooks/providers/WorldViewListProvider";
import useMessage from "hooks/useMessage";
import WorldViewApi from "lib/api/worldViewApi";
import { useCallback } from "react";

const useSearchWorldView = () => {
  const { state, dispatch } = useWorldViewListContext();
  const { searchWorldViewApi } = WorldViewApi();
  const { showMessage } = useMessage();
  const handleSearchWorldView = useCallback(async () => {
    dispatch({ type: "SET_LOADING_SEARCH_WORLDVIEWS", payload: true });
    try {
      const res = await searchWorldViewApi();
      dispatch({ type: "SET_WORLD_VIEWS", payload: res.data });
    } catch (error) {
      showMessage({
        title: "絶景一覧の取得に失敗しました。",
        status: "error",
      });
    } finally {
      dispatch({ type: "SET_LOADING_SEARCH_WORLDVIEWS", payload: false });
    }
  }, [
    state.checkedCategoryLabels,
    state.checkedCountryLabels,
    state.checkedCharacteristicLabels,
    state.checkedRiskLevelLabels,
    state.checkedMonthLabels,
    state.checkedBmiLabels,
    state.keyword,
  ]);
  return { handleSearchWorldView };
};
export default useSearchWorldView;
