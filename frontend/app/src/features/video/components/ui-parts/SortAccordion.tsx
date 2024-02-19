import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
} from "@chakra-ui/react";
import SortSelectBox from "../ui-element/SortSelectBox";

const SortAccordion = () => (
  <Accordion
    allowMultiple
    role="region"
    aria-label="並び替えのアコーディオン"
    w="260px"
    h="100%"
    bg="white"
    boxShadow="lg"
    borderRadius="6px"
    borderColor="transparent"
  >
    <AccordionItem color="blue.800">
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
          並び替え
        </Box>
        <AccordionIcon />
      </AccordionButton>
      <AccordionPanel py={3}>
        <SortSelectBox />
      </AccordionPanel>
    </AccordionItem>
  </Accordion>
);
export default SortAccordion;
