import { useVideoListContext } from "providers/VideoListProvider";
import { ChangeEvent } from "react";

const useSortChange = () => {
  const { dispatch } = useVideoListContext();

  const handleChangeSort = (e: ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;

    switch (value) {
      case "人気が高い順":
        dispatch({ type: "SET_SORT_CRITERIA", payload: "popularity" });
        break;
      case "評価が高い順":
        dispatch({ type: "SET_SORT_CRITERIA", payload: "voteAverage" });
        break;
      case "公開日が早い順":
        dispatch({ type: "SET_SORT_CRITERIA", payload: "releaseDate" });
        break;
      default:
    }
  };
  return { handleChangeSort };
};

export default useSortChange;
