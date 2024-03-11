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
import useGetModel from "hooks/api/useGetModel";
import { useWorldViewListContext } from "providers/WorldViewListProvider";
import { useCallback } from "react";
import CheckItem from "types/checkItem";
import { NestedCheckItem } from "types/nestedCheckItem";
import RiskLevelCheckBox from "../ui-elements/RiskLevelRadioButton";

const FilterAccordionPanel = () => {
  const { state, dispatch } = useWorldViewListContext();
  const {
    keyword,
    loadingSearchWorldViews,
    categoryCheckItems,
    loadingGetCategory,
    countryCheckItems,
    loadingGetCountry,
    characteristicCheckItems,
    loadingGetCharacteristic,
    monthRange,
    bmiRange,
    isDisabledSearchButton,
    riskLevel,
    currentPage,
    itemsOffset,
  } = state;

  const keywordDispatch = (newKeyword: string) => {
    dispatch({ type: "SET_KEYWORD", payload: newKeyword });
  };
  const shouldDebounceDispatch = (payload: boolean) => {
    dispatch({ type: "SET_SHOULD_DEBOUNCE", payload });
  };

  const characteristicCheckItemsDispatch = useCallback((newCheckItems: CheckItem[]) => {
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

  const categoryCheckItemsDispatch = useCallback((newCheckBoxItems: NestedCheckItem[]) => {
    dispatch({
      type: "SET_CATEGORY_CHECK_ITEMS",
      payload: newCheckBoxItems,
    });
  }, []);
  const countryCheckItemsDispatch = useCallback((newCheckBoxItems: NestedCheckItem[]) => {
    dispatch({
      type: "SET_COUNTRY_CHECK_ITEMS",
      payload: newCheckBoxItems,
    });
  }, []);
  const monthRangeDispatch = useCallback(
    (newMonthRange: number[]) => {
      if (isDisabledSearchButton) {
        dispatch({ type: "SET_IS_DISABLED_SEARCH_BUTTON", payload: false });
      }
      dispatch({ type: "SET_MONTH_RANGE", payload: newMonthRange });
    },
    [isDisabledSearchButton]
  );

  const { handleClear } = useClear();
  const { checkedLabelObject } = useGetCheckedLabels();

  const { handleGetModel } = useGetModel();

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
    handleGetModel<WorldView>({
      modelDispatch: worldViewDispatch,
      loadingGetModelDispatch: loadingSearchWorldViewDispatch,
      getModelApi: searchWorldViewApi,
    });
    if (currentPage !== 1 && itemsOffset !== 0) {
      dispatch({ type: "SET_CURRENT_PAGE", payload: 1 });
      dispatch({ type: "SET_ITEMS_OFFSET", payload: 0 });
    }
  }, [isDisabledSearchButton, searchWorldViewApi]);

  const isSkipSearchWorldViewsDispatch = (payload: boolean) => {
    dispatch({ type: "SET_IS_SKIP_SEARCH_WORLD_VIEWS", payload });
  };

  return (
    <>
      {checkedLabelObject.categoryLabels.length ||
      checkedLabelObject.countryLabels.length ||
      checkedLabelObject.characteristicLabels.length ||
      riskLevel !== undefined ||
      !(monthRange[0] === 1 && monthRange[1] === 12) ||
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
            checkItems={categoryCheckItems}
            loadingGetCheckItems={loadingGetCategory}
            loadingSearchModel={loadingSearchWorldViews}
            checkItemsDispatch={categoryCheckItemsDispatch}
            isSkipSearchApiDispatch={isSkipSearchWorldViewsDispatch}
          />
        </Box>
        <Divider borderColor="#C2C8D0" />
        <Box px="5" py="2">
          <Text textShadow="0.5px 0.5px #000000" pb="3">
            地域
          </Text>
          <NestedCheckBox
            checkItems={countryCheckItems}
            loadingGetCheckItems={loadingGetCountry}
            loadingSearchModel={loadingSearchWorldViews}
            checkItemsDispatch={countryCheckItemsDispatch}
            isSkipSearchApiDispatch={isSkipSearchWorldViewsDispatch}
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
          <FilterRangeSlider
            value={monthRange}
            min={1}
            max={12}
            step={1}
            handleChange={monthRangeDispatch}
            rangeLabel="Month"
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
            step={10}
            handleChange={bmiRangeDispatch}
            rangeLabel="BMI"
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
