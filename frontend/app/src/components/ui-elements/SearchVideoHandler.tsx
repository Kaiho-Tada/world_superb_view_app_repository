import useVideoApi from "features/video/api/videoApi";
import Video from "features/video/types/Video";
import useGetModel from "hooks/api/useGetModel";
import useDebounce from "hooks/useDebounce";
import { useVideoListContext } from "providers/VideoListProvider";
import { FC, useEffect } from "react";

const SearchVideoHandler: FC = () => {
  const { state, dispatch } = useVideoListContext();
  const {
    isSkipSearchVideo,
    keyword,
    genreCheckItems,
    shouldDebounce,
    sortCriteria,
    currentPage,
    itemsOffset,
    isVisitedDetailPage,
  } = state;
  const { handleGetModel } = useGetModel();
  const { searchVideoApi } = useVideoApi();
  const { handleDebounce } = useDebounce(1500);

  const setVideoDispatch = (responseData: Video[]) => {
    dispatch({ type: "SET_VIDEOS", payload: responseData });
  };
  const setLoadingSearchVideoDispatch = (payload: boolean) => {
    dispatch({ type: "SET_LOADING_SEARCH_VIDEOS", payload });
  };
  const handleSearchVideos = () => {
    handleGetModel<Video>({
      modelDispatch: setVideoDispatch,
      loadingGetModelDispatch: setLoadingSearchVideoDispatch,
      getModelApi: searchVideoApi,
    });
  };

  useEffect(() => {
    if (!isSkipSearchVideo && !isVisitedDetailPage) {
      if (!shouldDebounce) {
        handleSearchVideos();
      } else {
        handleDebounce(handleSearchVideos);
        dispatch({ type: "SET_SHOULD_DEBOUNCE", payload: false });
      }
      if (currentPage !== 1 && itemsOffset !== 0) {
        dispatch({ type: "SET_CURRENT_PAGE", payload: 1 });
        dispatch({ type: "SET_ITEMS_OFFSET", payload: 0 });
      }
    }
    if (isSkipSearchVideo) {
      dispatch({ type: "SET_IS_SKIP_SEARCH_VIDEO", payload: false });
    }
    if (isVisitedDetailPage) {
      dispatch({ type: "SET_IS_VISIT_DETAIL_PAGE", payload: false });
    }
  }, [keyword, genreCheckItems, sortCriteria]);

  return null;
};

export default SearchVideoHandler;
