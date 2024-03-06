import { Box, Flex, HStack, Stack, useDisclosure } from "@chakra-ui/react";
import { AxiosResponse } from "axios";
import ClearButton from "components/ui-elements/ClearButton";
import FilterButton from "components/ui-elements/FilterButton";
import Loading from "components/ui-elements/Loading";
import Pagination from "components/ui-elements/Pagination";
import FilterAccordion from "components/ui-parts/FilterAccordion";
import FilterDrawer from "components/ui-parts/FilterDrawer";
import SortAccordion from "components/ui-parts/SortAccordion";
import getAllCategoriesApi from "features/worldView/api/categoryApi";
import getAllCharacteristicsApi from "features/worldView/api/characteristicApi";
import getAllCountriesApi from "features/worldView/api/countryApi";
import useWorldViewApi from "features/worldView/api/useWorldViewApi";
import SortSelectBox from "features/worldView/components/ui-elements/SortSelectBox";
import SortSelectBoxWithIcon from "features/worldView/components/ui-elements/SortSelectBoxWithIcon";
import FilterAccordionPanel from "features/worldView/components/ui-parts/FilterAccordionPanel";
import WorldViewList from "features/worldView/components/ui-parts/WorldViewList";
import useClear from "features/worldView/hooks/useClear";
import useGetCheckedLabels from "features/worldView/hooks/useGetCheckedLabels";
import { WorldView } from "features/worldView/types/api/worldView";
import useGetCheckItems from "hooks/api/useGetCheckItems";
import useGetModel from "hooks/api/useGetModel";
import useGetNestedCheckItems from "hooks/api/useGetNestedCheckItems";
import useDebounce from "hooks/useDebounce";
import { useWorldViewListContext } from "providers/WorldViewListProvider";
import { useCallback, useEffect } from "react";
import CheckItem from "types/checkItem";
import { NestedCheckItem } from "types/nestedCheckItem";

const WorldViewListPage = () => {
  const { state, dispatch } = useWorldViewListContext();
  const {
    keyword,
    loadingSearchWorldViews,
    riskLevel,
    bmiRange,
    monthRange,
    isSkipSearchApi,
    shouldDebounce,
    categoryCheckItems,
    countryCheckItems,
    characteristicCheckItems,
    sortCriteria,
    worldViews,
    currentPage,
    itemsOffset,
    isSkipGetCheckItmesApi,
  } = state;
  const { handleGetNestedCheckItems } = useGetNestedCheckItems();
  const { handleGetCheckItems } = useGetCheckItems();
  const { handleGetModel } = useGetModel();
  const { handleDebounceWithArg } = useDebounce(1500);
  const { searchWorldViewApi } = useWorldViewApi();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { handleClear } = useClear();
  const { checkedLabelObject } = useGetCheckedLabels();

  const loadingSearchWorldViewDispatch = (payload: boolean) => {
    dispatch({ type: "SET_LOADING_SEARCH_WORLDVIEWS", payload });
  };
  const worldViewDispatch = (responseData: WorldView[]) => {
    dispatch({ type: "SET_WORLD_VIEWS", payload: responseData });
  };
  useEffect(() => {
    if (!isSkipSearchApi) {
      if (shouldDebounce) {
        handleDebounceWithArg<{
          loadingSearchModelDispatch: (payload: boolean) => void;
          modelDispatch: (responseData: WorldView[]) => void;
          searchModelApi: () => Promise<AxiosResponse<WorldView[]>>;
        }>({
          fn: handleGetModel,
          arg: {
            loadingSearchModelDispatch: loadingSearchWorldViewDispatch,
            modelDispatch: worldViewDispatch,
            searchModelApi: searchWorldViewApi,
          },
        });
        dispatch({ type: "SET_SHOULD_DEBOUNCE", payload: false });
      } else {
        handleGetModel<WorldView>({
          loadingSearchModelDispatch: loadingSearchWorldViewDispatch,
          modelDispatch: worldViewDispatch,
          searchModelApi: searchWorldViewApi,
        });
      }
      if (currentPage !== 1 && itemsOffset !== 0) {
        dispatch({ type: "SET_ITEMS_OFFSET", payload: 0 });
        dispatch({ type: "SET_CURRENT_PAGE", payload: 1 });
      }
    } else {
      dispatch({ type: "SET_IS_SKIP_SEARCH_API", payload: false });
    }
  }, [
    categoryCheckItems,
    countryCheckItems,
    characteristicCheckItems,
    riskLevel,
    keyword,
    sortCriteria,
  ]);

  const loadingGetCategoryDispatch = (payload: boolean) => {
    dispatch({ type: "SET_LOADING_GET_CATEGORY", payload });
  };
  const categoryCheckItemsDispatch = (newCheckItems: NestedCheckItem[]) => {
    dispatch({ type: "SET_CATEGORY_CHECK_ITEMS", payload: newCheckItems });
  };
  const loadingGetCountryDispatch = (payload: boolean) => {
    dispatch({ type: "SET_LOADING_GET_COUNTRY", payload });
  };
  const countryCheckItemsDispatch = (newCheckItems: NestedCheckItem[]) => {
    dispatch({ type: "SET_COUNTRY_CHECK_ITEMS", payload: newCheckItems });
  };
  const loadingGetCharacteristicDispatch = (payload: boolean) => {
    dispatch({ type: "SET_LOADING_GET_CHARACTERISTIC", payload });
  };
  const characteristicCheckItemsDispatch = (newCheckItems: CheckItem[]) => {
    dispatch({
      type: "SET_CHARACTERISTIC_CHECK_ITEMS",
      payload: newCheckItems,
    });
  };
  useEffect(() => {
    if (!isSkipGetCheckItmesApi) {
      handleGetNestedCheckItems({
        loadingGetModelDispatch: loadingGetCategoryDispatch,
        checkItemsDispatch: categoryCheckItemsDispatch,
        getAllModelApi: getAllCategoriesApi,
      });
      handleGetNestedCheckItems({
        loadingGetModelDispatch: loadingGetCountryDispatch,
        checkItemsDispatch: countryCheckItemsDispatch,
        getAllModelApi: getAllCountriesApi,
      });
      handleGetCheckItems({
        loadingModelDispatch: loadingGetCharacteristicDispatch,
        checkItemsDispatch: characteristicCheckItemsDispatch,
        fetchModelApi: getAllCharacteristicsApi,
      });
    } else {
      dispatch({ type: "SET_IS_SKIP_GET_CHECK_ITEMS_API", payload: false });
    }
  }, []);

  const itemsPerPage = 40;
  const endOffset = itemsOffset + itemsPerPage;
  const currentViews = worldViews.slice(itemsOffset, endOffset);
  const pageCount = Math.ceil(worldViews.length / itemsPerPage);
  const handlePageChange = useCallback(
    (newPage: number) => {
      dispatch({ type: "SET_CURRENT_PAGE", payload: newPage });
      const newOffset = (newPage - 1) * itemsPerPage;
      dispatch({ type: "SET_ITEMS_OFFSET", payload: newOffset });
    },
    [itemsPerPage]
  );

  return (
    <Box mx={{ base: "2", sm: "4", md: "5" }} my={{ base: "8", sm: "10", md: "12" }}>
      <HStack mb={{ base: 2, sm: 3 }} display={{ base: "flex", md: "none" }} flexWrap="wrap">
        <FilterButton onOpen={onOpen} />
        <SortSelectBoxWithIcon />
        {checkedLabelObject.categoryLabels.length ||
        checkedLabelObject.countryLabels.length ||
        checkedLabelObject.characteristicLabels.length ||
        riskLevel !== undefined ||
        !(monthRange[0] === 1 && monthRange[1] === 12) ||
        !(bmiRange[0] === -40 && bmiRange[1] === 30) ||
        keyword ? (
          <Box>
            <ClearButton loadingSearchModels={loadingSearchWorldViews} handleClear={handleClear} />
          </Box>
        ) : null}
      </HStack>
      <Flex>
        <Box display={{ base: "none", md: "block" }} h="100%" mr="6">
          <Stack w="250px" h="100%" spacing="3" mb="16">
            <SortAccordion>
              <SortSelectBox />
            </SortAccordion>
            <FilterAccordion>
              <FilterAccordionPanel />
            </FilterAccordion>
          </Stack>
        </Box>
        <Box w="100%">
          {loadingSearchWorldViews ? (
            <Loading />
          ) : (
            <>
              <WorldViewList currentViews={currentViews} />
              <Pagination
                pageCount={pageCount}
                currentPage={currentPage}
                handlePageChange={handlePageChange}
              />
            </>
          )}
        </Box>
      </Flex>
      <FilterDrawer isOpen={isOpen} onClose={onClose}>
        <FilterAccordionPanel />
      </FilterDrawer>
    </Box>
  );
};

export default WorldViewListPage;
