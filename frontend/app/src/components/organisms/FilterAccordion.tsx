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
import CategoryCheckBox from "components/molecules/CategoryCheckBox";
import CharacteristicCheckBox from "components/molecules/CharacteristicCheckBox";
import CountryCheckBox from "components/molecules/CountryCheckBox";
import RiskLevelCheckBox from "components/molecules/RiskLevelCheckBox";
import useClear from "hooks/api/clear/useClear";
import { useSuperbViewListContext } from "hooks/providers/SuperbViewListProvider";
import { FC, memo } from "react";

const FilterAccordion: FC = memo(() => {
  const { countryStates, categoryClassifications } = useSuperbViewListContext();
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
        <Box as="button" role="button" color="blue.300" onClick={handleClear} textAlign="right">
          <Heading size="xs" textShadow="2px 2px #000000">
            クリア
          </Heading>
        </Box>
      </Flex>
      <AccordionItem mt="2">
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
});
export default FilterAccordion;
