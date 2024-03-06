import { Box, Flex, HStack, Stack, useBreakpointValue, useDisclosure } from "@chakra-ui/react";
import { AxiosResponse } from "axios";
import ClearButton from "components/ui-elements/ClearButton";
import FilterButton from "components/ui-elements/FilterButton";
import Loading from "components/ui-elements/Loading";
import Pagination from "components/ui-elements/Pagination";
import FilterAccordion from "components/ui-parts/FilterAccordion";
import FilterDrawer from "components/ui-parts/FilterDrawer";
import SortAccordion from "components/ui-parts/SortAccordion";
import getAllGenresApi from "features/video/api/genreApi";
import useVideoApi from "features/video/api/videoApi";
import SelectBoxWithIcon from "features/video/components/ui-element/SortSelectBoxWithIcon";
import FilterAccordionPanel from "features/video/components/ui-parts/FilterAccordionPanel";
import VideoList from "features/video/components/ui-parts/VideoList";
import Movie from "features/video/types/Video";
import useGetCheckItems from "hooks/api/useGetCheckItems";
import useGetModel from "hooks/api/useGetModel";
import useDebounce from "hooks/useDebounce";
import { useVideoListContext } from "providers/VideoListProvider";
import { FC, useCallback, useEffect } from "react";
import CheckItem from "types/checkItem";
import SortSelectBox from "../components/ui-element/SortSelectBox";
import useClear from "../hooks/useClear";

const VideoListPage: FC = () => {
  const { state, dispatch } = useVideoListContext();
  const {
    videos,
    sortCriteria,
    genreCheckItems,
    keyword,
    shouldDebounce,
    loadingSearchVideos,
    voteAverageRange,
    currentPage,
    itemsOffset,
    isSkipSearchVideo,
    isSkipGetCheckItems,
  } = state;
  const { handleGetModel } = useGetModel();
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
    if (!isSkipSearchVideo) {
      if (shouldDebounce) {
        handleDebounceWithArg<{
          modelDispatch: (responseData: Movie[]) => void;
          loadingGetModelDispatch: (payload: boolean) => void;
          getModelApi: () => Promise<AxiosResponse<Movie[]>>;
        }>({
          fn: handleGetModel,
          arg: {
            modelDispatch: movieDispatch,
            loadingGetModelDispatch: loadingSearchMovieDispatch,
            getModelApi: searchVideoApi,
          },
        });
        dispatch({ type: "SET_SHOULD_DEBOUNCE", payload: false });
      } else {
        handleGetModel<Movie>({
          modelDispatch: movieDispatch,
          loadingGetModelDispatch: loadingSearchMovieDispatch,
          getModelApi: searchVideoApi,
        });
      }
      if (currentPage !== 1 && itemsOffset !== 0) {
        dispatch({ type: "SET_CURRENT_PAGE", payload: 1 });
        dispatch({ type: "SET_ITEMS_OFFSET", payload: 0 });
      }
    } else {
      dispatch({ type: "SET_IS_SKIP_SEARCH_VIDEO", payload: false });
    }
  }, [sortCriteria, genreCheckItems, keyword]);

  const genreCheckItemsDispatch = (responseData: CheckItem[]) => {
    dispatch({ type: "SET_GENRE_CHECK_ITEMS", payload: responseData });
  };

  const loadingGetGenresDispatch = (payload: boolean) => {
    dispatch({ type: "SET_LOADING_GET_GENRES", payload });
  };

  useEffect(() => {
    if (!isSkipGetCheckItems) {
      handleGetCheckItems({
        checkItemsDispatch: genreCheckItemsDispatch,
        loadingGetModelDispatch: loadingGetGenresDispatch,
        getModelApi: getAllGenresApi,
      });
    } else {
      dispatch({ type: "SET_IS_SKIP_GET_CHECK_ITEMS", payload: false });
    }
  }, []);

  const itemsPerPage = 30;
  const endOffset = itemsOffset + itemsPerPage;
  const currentVideos = videos.slice(itemsOffset, endOffset);
  const pageCount = Math.ceil(videos.length / itemsPerPage);
  const handlePageChange = useCallback(
    (newPage: number) => {
      dispatch({ type: "SET_CURRENT_PAGE", payload: newPage });
      const newOffset = (newPage - 1) * itemsPerPage;
      dispatch({ type: "SET_ITEMS_OFFSET", payload: newOffset });
    },
    [itemsPerPage]
  );

  const { isOpen, onOpen, onClose } = useDisclosure();
  const screenSize = useBreakpointValue({ sm: "sm" });

  const genreLabels = genreCheckItems
    .filter((checkItem) => checkItem.checked)
    .map((checkedItem) => checkedItem.label);

  const { handleClear } = useClear();

  return (
    <Box mx={{ base: "2", sm: "4", md: "5" }} my={{ base: "8", sm: "10", md: "12" }}>
      <FilterDrawer isOpen={isOpen} onClose={onClose}>
        <FilterAccordionPanel />
      </FilterDrawer>
      <Flex mb={{ base: 2, sm: 3 }} display={{ base: "flex", md: "none" }}>
        {screenSize === "sm" ? (
          <HStack spacing={2} display={{ base: "none", sm: "flex" }}>
            <FilterButton onOpen={onOpen} />
            <SelectBoxWithIcon />
            {genreLabels.length ||
            state.keyword.length ||
            !(voteAverageRange[0] === 0 && voteAverageRange[1] === 10) ? (
              <Box>
                <ClearButton loadingSearchModels={loadingSearchVideos} handleClear={handleClear} />
              </Box>
            ) : null}
          </HStack>
        ) : (
          <Stack spacing={1} display={{ base: "flex", sm: "none" }}>
            <FilterButton onOpen={onOpen} />
            <SelectBoxWithIcon />
            {genreLabels.length ||
            state.keyword.length ||
            !(voteAverageRange[0] === 0 && voteAverageRange[1] === 10) ? (
              <ClearButton loadingSearchModels={loadingSearchVideos} handleClear={handleClear} />
            ) : null}
          </Stack>
        )}
      </Flex>
      <Flex>
        <Box display={{ base: "none", md: "block" }} h="100%" mr="6">
          <Stack w="250px" h="100%" spacing="3" mb="16">
            <SortAccordion>
              <SortSelectBox />
            </SortAccordion>
            <FilterAccordion>
              <FilterAccordionPanel />
            </FilterAccordion>
          </Stack>
        </Box>
        <Box w="100%">
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
    </Box>
  );
};

export default VideoListPage;
