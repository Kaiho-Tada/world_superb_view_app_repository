import { useVideoListContext } from "providers/VideoListProvider";

const useClear = () => {
  const { state, dispatch } = useVideoListContext();
  const { genreCheckItems, voteAverageRange } = state;

  const handleClear = () => {
    const clearedCheckBoxItems = genreCheckItems.map((originalCheckItem) => {
      const checkItem = { ...originalCheckItem };
      if (checkItem.checked === true) {
        checkItem.checked = !checkItem.checked;
      }
      return checkItem;
    });

    dispatch({ type: "SET_GENRE_CHECK_ITEMS", payload: clearedCheckBoxItems });
    dispatch({ type: "SET_KEYWORD", payload: "" });
    if (voteAverageRange[0] !== 0 || voteAverageRange[1] !== 10) {
      dispatch({ type: "SET_VOTE_AVERAGE_RENGE", payload: [0, 10] });
    }
    dispatch({ type: "SET_IS_DISABLED", payload: true });
  };
  return { handleClear };
};

export default useClear;
