import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Flex,
  Heading,
} from "@chakra-ui/react";
import BmiCheckBox from "components/molecules/BmiCheckBox";
import CategoryCheckBox from "components/molecules/CategoryCheckBox";
import CharacteristicCheckBox from "components/molecules/CharacteristicCheckBox";
import CountryCheckBox from "components/molecules/CountryCheckBox";
import FilterSearchBox from "components/molecules/FilterSearchBox";
import RiskLevelCheckBox from "components/molecules/RiskLevelCheckBox";
import SeasonCheckBox from "components/molecules/SeasonCheckBox";
import useClear from "hooks/api/clear/useClear";
import { useWorldViewListContext } from "hooks/providers/WorldViewListProvider";
import { FC, memo } from "react";

const FilterAccordion: FC = memo(() => {
  const {
    loadingSearchWorldViews,
    checkedCategoryLabels,
    checkedCountryLabels,
    checkedCharacteristicLabels,
    checkedRiskLevelLabels,
    checkedMonthLabels,
    checkedBmiLabels,
    keyword,
  } = useWorldViewListContext();
  const { handleClear } = useClear();

  return (
    <Accordion
      allowMultiple
      w="19%"
      display={{ base: "none", lg: "block" }}
      ml={4}
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
            loadingSearchWorldViews ||
            (!checkedCategoryLabels.length &&
              !checkedCountryLabels.length &&
              !checkedCharacteristicLabels.length &&
              !checkedRiskLevelLabels.length &&
              !checkedMonthLabels.length &&
              !checkedBmiLabels.length &&
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
});
export default FilterAccordion;
