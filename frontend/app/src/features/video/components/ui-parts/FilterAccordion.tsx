import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Divider,
  Stack,
  Text,
} from "@chakra-ui/react";
import CheckItemBox from "components/ui-elements/CheckItemBox";
import FilterRangeSlider from "components/ui-elements/FilterRangeSlider";
import SearchButton from "components/ui-elements/SearchButton";
import useVideoApi from "features/video/api/videoApi";
import Video from "features/video/types/Video";
import useSearchModel from "hooks/api/useSearchModel";
import { useVideoListContext } from "providers/VideoListProvider";
import CheckItem from "types/checkItem";
import FilterSearchBox from "../ui-element/FilterSearchBox";

const FilterAccordion = () => {
  const { state, dispatch } = useVideoListContext();
  const {
    genreCheckItems,
    loadingGetGenres,
    loadingSearchVideos,
    keyword,
    voteAverageRange,
    isDisabled,
  } = state;
  const { searchVideoApi } = useVideoApi();
  const { handleSearchModel } = useSearchModel();

  const genreCheckItemsDispatch = (newCheckItems: CheckItem[]) => {
    dispatch({ type: "SET_GENRE_CHECK_ITEMS", payload: newCheckItems });
  };
  const keywordDispatch = (newKeyword: string) => {
    dispatch({ type: "SET_KEYWORD", payload: newKeyword });
  };
  const shouldDebounceDispatch = (payload: boolean) => {
    dispatch({ type: "SET_SHOULD_DEBOUNCE", payload });
  };

  const handleChangeRangeSlider = (newValue: number[]) => {
    if (isDisabled) {
      dispatch({ type: "SET_IS_DISABLED", payload: false });
    }
    dispatch({ type: "SET_VOTE_AVERAGE_RENGE", payload: newValue });
  };

  const movieDispatch = (responseData: Video[]) => {
    dispatch({ type: "SET_VIDEOS", payload: responseData });
  };
  const loadingSearchMovieDispatch = (payload: boolean) => {
    dispatch({ type: "SET_LOADING_SEARCH_VIDEOS", payload });
  };

  const handleClickSearchButton = () => {
    if (isDisabled === false) {
      dispatch({ type: "SET_IS_DISABLED", payload: true });
    }
    handleSearchModel<Video>({
      modelDispatch: movieDispatch,
      loadingSearchModelDispatch: loadingSearchMovieDispatch,
      searchModelApi: searchVideoApi,
    });
  };

  return (
    <Accordion
      allowMultiple
      role="region"
      aria-label="絞り込みのアコーディオン"
      w="260px"
      h="100%"
      bg="white"
      boxShadow="lg"
      borderRadius="6px"
      borderColor="transparent"
    >
      <AccordionItem color="gray.800">
        <AccordionButton borderBottom="1px solid #E2E8F0">
          <Box
            as="span"
            flex="1"
            textAlign="left"
            fontSize="lg"
            fontWeight="bold"
            textShadow="0.2px 0.2px #000000"
            m="1"
          >
            フィルター
          </Box>
          <AccordionIcon />
        </AccordionButton>
        <AccordionPanel p="0">
          <Stack py="2">
            <Box px="5" py="2">
              <Text textShadow="0.5px 0.5px #000000" pb="3">
                キーワード
              </Text>
              <FilterSearchBox
                keyword={keyword}
                loadingSearchModels={loadingSearchVideos}
                keywordDispatch={keywordDispatch}
                shouldDebounceDispatch={shouldDebounceDispatch}
              />
            </Box>
            <Divider borderColor="#C2C8D0" />
            <Box px="5" py="2">
              <Text textShadow="0.5px 0.5px #000000" pb="3">
                ジャンル
              </Text>
              <CheckItemBox
                loadingGetModels={loadingGetGenres}
                checkItems={genreCheckItems}
                checkItemsDispatch={genreCheckItemsDispatch}
                loadingSearchModels={loadingSearchVideos}
              />
            </Box>
            <Divider borderColor="#C2C8D0" />
            <Box px="5" py="2">
              <Text textShadow="0.5px 0.5px #000000" pb="3">
                ユーザー評価
              </Text>
              <FilterRangeSlider
                value={voteAverageRange}
                min={0}
                max={10}
                step={1}
                handleChange={handleChangeRangeSlider}
              />
            </Box>
            <Divider borderColor="#C2C8D0" />
            <Box px="5" py="2">
              <SearchButton
                handleClick={handleClickSearchButton}
                loadingSearchModels={loadingSearchVideos}
                disabled={isDisabled}
              />
            </Box>
          </Stack>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};
export default FilterAccordion;
