import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
} from "@chakra-ui/react";
import FilterAccordionPanel from "./FilterAccordionPanel";

const FilterAccordion = () => (
  <Accordion
    allowMultiple
    role="region"
    aria-label="絞り込みのアコーディオン"
    w="260px"
    h="100%"
    bg="white"
    boxShadow="lg"
    borderRadius="6px"
    borderColor="transparent"
  >
    <AccordionItem color="gray.800">
      <AccordionButton borderBottom="1px solid #E2E8F0">
        <Box
          as="span"
          flex="1"
          textAlign="left"
          fontSize="lg"
          fontWeight="bold"
          textShadow="0.2px 0.2px #000000"
          m="1"
        >
          フィルター
        </Box>
        <AccordionIcon />
      </AccordionButton>
      <AccordionPanel p="0">
        <FilterAccordionPanel />
      </AccordionPanel>
    </AccordionItem>
  </Accordion>
);
export default FilterAccordion;
