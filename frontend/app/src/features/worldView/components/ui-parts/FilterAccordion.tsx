import { Accordion, Box, Flex, Heading } from "@chakra-ui/react";
import useClear from "features/worldView/hooks/useClear";
import useGetCheckedLabels from "features/worldView/hooks/useGetCheckedLabels";
import { useWorldViewListContext } from "providers/WorldViewListProvider";
import { FC } from "react";
import FilterAccordionItems from "./FilterAccordionItems";

const FilterAccordion: FC = () => {
  const { state } = useWorldViewListContext();
  const { handleClear } = useClear();
  const { checkedLabelObject } = useGetCheckedLabels();

  return state.isOpenFilterAccordion ? (
    <Accordion
      allowMultiple
      w="19%"
      display={{ base: "none", lg: "block" }}
      mr={6}
      color="white"
      role="region"
      aria-label="絞り込み"
    >
      <Flex justify="space-between" pb="1" pr="1">
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
  ) : null;
};
export default FilterAccordion;
