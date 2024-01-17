import useWorldViewApi from "features/worldView/api/useWorldViewApi";
import useMessage from "hooks/useMessage";
import { useWorldViewListContext } from "providers/WorldViewListProvider";

const useSearchWorldView = () => {
  const { dispatch } = useWorldViewListContext();
  const { searchWorldViewApi } = useWorldViewApi();
  const { showMessage } = useMessage();
  const handleSearchWorldView = async () => {
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
  };
  return { handleSearchWorldView };
};
export default useSearchWorldView;
