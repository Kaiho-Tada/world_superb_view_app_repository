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
import CheckBox from "components/ui-elements/CheckBox";
import NestedCheckBox from "components/ui-elements/NestedCheckBox";
import FilterSearchBox from "features/worldView/components/ui-elements/FilterSearchBox";
import RiskLevelCheckBox from "features/worldView/components/ui-elements/RiskLevelCheckBox";
import useClear from "features/worldView/hooks/useClear";
import useGetCheckedLabels from "features/worldView/hooks/useGetCheckedLabels";
import { useWorldViewListContext } from "providers/WorldViewListProvider";
import { CheckBoxItem } from "types/checkBoxItem";
import { NestedCheckBoxItem } from "types/nestedCheckBoxItem";

const FilterDrawerAccordion = () => {
  const { state, dispatch } = useWorldViewListContext();
  const { handleClear } = useClear();
  const characteristicCheckBoxItemsDispatch = (newCheckBoxItems: CheckBoxItem[]) => {
    dispatch({
      type: "SET_CHARACTERISTIC_CHECKBOX_ITEMS",
      payload: newCheckBoxItems,
    });
  };
  const bmiCheckBoxItemsDispatch = (newCheckBoxItems: CheckBoxItem[]) => {
    dispatch({ type: "SET_BMI_CHECKBOX_ITEMS", payload: newCheckBoxItems });
  };
  const categoryCheckBoxItemsDispatch = (newCheckBoxItems: NestedCheckBoxItem[]) => {
    dispatch({ type: "SET_CATEGORY_CHECKBOX_ITEMS", payload: newCheckBoxItems });
  };
  const countryCheckBoxItemsDispatch = (newCheckBoxItems: NestedCheckBoxItem[]) => {
    dispatch({ type: "SET_COUNTRY_CHECKBOX_ITEMS", payload: newCheckBoxItems });
  };
  const monthCheckBoxItemsDispatch = (newCheckBoxItems: NestedCheckBoxItem[]) => {
    dispatch({ type: "SET_MONTH_CHECKBOX_ITEMS", payload: newCheckBoxItems });
  };
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
          <NestedCheckBox
            checkBoxItems={state.categoryCheckBoxItems}
            loadinCheckBoxItems={state.loadingCategoryCheckBoxItems}
            loadingSearchModel={state.loadingSearchWorldViews}
            checkBoxItemsDispatch={categoryCheckBoxItemsDispatch}
          />
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
          <NestedCheckBox
            checkBoxItems={state.countryCheckBoxItems}
            loadinCheckBoxItems={state.loadingCountryCheckBoxItems}
            loadingSearchModel={state.loadingSearchWorldViews}
            checkBoxItemsDispatch={countryCheckBoxItemsDispatch}
          />
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
          <CheckBox
            checkBoxItems={state.characteristicCheckBoxItems}
            loadingCheckBoxItems={state.loadingCharacteristicCheckBoxItems}
            loadingSearchModel={state.loadingSearchWorldViews}
            vertical={false}
            checkBoxItemsDispatch={characteristicCheckBoxItemsDispatch}
          />
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
          <NestedCheckBox
            checkBoxItems={state.monthCheckBoxItems}
            loadinCheckBoxItems={false}
            loadingSearchModel={state.loadingSearchWorldViews}
            checkBoxItemsDispatch={monthCheckBoxItemsDispatch}
          />
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
          <CheckBox
            checkBoxItems={state.bmiCheckBoxItems}
            loadingCheckBoxItems={false}
            loadingSearchModel={state.loadingSearchWorldViews}
            vertical
            checkBoxItemsDispatch={bmiCheckBoxItemsDispatch}
          />
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};
export default FilterDrawerAccordion;
