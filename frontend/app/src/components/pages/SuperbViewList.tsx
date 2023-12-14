import { Box, Button, Flex, Heading, Image, Wrap, WrapItem } from "@chakra-ui/react";
import Loading from "components/atoms/Loading";
import Pagination from "components/molecules/Pagination";
import FilterAccordion from "components/organisms/FilterAccordion";
import FilterDrawer from "components/organisms/FilterDrawer";
import SuperbViewCard from "components/organisms/superbView/SuperbViewCard";
import useSearchSuperbView from "hooks/api/superbView/useSearchSuperbView";
import useDebounce from "hooks/debounce/useDebounce";
import { useSuperbViewListContext } from "hooks/providers/SuperbViewListProvider";
import filterIcon from "img/filterIcon.png";
import { memo, useEffect, useState } from "react";

const SuperbViewList = memo(() => {
  const {
    superbViews,
    loadingSearchSuperbViews,
    onOpenFilterDrawer,
    checkedCategoryLabels,
    checkedCountryLabels,
    checkedCharacteristicLabels,
    checkedRiskLevelLabels,
    checkedMonthLabels,
    keyword,
    shouldDebounce,
    setShouldDebounce,
    getCategoryCheckBoxItems,
    getCountryCheckBoxItems,
    getCharacteristicCheckBoxItems,
  } = useSuperbViewListContext();

  const { handleSearchSuperbView } = useSearchSuperbView();
  const { debounce } = useDebounce(1500);
  useEffect(() => {
    if (shouldDebounce) {
      debounce(handleSearchSuperbView);
      setShouldDebounce(false);
    } else {
      handleSearchSuperbView();
    }
  }, [
    checkedCategoryLabels,
    checkedCountryLabels,
    checkedCharacteristicLabels,
    checkedRiskLevelLabels,
    checkedMonthLabels,
    keyword,
  ]);
  useEffect(() => {
    getCategoryCheckBoxItems();
  }, []);
  useEffect(() => {
    getCountryCheckBoxItems();
  }, []);
  useEffect(() => {
    getCharacteristicCheckBoxItems();
  }, []);

  const [itemsOffset, setItemsOffset] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const endOffset = itemsOffset + itemsPerPage;
  const currentViews = superbViews.slice(itemsOffset, endOffset);
  const pageCount = Math.ceil(superbViews.length / itemsPerPage);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    const newOffset = (newPage - 1) * itemsPerPage;
    setItemsOffset(newOffset);
  };

  useEffect(() => {
    setItemsOffset(0);
    setCurrentPage(1);
  }, [superbViews]);

  return (
    <Box my="10" mx="5">
      <Button
        display={{ base: "flex", lg: "none" }}
        colorScheme="red"
        variant="outline"
        onClick={onOpenFilterDrawer}
        bg="white"
        mb="4"
      >
        <Image boxSize="20px" src={filterIcon} color="red" mr="2" />
        <Heading size="sm">絞り込み</Heading>
      </Button>
      <FilterDrawer />
      <Flex>
        <FilterAccordion />
        <Box w={{ sm: "100%", lg: "78%" }}>
          {loadingSearchSuperbViews ? (
            <Loading />
          ) : (
            <>
              <Wrap role="list" aria-label="絶景一覧">
                {currentViews.map((superbView) => (
                  <WrapItem
                    role="listitem"
                    w={{ sm: "100%", md: "49%" }}
                    key={superbView.id}
                    aria-label={`絶景一覧: ${superbView.name}`}
                  >
                    <SuperbViewCard
                      name={superbView.name}
                      imageUrl={superbView.imageUrl}
                      bestSeason={superbView.bestSeason}
                      countries={superbView.countries}
                      categories={superbView.categories}
                      characteristics={superbView.characteristics}
                    />
                  </WrapItem>
                ))}
              </Wrap>
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
});

export default SuperbViewList;
