import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
} from "@chakra-ui/react";
import CheckBox from "components/ui-elements/CheckBox";
import NestedCheckBox from "components/ui-elements/NestedCheckBox";
import { useWorldViewListContext } from "providers/WorldViewListProvider";
import { useCallback } from "react";
import { CheckBoxItem } from "types/checkBoxItem";
import { NestedCheckBoxItem } from "types/nestedCheckBoxItem";
import FilterSearchBox from "../ui-elements/FilterSearchBox";
import RiskLevelCheckBox from "../ui-elements/RiskLevelCheckBox";

const FilterAccordionItems = () => {
  const { state, dispatch } = useWorldViewListContext();

  const characteristicCheckBoxItemsDispatch = useCallback((newCheckBoxItems: CheckBoxItem[]) => {
    dispatch({
      type: "SET_CHARACTERISTIC_CHECKBOX_ITEMS",
      payload: newCheckBoxItems,
    });
  }, []);
  const bmiCheckBoxItemsDispatch = useCallback((newCheckBoxItems: CheckBoxItem[]) => {
    dispatch({ type: "SET_BMI_CHECKBOX_ITEMS", payload: newCheckBoxItems });
  }, []);
  const categoryCheckBoxItemsDispatch = useCallback((newCheckBoxItems: NestedCheckBoxItem[]) => {
    dispatch({ type: "SET_CATEGORY_CHECKBOX_ITEMS", payload: newCheckBoxItems });
  }, []);
  const countryCheckBoxItemsDispatch = useCallback((newCheckBoxItems: NestedCheckBoxItem[]) => {
    dispatch({ type: "SET_COUNTRY_CHECKBOX_ITEMS", payload: newCheckBoxItems });
  }, []);
  const monthCheckBoxItemsDispatch = useCallback((newCheckBoxItems: NestedCheckBoxItem[]) => {
    dispatch({ type: "SET_MONTH_CHECKBOX_ITEMS", payload: newCheckBoxItems });
  }, []);

  return (
    <>
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
    </>
  );
};

export default FilterAccordionItems;
