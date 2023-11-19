import { Box, Flex, Wrap, WrapItem } from "@chakra-ui/react";
import Loading from "components/atoms/Loading";
import FilterAccordion from "components/organisms/FilterAccordion";
import SuperbViewCard from "components/organisms/superbView/SuperbViewCard";
import { useSuperbViewListContext } from "hooks/providers/SuperbViewListProvider";
import { memo, useEffect } from "react";

const SuperbViewList = memo(() => {
  const { getAllSuperbViews, SuperbViews, loadingSuperbViews } = useSuperbViewListContext();

  useEffect(() => {
    getAllSuperbViews();
  }, []);

  return (
    <Flex my="10" mx="5">
      <FilterAccordion />
      <Box w={{ sm: "100%", lg: "78%" }}>
        {loadingSuperbViews === true ? (
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
  );
});

export default SuperbViewList;
