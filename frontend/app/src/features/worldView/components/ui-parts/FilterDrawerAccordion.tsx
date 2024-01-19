import { Accordion, Box, CloseButton, Flex, Heading } from "@chakra-ui/react";
import useClear from "features/worldView/hooks/useClear";
import useGetCheckedLabels from "features/worldView/hooks/useGetCheckedLabels";
import { useWorldViewListContext } from "providers/WorldViewListProvider";
import FilterAccordionItems from "./FilterAccordionItems";

const FilterDrawerAccordion = () => {
  const { state, dispatch } = useWorldViewListContext();
  const { handleClear } = useClear();
  const { checkedLabelObject } = useGetCheckedLabels();

  return (
    <Accordion allowMultiple mt="4" role="region" aria-label="FilterDrawerAccordion">
      <Flex justify="space-between" pb="1" pr="1" align="center">
        <CloseButton size="md" onClick={() => dispatch({ type: "CLOSE_FILTER_DRAWER" })} />
        <Box as="span" pl="3" pr="5">
          <Heading size="md" textShadow="2px 2px #000000">
            絞り込み
          </Heading>
        </Box>
        <Box
          as="button"
          role="button"
          color="blue.300"
          onClick={handleClear}
          textAlign="right"
          disabled={
            state.loadingSearchWorldViews ||
            (!checkedLabelObject.categoryLabels.length &&
              !checkedLabelObject.countryLabels.length &&
              !checkedLabelObject.characteristicLabels.length &&
              !checkedLabelObject.riskLevelLabels.length &&
              !checkedLabelObject.monthLabels.length &&
              !checkedLabelObject.bmiLabels.length &&
              state.keyword === "")
          }
        >
          <Heading size="xs" textShadow="2px 2px #000000">
            クリア
          </Heading>
        </Box>
      </Flex>
      <FilterAccordionItems />
    </Accordion>
  );
};
export default FilterDrawerAccordion;
