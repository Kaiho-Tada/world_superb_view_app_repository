import { useVideoListContext } from "providers/VideoListProvider";
import MapFilterSearchBox from "./MapFilterSearchBox";

const VideoFilterSearchBox = () => {
  const { state, dispatch } = useVideoListContext();
  const { keyword, loadingSearchVideos } = state;
  const setKeywordDispatch = (newKeyword: string) => {
    dispatch({ type: "SET_KEYWORD", payload: newKeyword });
  };
  const setShouldDebounceDispatch = (payload: boolean) => {
    dispatch({ type: "SET_SHOULD_DEBOUNCE", payload });
  };

  return (
    <MapFilterSearchBox
      keyword={keyword}
      loadingSearchModels={loadingSearchVideos}
      setKeywordDispatch={setKeywordDispatch}
      setShouldDebounceDispatch={setShouldDebounceDispatch}
      placeholder="作品名で絞り込み"
    />
  );
};

export default VideoFilterSearchBox;
