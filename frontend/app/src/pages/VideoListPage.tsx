import { Box, Flex, Stack } from "@chakra-ui/react";
import Loading from "components/ui-elements/Loading";
import Pagination from "components/ui-elements/Pagination";
import getAllGenresApi from "features/video/api/genreApi";
import useVideoApi from "features/video/api/videoApi";
import FilterAccordion from "features/video/components/ui-parts/FilterAccordion";
import SortAccordion from "features/video/components/ui-parts/SortAccordion";
import VideoList from "features/video/components/ui-parts/VideoList";
import Movie from "features/video/types/Video";
import useGetCheckItems from "hooks/api/useGetCheckItems";
import useSearchModel from "hooks/api/useSearchModel";
import useDebounce from "hooks/useDebounce";
import { useVideoListContext } from "providers/VideoListProvider";
import { FC, useCallback, useEffect, useState } from "react";
import CheckItem from "types/checkItem";

const VideoListPage: FC = () => {
  const { state, dispatch } = useVideoListContext();
  const { videos, sortCriteria, genreCheckItems, keyword, shouldDebounce, loadingSearchVideos } =
    state;
  const { handleSearchModel } = useSearchModel();
  const { searchVideoApi } = useVideoApi();
  const { handleGetCheckItems } = useGetCheckItems();
  const { handleDebounceWithArg } = useDebounce(2000);

  const movieDispatch = (responseData: Movie[]) => {
    dispatch({ type: "SET_VIDEOS", payload: responseData });
  };
  const loadingSearchMovieDispatch = (payload: boolean) => {
    dispatch({ type: "SET_LOADING_SEARCH_VIDEOS", payload });
  };

  useEffect(() => {
    if (shouldDebounce) {
      handleDebounceWithArg<Movie>({
        fn: handleSearchModel,
        arg: {
          modelDispatch: movieDispatch,
          loadingSearchModelDispatch: loadingSearchMovieDispatch,
          searchModelApi: searchVideoApi,
        },
      });
      dispatch({ type: "SET_SHOULD_DEBOUNCE", payload: false });
    } else {
      handleSearchModel<Movie>({
        modelDispatch: movieDispatch,
        loadingSearchModelDispatch: loadingSearchMovieDispatch,
        searchModelApi: searchVideoApi,
      });
    }
  }, [sortCriteria, genreCheckItems, keyword]);

  const genreCheckItemsDispatch = (responseData: CheckItem[]) => {
    dispatch({ type: "SET_GENRE_CHECK_ITEMS", payload: responseData });
  };

  const loadingGetGenresDispatch = (payload: boolean) => {
    dispatch({ type: "SET_LOADING_GET_GENRES", payload });
  };

  useEffect(() => {
    handleGetCheckItems({
      checkItemsDispatch: genreCheckItemsDispatch,
      loadingModelDispatch: loadingGetGenresDispatch,
      fetchModelApi: getAllGenresApi,
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

  return (
    <Flex mx="5" mt="12">
      <Stack w="250px" h="100%" spacing="2" mb="16">
        <SortAccordion />
        <FilterAccordion />
      </Stack>
      <Box pl="6" w="100%">
        {loadingSearchVideos ? (
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
