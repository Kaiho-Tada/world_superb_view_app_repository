import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Text,
} from "@chakra-ui/react";
import CheckItemBox from "components/ui-elements/CheckItemBox";
import { useVideoListContext } from "providers/VideoListProvider";
import CheckItem from "types/checkItem";

const FilterAccordion = () => {
  const { state, dispatch } = useVideoListContext();
  const { genreCheckItems, loadingGetGenres, loadingSearchVideos } = state;
  const genreCheckItemsDispatch = (newCheckItems: CheckItem[]) => {
    dispatch({ type: "SET_GENRE_CHECK_ITEMS", payload: newCheckItems });
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
        <AccordionPanel py={2}>
          <Text textShadow="0.5px 0.5px #000000" mb="3">
            ジャンル
          </Text>
          <CheckItemBox
            loadingGetModels={loadingGetGenres}
            checkItems={genreCheckItems}
            checkItemsDispatch={genreCheckItemsDispatch}
            loadingSearchModels={loadingSearchVideos}
          />
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};
export default FilterAccordion;
