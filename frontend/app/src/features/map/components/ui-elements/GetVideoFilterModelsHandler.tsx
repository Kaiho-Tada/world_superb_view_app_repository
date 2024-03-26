import getAllGenresApi from "features/video/api/genreApi";
import useGetCheckItems from "hooks/api/useGetCheckItems";
import "leaflet/dist/leaflet.css";
import { useVideoListContext } from "providers/VideoListProvider";
import { useEffect } from "react";
import CheckItem from "types/checkItem";

const GetVideoFilterModelsHandler = () => {
  const { state, dispatch } = useVideoListContext();
  const { isSkipGetCheckItems, isVisitedDetailPage } = state;
  const { handleGetCheckItems } = useGetCheckItems();

  const loadingGetGenresDispatch = (payload: boolean) => {
    dispatch({ type: "SET_LOADING_GET_GENRES", payload });
  };
  const genreCheckItemsDispatch = (newCheckItems: CheckItem[]) => {
    dispatch({ type: "SET_GENRE_CHECK_ITEMS", payload: newCheckItems });
  };
  useEffect(() => {
    if (!isSkipGetCheckItems && !isVisitedDetailPage) {
      handleGetCheckItems({
        checkItemsDispatch: genreCheckItemsDispatch,
        loadingGetModelDispatch: loadingGetGenresDispatch,
        getModelApi: getAllGenresApi,
      });
    }
    if (isSkipGetCheckItems) {
      dispatch({ type: "SET_IS_SKIP_GET_CHECK_ITEMS", payload: false });
    }
    if (isVisitedDetailPage) {
      dispatch({ type: "SET_IS_VISIT_DETAIL_PAGE", payload: false });
    }
  }, []);

  return null;
};

export default GetVideoFilterModelsHandler;
