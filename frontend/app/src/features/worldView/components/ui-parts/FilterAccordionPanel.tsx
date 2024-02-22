import { Box, Divider, Stack, Text } from "@chakra-ui/react";
import CheckItemBox from "components/ui-elements/CheckItemBox";
import ClearButton from "components/ui-elements/ClearButton";
import FilterRangeSlider from "components/ui-elements/FilterRangeSlider";
import FilterSearchBox from "components/ui-elements/FilterSearchBox";
import NestedCheckBox from "components/ui-elements/NestedCheckBox";
import SearchButton from "components/ui-elements/SearchButton";
import useWorldViewApi from "features/worldView/api/useWorldViewApi";
import useClear from "features/worldView/hooks/useClear";
import useGetCheckedLabels from "features/worldView/hooks/useGetCheckedLabels";
import { WorldView } from "features/worldView/types/api/worldView";
import useSearchModel from "hooks/api/useSearchModel";
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
    loadingGetCategory,
    countryCheckBoxItems,
    loadingGetCountry,
    characteristicCheckItems,
    loadingGetCharacteristic,
    monthCheckBoxItems,
    bmiRange,
    isDisabledSearchButton,
  } = state;

  const keywordDispatch = (newKeyword: string) => {
    dispatch({ type: "SET_KEYWORD", payload: newKeyword });
  };
  const shouldDebounceDispatch = (payload: boolean) => {
    dispatch({ type: "SET_SHOULD_DEBOUNCE", payload });
  };

  const characteristicCheckItemsDispatch = useCallback((newCheckItems: CheckBoxItem[]) => {
    dispatch({
      type: "SET_CHARACTERISTIC_CHECK_ITEMS",
      payload: newCheckItems,
    });
  }, []);

  const bmiRangeDispatch = useCallback(
    (newBmiRange: number[]) => {
      if (isDisabledSearchButton) {
        dispatch({ type: "SET_IS_DISABLED_SEARCH_BUTTON", payload: false });
      }
      dispatch({ type: "SET_BMI_RANGE", payload: newBmiRange });
    },
    [isDisabledSearchButton]
  );

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

  const { handleSearchModel } = useSearchModel();

  const worldViewDispatch = (responseData: WorldView[]) => {
    dispatch({ type: "SET_WORLD_VIEWS", payload: responseData });
  };

  const loadingSearchWorldViewDispatch = (payload: boolean) => {
    dispatch({ type: "SET_LOADING_SEARCH_WORLDVIEWS", payload });
  };
  const { searchWorldViewApi } = useWorldViewApi();

  const handleClickSearchButton = useCallback(() => {
    if (!isDisabledSearchButton) {
      dispatch({ type: "SET_IS_DISABLED_SEARCH_BUTTON", payload: true });
    }
    handleSearchModel<WorldView>({
      modelDispatch: worldViewDispatch,
      loadingSearchModelDispatch: loadingSearchWorldViewDispatch,
      searchModelApi: searchWorldViewApi,
    });
  }, [isDisabledSearchButton, searchWorldViewApi]);

  return (
    <>
      {checkedLabelObject.categoryLabels.length ||
      checkedLabelObject.countryLabels.length ||
      checkedLabelObject.characteristicLabels.length ||
      checkedLabelObject.riskLevelLabels.length ||
      checkedLabelObject.monthLabels.length ||
      !(bmiRange[0] === -40 && bmiRange[1] === 30) ||
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
            loadingGetCheckBoxItems={loadingGetCategory}
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
            loadingGetCheckBoxItems={loadingGetCountry}
            loadingSearchModel={loadingSearchWorldViews}
            checkBoxItemsDispatch={countryCheckBoxItemsDispatch}
          />
        </Box>
        <Divider borderColor="#C2C8D0" />
        <Box px="5" py="2">
          <Text textShadow="0.5px 0.5px #000000" pb="3">
            ジャンル
          </Text>
          <CheckItemBox
            checkItems={characteristicCheckItems}
            loadingGetModels={loadingGetCharacteristic}
            loadingSearchModels={loadingSearchWorldViews}
            checkItemsDispatch={characteristicCheckItemsDispatch}
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
            loadingGetCheckBoxItems={false}
            loadingSearchModel={loadingSearchWorldViews}
            checkBoxItemsDispatch={monthCheckBoxItemsDispatch}
          />
        </Box>
        <Divider borderColor="#C2C8D0" />
        <Box px="5" py="2">
          <Text textShadow="0.5px 0.5px #000000" pb="3">
            BMI
          </Text>
          <FilterRangeSlider
            value={bmiRange}
            min={-40}
            max={30}
            step={5}
            handleChange={bmiRangeDispatch}
          />
        </Box>
        <Divider borderColor="#C2C8D0" />
        <Box px="5" py="2">
          <SearchButton
            handleClick={handleClickSearchButton}
            loadingSearchModels={loadingSearchWorldViews}
            disabled={isDisabledSearchButton}
          />
        </Box>
      </Stack>
    </>
  );
};

export default FilterAccordionPanel;
