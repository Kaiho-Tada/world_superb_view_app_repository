import { Box } from "@chakra-ui/react";
import Loading from "components/ui-elements/Loading";
import Pagination from "components/ui-elements/Pagination";
import searchVideoApi from "features/video/api/videoApi";
import VideoList from "features/video/components/ui-parts/VideoList";
import Movie from "features/video/types/Video";
import useSearchModel from "hooks/api/useSearchModel";
import { useVideoListContext } from "providers/VideoListProvider";
import { FC, useCallback, useEffect, useState } from "react";

const VideoListPage: FC = () => {
  const { state, dispatch } = useVideoListContext();
  const { videos } = state;
  const { handleSearchModel } = useSearchModel();

  const movieDispatch = (responseData: Movie[]) => {
    dispatch({ type: "SET_VIDEOS", payload: responseData });
  };
  const loadingSearchMovieDispatch = (payload: boolean) => {
    dispatch({ type: "SET_LOADING_SEARCH_VIDEOS", payload });
  };

  useEffect(() => {
    handleSearchModel<Movie>({
      modelDispatch: movieDispatch,
      loadingSearchModelDispatch: loadingSearchMovieDispatch,
      searchModelApi: searchVideoApi,
    });
  }, []);

  const [itemsOffset, setItemsOffset] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 30;
  const endOffset = itemsOffset + itemsPerPage;
  const currentVideos = videos.slice(itemsOffset, endOffset);
  const pageCount = Math.ceil(videos.length / itemsPerPage);
  const handlePageChange = useCallback(
    (newPage: number) => {
      setCurrentPage(newPage);
      const newOffset = (newPage - 1) * itemsPerPage;
      setItemsOffset(newOffset);
    },
    [itemsPerPage]
  );

  useEffect(() => {
    setItemsOffset(0);
    setCurrentPage(1);
  }, [videos]);

  return state.loadingSearchVideos ? (
    <Loading />
  ) : (
    <Box my="6">
      <VideoList currentVideos={currentVideos} />
      <Pagination
        pageCount={pageCount}
        currentPage={currentPage}
        handlePageChange={handlePageChange}
      />
    </Box>
  );
};

export default VideoListPage;
