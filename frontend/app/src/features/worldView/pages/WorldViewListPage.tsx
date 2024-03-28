import { Box, Flex, HStack, Stack, useDisclosure } from "@chakra-ui/react";
import ClearButton from "components/ui-elements/ClearButton";
import FilterButton from "components/ui-elements/FilterButton";
import GetWorldViewFilterModelsHandler from "components/ui-elements/GetWorldViewFilterModelsHandler";
import Loading from "components/ui-elements/Loading";
import Pagination from "components/ui-elements/Pagination";
import SearchWorldViewHandler from "components/ui-elements/SearchWorldViewHandler";
import FilterAccordion from "components/ui-parts/FilterAccordion";
import FilterDrawer from "components/ui-parts/FilterDrawer";
import SortAccordion from "components/ui-parts/SortAccordion";
import SortSelectBox from "features/worldView/components/ui-elements/SortSelectBox";
import SortSelectBoxWithIcon from "features/worldView/components/ui-elements/SortSelectBoxWithIcon";
import FilterAccordionPanel from "features/worldView/components/ui-parts/FilterAccordionPanel";
import WorldViewList from "features/worldView/components/ui-parts/WorldViewList";
import useClear from "features/worldView/hooks/useClear";
import useGetCheckedLabels from "features/worldView/hooks/useGetCheckedLabels";
import { useWorldViewListContext } from "providers/WorldViewListProvider";
import { useCallback } from "react";

const WorldViewListPage = () => {
  const { state, dispatch } = useWorldViewListContext();
  const {
    keyword,
    loadingSearchWorldViews,
    riskLevel,
    bmiRange,
    monthRange,
    worldViews,
    currentPage,
    itemsOffset,
  } = state;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { handleClear } = useClear();
  const { checkedLabelObject } = useGetCheckedLabels();

  const itemsPerPage = 40;
  const endOffset = itemsOffset + itemsPerPage;
  const currentViews = worldViews.slice(itemsOffset, endOffset);
  const pageCount = Math.ceil(worldViews.length / itemsPerPage);
  const handlePageChange = useCallback(
    (newPage: number) => {
      dispatch({ type: "SET_CURRENT_PAGE", payload: newPage });
      const newOffset = (newPage - 1) * itemsPerPage;
      dispatch({ type: "SET_ITEMS_OFFSET", payload: newOffset });
    },
    [itemsPerPage]
  );

  return (
    <>
      <SearchWorldViewHandler />
      <GetWorldViewFilterModelsHandler />
      <Box mx={{ base: "2", sm: "4", md: "5" }} my={{ base: "8", sm: "10", md: "12" }}>
        <HStack mb={{ base: 2, sm: 3 }} display={{ base: "flex", md: "none" }} flexWrap="wrap">
          <FilterButton onOpen={onOpen} />
          <SortSelectBoxWithIcon />
          {checkedLabelObject.categoryLabels.length ||
          checkedLabelObject.countryLabels.length ||
          checkedLabelObject.characteristicLabels.length ||
          riskLevel !== undefined ||
          !(monthRange[0] === 1 && monthRange[1] === 12) ||
          !(bmiRange[0] === -40 && bmiRange[1] === 30) ||
          keyword ? (
            <Box>
              <ClearButton
                loadingSearchModels={loadingSearchWorldViews}
                handleClear={handleClear}
              />
            </Box>
          ) : null}
        </HStack>
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
            {loadingSearchWorldViews ? (
              <Loading />
            ) : (
              <>
                <WorldViewList currentViews={currentViews} />
                <Pagination
                  pageCount={pageCount}
                  currentPage={currentPage}
                  handlePageChange={handlePageChange}
                />
              </>
            )}
          </Box>
        </Flex>
        <FilterDrawer isOpen={isOpen} onClose={onClose}>
          <FilterAccordionPanel />
        </FilterDrawer>
      </Box>
    </>
  );
};

export default WorldViewListPage;
