import useVideoApi from "features/video/api/videoApi";
import Video from "features/video/types/Video";
import useGetModel from "hooks/api/useGetModel";
import useDebounce from "hooks/useDebounce";
import { useMapContext } from "providers/MapProvider";
import { useVideoListContext } from "providers/VideoListProvider";
import { useEffect } from "react";
import { useMapEvents } from "react-leaflet";

const ClickVideoHandler = () => {
  const { state, dispatch: videoDispatch } = useVideoListContext();
  const { videos, isSkipSearchVideo, keyword, genreCheckItems, shouldDebounce } = state;
  const { dispatch: mapDispatch } = useMapContext();
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

  useMapEvents({
    click(e) {
      const clickedLatLng = e.latlng;

      const clickedVideos = videos.filter((video) => {
        const worldViewsAtClickedLatLng = video.worldViews.filter((worldView) => {
          const latDiff = Math.abs(worldView.latitude - clickedLatLng.lat);
          const lngDiff = Math.abs(worldView.longitude - clickedLatLng.lng);
          return latDiff <= 0.3 && lngDiff <= 0.3;
        });
        return worldViewsAtClickedLatLng.length > 0;
      });
      if (clickedVideos && clickedVideos.length > 0) {
        mapDispatch({ type: "SET_CLICKED_VIDEOS", payload: clickedVideos });
      } else {
        mapDispatch({ type: "SET_CLICKED_VIDEOS", payload: null });
      }
    },
  });
  return null;
};
export default ClickVideoHandler;
