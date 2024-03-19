import useVideoApi from "features/video/api/videoApi";
import Video from "features/video/types/Video";
import useGetModel from "hooks/api/useGetModel";
import useDebounce from "hooks/useDebounce";
import { useVideoListContext } from "providers/VideoListProvider";
import { FC, useEffect } from "react";

const GetVideoHandler: FC = () => {
  const { state, dispatch: videoDispatch } = useVideoListContext();
  const { isSkipSearchVideo, keyword, genreCheckItems, shouldDebounce } = state;
  const { handleGetModel } = useGetModel();
  const { searchVideoApi } = useVideoApi();
  const { handleDebounce } = useDebounce(1500);

  const setVideoDispatch = (responseData: Video[]) => {
    videoDispatch({ type: "SET_VIDEOS", payload: responseData });
  };
  const setLoadingSearchVideoDispatch = (payload: boolean) => {
    videoDispatch({ type: "SET_LOADING_SEARCH_VIDEOS", payload });
  };
  const handleSearchVideos = () => {
    handleGetModel<Video>({
      modelDispatch: setVideoDispatch,
      loadingGetModelDispatch: setLoadingSearchVideoDispatch,
      getModelApi: searchVideoApi,
    });
  };

  useEffect(() => {
    if (!isSkipSearchVideo) {
      if (!shouldDebounce) {
        handleSearchVideos();
      } else {
        handleDebounce(handleSearchVideos);
        videoDispatch({ type: "SET_SHOULD_DEBOUNCE", payload: false });
      }
    }
    videoDispatch({ type: "SET_IS_SKIP_SEARCH_VIDEO", payload: false });
  }, [keyword, genreCheckItems]);

  return <div>GetVideoHandler</div>;
};

export default GetVideoHandler;
