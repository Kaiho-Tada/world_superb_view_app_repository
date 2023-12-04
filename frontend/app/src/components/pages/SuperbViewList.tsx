import { Box, Button, Flex, Heading, Image, Wrap, WrapItem } from "@chakra-ui/react";
import Loading from "components/atoms/Loading";
import FilterAccordion from "components/organisms/FilterAccordion";
import FilterDrawer from "components/organisms/FilterDrawer";
import SuperbViewCard from "components/organisms/superbView/SuperbViewCard";
import useSearchSuperbView from "hooks/api/superbView/useSearchSuperbView";
import useDebounce from "hooks/debounce/useDebounce";
import { useSuperbViewListContext } from "hooks/providers/SuperbViewListProvider";
import filterIcon from "img/filterIcon.png";
import { memo, useEffect } from "react";

const SuperbViewList = memo(() => {
  const {
    SuperbViews,
    loadingSearchSuperbViews,
    onOpenFilterDrawer,
    checkedCategoryLabels,
    checkedCountryLabels,
    checkedCharacteristicLabels,
    checkedRiskLevelLabels,
    keyword,
    shouldDebounce,
    setShouldDebounce,
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
    keyword,
  ]);

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
            <Wrap>
              {SuperbViews.map((SuperbView) => (
                <WrapItem w={{ sm: "100%", md: "49%" }} key={SuperbView.id}>
                  <SuperbViewCard
                    name={SuperbView.name}
                    imageUrl={SuperbView.imageUrl}
                    bestSeason={SuperbView.bestSeason}
                    countries={SuperbView.countries}
                    categories={SuperbView.categories}
                    characteristics={SuperbView.characteristics}
                  />
                </WrapItem>
              ))}
            </Wrap>
          )}
        </Box>
      </Flex>
    </Box>
  );
});

export default SuperbViewList;
