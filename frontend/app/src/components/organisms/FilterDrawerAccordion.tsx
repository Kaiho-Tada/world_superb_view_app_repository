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
import CategoryCheckBox from "components/molecules/CategoryCheckBox";
import CharacteristicCheckBox from "components/molecules/CharacteristicCheckBox";
import CountryCheckBox from "components/molecules/CountryCheckBox";
import FilterSearchBox from "components/molecules/FilterSearchBox";
import RiskLevelCheckBox from "components/molecules/RiskLevelCheckBox";
import useClear from "hooks/api/clear/useClear";
import { useSuperbViewListContext } from "hooks/providers/SuperbViewListProvider";

const FilterDrawerAccordion = () => {
  const {
    countryStates,
    categoryClassifications,
    onCloseFilterDrawer,
    loadingSearchSuperbViews,
    checkedCategoryLabels,
    checkedCountryLabels,
    checkedCharacteristicLabels,
    checkedRiskLevelLabels,
    keyword,
  } = useSuperbViewListContext();
  const { handleClear } = useClear();

  return (
    <Accordion allowMultiple mt="4" role="region" aria-label="FilterDrawerAccordion">
      <Flex justify="space-between" pb="1" pr="1" align="center">
        <CloseButton size="md" onClick={onCloseFilterDrawer} />
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
            loadingSearchSuperbViews ||
            (!checkedCategoryLabels.length &&
              !checkedCountryLabels.length &&
              !checkedCharacteristicLabels.length &&
              !checkedRiskLevelLabels.length &&
              keyword === "")
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
          <Accordion allowMultiple>
            {categoryClassifications.map((categoryClassification) => (
              <AccordionItem key={categoryClassification}>
                <AccordionButton fontWeight="bold" textShadow="2px 2px #000000">
                  <Box as="span" flex="1" textAlign="left">
                    {categoryClassification}
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
                <AccordionPanel pb={4}>
                  <CategoryCheckBox categoryClassification={categoryClassification} />
                </AccordionPanel>
              </AccordionItem>
            ))}
          </Accordion>
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
          <Accordion allowMultiple key="AreaAccordion">
            {countryStates.map((countryState) => (
              <AccordionItem key={countryState}>
                <AccordionButton fontWeight="bold" textShadow="2px 2px #000000">
                  <Box as="span" flex="1" textAlign="left">
                    {countryState}
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
                <AccordionPanel pb={4}>
                  <CountryCheckBox countryState={countryState} />
                </AccordionPanel>
              </AccordionItem>
            ))}
          </Accordion>
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
    </Accordion>
  );
};
export default FilterDrawerAccordion;
