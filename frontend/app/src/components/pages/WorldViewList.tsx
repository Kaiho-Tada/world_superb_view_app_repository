import { Box, Button, Flex, Heading, Image, Wrap, WrapItem } from "@chakra-ui/react";
import Loading from "components/atoms/Loading";
import Pagination from "components/molecules/Pagination";
import FilterAccordion from "components/organisms/FilterAccordion";
import FilterDrawer from "components/organisms/FilterDrawer";
import WorldViewCard from "components/organisms/worldView/WorldViewCard";
import useSearchWorldView from "hooks/api/worldView/useSearchWorldView";
import useDebounce from "hooks/debounce/useDebounce";
import { useWorldViewListContext } from "hooks/providers/WorldViewListProvider";
import filterIcon from "img/filterIcon.png";
import { memo, useEffect, useState } from "react";

const WorldViewList = memo(() => {
  const {
    worldViews,
    loadingSearchWorldViews,
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
  } = useWorldViewListContext();

  const { handleSearchWorldView } = useSearchWorldView();
  const { debounce } = useDebounce(1500);
  useEffect(() => {
    if (shouldDebounce) {
      debounce(handleSearchWorldView);
      setShouldDebounce(false);
    } else {
      handleSearchWorldView();
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
  const currentViews = worldViews.slice(itemsOffset, endOffset);
  const pageCount = Math.ceil(worldViews.length / itemsPerPage);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    const newOffset = (newPage - 1) * itemsPerPage;
    setItemsOffset(newOffset);
  };

  useEffect(() => {
    setItemsOffset(0);
    setCurrentPage(1);
  }, [worldViews]);

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
          {loadingSearchWorldViews ? (
            <Loading />
          ) : (
            <>
              <Wrap role="list" aria-label="絶景一覧">
                {currentViews.map((worldView) => (
                  <WrapItem
                    role="listitem"
                    w={{ sm: "100%", md: "49%" }}
                    key={worldView.id}
                    aria-label={`絶景一覧: ${worldView.name}`}
                  >
                    <WorldViewCard
                      name={worldView.name}
                      imageUrl={worldView.imageUrl}
                      bestSeason={worldView.bestSeason}
                      countries={worldView.countries}
                      categories={worldView.categories}
                      characteristics={worldView.characteristics}
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

export default WorldViewList;
