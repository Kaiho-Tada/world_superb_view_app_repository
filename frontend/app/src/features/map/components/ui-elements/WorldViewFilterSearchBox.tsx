import { useWorldViewListContext } from "providers/WorldViewListProvider";
import MapFilterSearchBox from "./MapFilterSearchBox";

const WorldViewFilterSearchBox = () => {
  const { state, dispatch } = useWorldViewListContext();
  const { keyword, loadingSearchWorldViews } = state;
  const setKeywordDispatch = (newKeyword: string) => {
    dispatch({ type: "SET_KEYWORD", payload: newKeyword });
  };
  const setShouldDebounceDispatch = (payload: boolean) => {
    dispatch({ type: "SET_SHOULD_DEBOUNCE", payload });
  };

  return (
    <MapFilterSearchBox
      keyword={keyword}
      loadingSearchModels={loadingSearchWorldViews}
      setKeywordDispatch={setKeywordDispatch}
      setShouldDebounceDispatch={setShouldDebounceDispatch}
      placeholder="絶景名または国名で絞り込み"
    />
  );
};

export default WorldViewFilterSearchBox;
