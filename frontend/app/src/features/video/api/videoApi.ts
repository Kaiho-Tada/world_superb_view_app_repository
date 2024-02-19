import { AxiosResponse } from "axios";
import client from "lib/client";
import { useVideoListContext } from "providers/VideoListProvider";
import Video from "../types/Video";

const useVideoApi = () => {
  const { state } = useVideoListContext();
  const { sortCriteria, genreCheckItems, keyword, voteAverageRange } = state;
  const genreLabels = genreCheckItems
    .filter((checkItem) => checkItem.checked)
    .map((checkedItem) => checkedItem.label);

  const searchVideoApi = (): Promise<AxiosResponse<Video[]>> =>
    client.get("/videos/search", {
      params: {
        sortCriteria,
        genreLabels,
        keyword,
        voteAverageRange,
      },
    });

  return { searchVideoApi };
};

export default useVideoApi;
