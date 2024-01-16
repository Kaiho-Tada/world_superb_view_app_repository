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
import CheckBox from "components/ui-elements/CheckBox";
import NestedCheckBox from "components/ui-elements/NestedCheckBox";
import FilterSearchBox from "features/worldView/components/ui-elements/FilterSearchBox";
import RiskLevelCheckBox from "features/worldView/components/ui-elements/RiskLevelCheckBox";
import useClear from "features/worldView/hooks/useClear";
import { useWorldViewListContext } from "providers/WorldViewListProvider";
import { FC, memo } from "react";
import { CheckBoxItem } from "types/checkBoxItem";
import { NestedCheckBoxItem } from "types/nestedCheckBoxItem";

const FilterAccordion: FC = memo(() => {
  const { state, dispatch } = useWorldViewListContext();
  const { handleClear } = useClear();

  const characteristicCheckBoxItemsDispatch = (newCheckBoxItems: CheckBoxItem[]) => {
    dispatch({
      type: "SET_CHARACTERISTIC_CHECKBOX_ITEMS",
      payload: newCheckBoxItems,
    });
  };
  const characteristicCheckedLabelsDispatch = (newCheckedLabels: string[]) => {
    dispatch({
      type: "SET_CHECKED_CHARACTERISTIC_LABELS",
      payload: newCheckedLabels,
    });
  };
  const bmiCheckBoxItemsDispatch = (newCheckBoxItems: CheckBoxItem[]) => {
    dispatch({ type: "SET_BMI_CHECKBOX_ITEMS", payload: newCheckBoxItems });
  };
  const bmiCheckedLabelsDispatch = (newCheckedLabels: string[]) => {
    dispatch({ type: "SET_CHECKED_BMI_LABELS", payload: newCheckedLabels });
  };
  const categoryCheckBoxItemsDispatch = (newCheckBoxItems: NestedCheckBoxItem[]) => {
    dispatch({ type: "SET_CATEGORY_CHECKBOX_ITEMS", payload: newCheckBoxItems });
  };
  const categoryCheckedLabelsDispatch = (newCheckedLabels: string[]) => {
    dispatch({ type: "SET_CHECKED_CATEGORY_LABELS", payload: newCheckedLabels });
  };
  const countryCheckBoxItemsDispatch = (newCheckBoxItems: NestedCheckBoxItem[]) => {
    dispatch({ type: "SET_COUNTRY_CHECKBOX_ITEMS", payload: newCheckBoxItems });
  };
  const countryCheckedLabelsDispatch = (newCheckedLabels: string[]) => {
    dispatch({ type: "SET_CHECKED_COUNTRY_LABELS", payload: newCheckedLabels });
  };
  const monthCheckBoxItemsDispatch = (newCheckBoxItems: NestedCheckBoxItem[]) => {
    dispatch({ type: "SET_MONTH_CHECKBOX_ITEMS", payload: newCheckBoxItems });
  };
  const monthCheckedLabelsDispatch = (newCheckedLabels: string[]) => {
    dispatch({ type: "SET_CHECKED_MONTH_LABELS", payload: newCheckedLabels });
  };

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
          <NestedCheckBox
            checkBoxItems={state.categoryCheckBoxItems}
            loadinCheckBoxItems={state.loadingCategoryCheckBoxItems}
            loadingSearchModel={state.loadingSearchWorldViews}
            checkBoxItemsDispatch={categoryCheckBoxItemsDispatch}
            checkedLabelsDispatch={categoryCheckedLabelsDispatch}
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
            checkedLabelsDispatch={countryCheckedLabelsDispatch}
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
            checkedLabelsDispatch={characteristicCheckedLabelsDispatch}
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
            checkedLabelsDispatch={monthCheckedLabelsDispatch}
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
            checkedLabelsDispatch={bmiCheckedLabelsDispatch}
          />
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  ) : null;
});
export default FilterAccordion;
