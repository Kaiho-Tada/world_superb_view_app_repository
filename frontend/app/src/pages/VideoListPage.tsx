import { Box, Flex } from "@chakra-ui/react";
import Loading from "components/ui-elements/Loading";
import Pagination from "components/ui-elements/Pagination";
import useVideoApi from "features/video/api/videoApi";
import SortAccordion from "features/video/components/ui-parts/SortAccordion";
import VideoList from "features/video/components/ui-parts/VideoList";
import Movie from "features/video/types/Video";
import useSearchModel from "hooks/api/useSearchModel";
import { useVideoListContext } from "providers/VideoListProvider";
import { FC, useCallback, useEffect, useState } from "react";

const VideoListPage: FC = () => {
  const { state, dispatch } = useVideoListContext();
  const { videos, sortCriteria } = state;
  const { handleSearchModel } = useSearchModel();
  const { searchVideoApi } = useVideoApi();

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
  }, [sortCriteria]);

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

  return (
    <Flex mx="5" mt="12">
      <Box w="250px" h="100%">
        <SortAccordion />
      </Box>
      <Box pl="6" w="100%">
        {state.loadingSearchVideos ? (
          <Loading />
        ) : (
          <>
            <VideoList currentVideos={currentVideos} />
            <Pagination
              pageCount={pageCount}
              currentPage={currentPage}
              handlePageChange={handlePageChange}
            />
          </>
        )}
      </Box>
    </Flex>
  );
};

export default VideoListPage;
