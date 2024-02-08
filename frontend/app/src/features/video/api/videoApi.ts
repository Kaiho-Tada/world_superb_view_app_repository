import { AxiosResponse } from "axios";
import client from "lib/client";
import { useVideoListContext } from "providers/VideoListProvider";
import Video from "../types/Video";

const useVideoApi = () => {
  const { state } = useVideoListContext();
  const { sortCriteria } = state;

  const searchVideoApi = (): Promise<AxiosResponse<Video[]>> =>
    client.get("/videos/search", {
      params: {
        sortCriteria,
      },
    });

  return { searchVideoApi };
};

export default useVideoApi;
