import { Box, Divider, Stack, Text } from "@chakra-ui/react";
import CheckBox from "components/ui-elements/CheckBox";
import ClearButton from "components/ui-elements/ClearButton";
import FilterSearchBox from "components/ui-elements/FilterSearchBox";
import NestedCheckBox from "components/ui-elements/NestedCheckBox";
import useClear from "features/worldView/hooks/useClear";
import useGetCheckedLabels from "features/worldView/hooks/useGetCheckedLabels";
import { useWorldViewListContext } from "providers/WorldViewListProvider";
import { useCallback } from "react";
import { CheckBoxItem } from "types/checkBoxItem";
import { NestedCheckBoxItem } from "types/nestedCheckBoxItem";
import RiskLevelCheckBox from "../ui-elements/RiskLevelCheckBox";

const FilterAccordionPanel = () => {
  const { state, dispatch } = useWorldViewListContext();
  const {
    keyword,
    loadingSearchWorldViews,
    categoryCheckBoxItems,
    loadingCategoryCheckBoxItems,
    countryCheckBoxItems,
    loadingCountryCheckBoxItems,
    characteristicCheckBoxItems,
    loadingCharacteristicCheckBoxItems,
    monthCheckBoxItems,
    bmiCheckBoxItems,
  } = state;

  const keywordDispatch = (newKeyword: string) => {
    dispatch({ type: "SET_KEYWORD", payload: newKeyword });
  };
  const shouldDebounceDispatch = (payload: boolean) => {
    dispatch({ type: "SET_SHOULD_DEBOUNCE", payload });
  };

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
    dispatch({
      type: "SET_CATEGORY_CHECKBOX_ITEMS",
      payload: newCheckBoxItems,
    });
  }, []);
  const countryCheckBoxItemsDispatch = useCallback((newCheckBoxItems: NestedCheckBoxItem[]) => {
    dispatch({
      type: "SET_COUNTRY_CHECKBOX_ITEMS",
      payload: newCheckBoxItems,
    });
  }, []);
  const monthCheckBoxItemsDispatch = useCallback((newCheckBoxItems: NestedCheckBoxItem[]) => {
    dispatch({ type: "SET_MONTH_CHECKBOX_ITEMS", payload: newCheckBoxItems });
  }, []);

  const { handleClear } = useClear();
  const { checkedLabelObject } = useGetCheckedLabels();

  return (
    <>
      {checkedLabelObject.categoryLabels.length ||
      checkedLabelObject.countryLabels.length ||
      checkedLabelObject.characteristicLabels.length ||
      checkedLabelObject.riskLevelLabels.length ||
      checkedLabelObject.monthLabels.length ||
      checkedLabelObject.bmiLabels.length ||
      keyword ? (
        <>
          <ClearButton loadingSearchModels={loadingSearchWorldViews} handleClear={handleClear} />
          <Divider borderColor="#C2C8D0" />
        </>
      ) : null}
      <Stack py="2" role="region" aria-label="絞り込みのアコーディオンパネル">
        <Box px="5" py="2">
          <Text textShadow="0.5px 0.5px #000000" pb="3">
            キーワード
          </Text>
          <FilterSearchBox
            keyword={keyword}
            loadingSearchModels={loadingSearchWorldViews}
            keywordDispatch={keywordDispatch}
            shouldDebounceDispatch={shouldDebounceDispatch}
          />
        </Box>
        <Divider borderColor="#C2C8D0" />
        <Box px="5" py="2">
          <Text textShadow="0.5px 0.5px #000000" pb="3">
            カテゴリー
          </Text>
          <NestedCheckBox
            checkBoxItems={categoryCheckBoxItems}
            loadinCheckBoxItems={loadingCategoryCheckBoxItems}
            loadingSearchModel={loadingSearchWorldViews}
            checkBoxItemsDispatch={categoryCheckBoxItemsDispatch}
          />
        </Box>
        <Divider borderColor="#C2C8D0" />
        <Box px="5" py="2">
          <Text textShadow="0.5px 0.5px #000000" pb="3">
            地域
          </Text>
          <NestedCheckBox
            checkBoxItems={countryCheckBoxItems}
            loadinCheckBoxItems={loadingCountryCheckBoxItems}
            loadingSearchModel={loadingSearchWorldViews}
            checkBoxItemsDispatch={countryCheckBoxItemsDispatch}
          />
        </Box>
        <Divider borderColor="#C2C8D0" />
        <Box px="5" py="2">
          <Text textShadow="0.5px 0.5px #000000" pb="3">
            ジャンル
          </Text>
          <CheckBox
            checkBoxItems={characteristicCheckBoxItems}
            loadingCheckBoxItems={loadingCharacteristicCheckBoxItems}
            loadingSearchModel={loadingSearchWorldViews}
            vertical={false}
            checkBoxItemsDispatch={characteristicCheckBoxItemsDispatch}
          />
        </Box>
        <Divider borderColor="#C2C8D0" />
        <Box px="5" py="2">
          <Text textShadow="0.5px 0.5px #000000" pb="3">
            危険度
          </Text>
          <RiskLevelCheckBox />
        </Box>
        <Divider borderColor="#C2C8D0" />
        <Box px="5" py="2">
          <Text textShadow="0.5px 0.5px #000000" pb="3">
            ベストシーズン
          </Text>
          <NestedCheckBox
            checkBoxItems={monthCheckBoxItems}
            loadinCheckBoxItems={false}
            loadingSearchModel={loadingSearchWorldViews}
            checkBoxItemsDispatch={monthCheckBoxItemsDispatch}
          />
        </Box>
        <Divider borderColor="#C2C8D0" />
        <Box px="5" py="2">
          <Text textShadow="0.5px 0.5px #000000" pb="3">
            BMI
          </Text>
          <CheckBox
            checkBoxItems={bmiCheckBoxItems}
            loadingCheckBoxItems={false}
            loadingSearchModel={loadingSearchWorldViews}
            vertical
            checkBoxItemsDispatch={bmiCheckBoxItemsDispatch}
          />
        </Box>
      </Stack>
    </>
  );
};

export default FilterAccordionPanel;
