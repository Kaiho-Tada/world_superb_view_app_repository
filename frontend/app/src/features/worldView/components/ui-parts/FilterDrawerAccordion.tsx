import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  CloseButton,
  Flex,
  Heading,
} from "@chakra-ui/react";
import BmiCheckBox from "features/worldView/components/ui-elements/BmiCheckBox";
import CategoryCheckBox from "features/worldView/components/ui-elements/CategoryCheckBox";
import CharacteristicCheckBox from "features/worldView/components/ui-elements/CharacteristicCheckBox";
import CountryCheckBox from "features/worldView/components/ui-elements/CountryCheckBox";
import FilterSearchBox from "features/worldView/components/ui-elements/FilterSearchBox";
import RiskLevelCheckBox from "features/worldView/components/ui-elements/RiskLevelCheckBox";
import SeasonCheckBox from "features/worldView/components/ui-elements/SeasonCheckBox";
import useClear from "features/worldView/hooks/clear/useClear";
import { useWorldViewListContext } from "providers/WorldViewListProvider";

const FilterDrawerAccordion = () => {
  const { state, dispatch } = useWorldViewListContext();
  const { handleClear } = useClear();

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
            (!state.checkedCategoryLabels.length &&
              !state.checkedCountryLabels.length &&
              !state.checkedCharacteristicLabels.length &&
              !state.checkedRiskLevelLabels.length &&
              !state.checkedMonthLabels.length &&
              !state.checkedBmiLabels.length &&
              state.keyword === "")
          }
        >
          <Heading size="xs" textShadow="2px 2px #000000">
            クリア
          </Heading>
        </Box>
      </Flex>
      <AccordionItem mt="2">
        <AccordionButton fontWeight="bold" textShadow="2px 2px #000000">
          <Box as="span" flex="1" textAlign="left">
            キーワード
          </Box>
          <AccordionIcon />
        </AccordionButton>
        <AccordionPanel>
          <FilterSearchBox />
        </AccordionPanel>
      </AccordionItem>
      <AccordionItem>
        <AccordionButton fontWeight="bold" textShadow="2px 2px #000000">
          <Box as="span" flex="1" textAlign="left">
            カテゴリー
          </Box>
          <AccordionIcon />
        </AccordionButton>
        <AccordionPanel pb={4}>
          <CategoryCheckBox />
        </AccordionPanel>
      </AccordionItem>
      <AccordionItem>
        <AccordionButton fontWeight="bold" textShadow="2px 2px #000000">
          <Box as="span" flex="1" textAlign="left">
            地域
          </Box>
          <AccordionIcon />
        </AccordionButton>
        <AccordionPanel pb={4}>
          <CountryCheckBox />
        </AccordionPanel>
      </AccordionItem>
      <AccordionItem>
        <AccordionButton fontWeight="bold" textShadow="2px 2px #000000">
          <Box as="span" flex="1" textAlign="left">
            属性
          </Box>
          <AccordionIcon />
        </AccordionButton>
        <AccordionPanel pb={4}>
          <CharacteristicCheckBox />
        </AccordionPanel>
      </AccordionItem>
      <AccordionItem>
        <AccordionButton fontWeight="bold" textShadow="2px 2px #000000">
          <Box as="span" flex="1" textAlign="left">
            危険度
          </Box>
          <AccordionIcon />
        </AccordionButton>
        <AccordionPanel pb={4}>
          <RiskLevelCheckBox />
        </AccordionPanel>
      </AccordionItem>
      <AccordionItem>
        <AccordionButton fontWeight="bold" textShadow="2px 2px #000000">
          <Box as="span" flex="1" textAlign="left">
            ベストシーズン
          </Box>
          <AccordionIcon />
        </AccordionButton>
        <AccordionPanel pb={4}>
          <SeasonCheckBox />
        </AccordionPanel>
      </AccordionItem>
      <AccordionItem>
        <AccordionButton fontWeight="bold" textShadow="2px 2px #000000">
          <Box as="span" flex="1" textAlign="left">
            BMI
          </Box>
          <AccordionIcon />
        </AccordionButton>
        <AccordionPanel pb={4}>
          <BmiCheckBox />
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};
export default FilterDrawerAccordion;
