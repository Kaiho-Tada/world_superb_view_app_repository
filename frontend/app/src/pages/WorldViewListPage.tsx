import { Box, Flex, HStack, Stack, useDisclosure } from "@chakra-ui/react";
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
import useGetCheckBoxItems from "hooks/api/useGetCheckBoxItems";
import useGetNestedCheckBoxItems from "hooks/api/useGetNestedCheckBoxItems";
import useSearchModel from "hooks/api/useSearchModel";
import useDebounce from "hooks/useDebounce";
import { useWorldViewListContext } from "providers/WorldViewListProvider";
import { useCallback, useEffect, useState } from "react";
import { CheckBoxItem } from "types/checkBoxItem";
import { NestedCheckBoxItem } from "types/nestedCheckBoxItem";

const WorldViewListPage = () => {
  const { state, dispatch } = useWorldViewListContext();
  const { keyword, loadingSearchWorldViews } = state;
  const { handleGetNestedCheckBoxItems } = useGetNestedCheckBoxItems();
  const { handleGetCheckBoxItems } = useGetCheckBoxItems();
  const { handleSearchModel } = useSearchModel();
  const { handleDebounceWithArg } = useDebounce(1500);
  const { searchWorldViewApi } = useWorldViewApi();

  const loadingSearchWorldViewDispatch = (payload: boolean) => {
    dispatch({ type: "SET_LOADING_SEARCH_WORLDVIEWS", payload });
  };
  const worldViewDispatch = (responseData: WorldView[]) => {
    dispatch({ type: "SET_WORLD_VIEWS", payload: responseData });
  };

  useEffect(() => {
    if (state.shouldDebounce) {
      handleDebounceWithArg<WorldView>({
        fn: handleSearchModel,
        arg: {
          loadingSearchModelDispatch: loadingSearchWorldViewDispatch,
          modelDispatch: worldViewDispatch,
          searchModelApi: searchWorldViewApi,
        },
      });
      dispatch({ type: "SET_SHOULD_DEBOUNCE", payload: false });
    } else {
      handleSearchModel<WorldView>({
        loadingSearchModelDispatch: loadingSearchWorldViewDispatch,
        modelDispatch: worldViewDispatch,
        searchModelApi: searchWorldViewApi,
      });
    }
  }, [
    state.categoryCheckBoxItems,
    state.countryCheckBoxItems,
    state.characteristicCheckItems,
    state.riskLevelCheckBoxItems,
    state.monthCheckBoxItems,
    state.bmiCheckBoxItems,
    state.keyword,
    state.sortCriteria,
  ]);

  useEffect(() => {
    handleGetNestedCheckBoxItems({
      loadingGetModelDispatch: (payload: boolean) => {
        dispatch({ type: "SET_LOADING_GET_CATEGORY", payload });
      },
      checkBoxItemsDispatch: (newCheckBoxItems: NestedCheckBoxItem[]) => {
        dispatch({ type: "SET_CATEGORY_CHECKBOX_ITEMS", payload: newCheckBoxItems });
      },
      getAllModelApi: getAllCategoriesApi,
    });
    handleGetNestedCheckBoxItems({
      loadingGetModelDispatch: (payload: boolean) => {
        dispatch({ type: "SET_LOADING_GET_COUNTRY", payload });
      },
      checkBoxItemsDispatch: (newCheckBoxItems: NestedCheckBoxItem[]) => {
        dispatch({ type: "SET_COUNTRY_CHECKBOX_ITEMS", payload: newCheckBoxItems });
      },
      getAllModelApi: getAllCountriesApi,
    });
    handleGetCheckBoxItems({
      loadingGetModelDispatch: (payload: boolean) => {
        dispatch({ type: "SET_LOADING_GET_CHARACTERISTIC", payload });
      },
      checkBoxItemsDispatch: (newCheckBoxItems: CheckBoxItem[]) => {
        dispatch({
          type: "SET_CHARACTERISTIC_CHECK_ITEMS",
          payload: newCheckBoxItems,
        });
      },
      getAllModelApi: getAllCharacteristicsApi,
    });
  }, []);

  const [itemsOffset, setItemsOffset] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const endOffset = itemsOffset + itemsPerPage;
  const currentViews = state.worldViews.slice(itemsOffset, endOffset);
  const pageCount = Math.ceil(state.worldViews.length / itemsPerPage);
  const handlePageChange = useCallback(
    (newPage: number) => {
      setCurrentPage(newPage);
      const newOffset = (newPage - 1) * itemsPerPage;
      setItemsOffset(newOffset);
    },
    [itemsPerPage]
  );

  useEffect(() => {
    setItemsOffset(0);
    setCurrentPage(1);
  }, [state.worldViews]);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const { handleClear } = useClear();
  const { checkedLabelObject } = useGetCheckedLabels();

  return (
    <Box mx={{ base: "2", sm: "4", md: "5" }} my={{ base: "8", sm: "10", md: "12" }}>
      <HStack mb={{ base: 2, sm: 3 }} display={{ base: "flex", md: "none" }} flexWrap="wrap">
        <FilterButton onOpen={onOpen} />
        <SortSelectBoxWithIcon />
        {checkedLabelObject.categoryLabels.length ||
        checkedLabelObject.countryLabels.length ||
        checkedLabelObject.characteristicLabels.length ||
        checkedLabelObject.riskLevelLabels.length ||
        checkedLabelObject.monthLabels.length ||
        checkedLabelObject.bmiLabels.length ||
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
        <Box>
          {state.loadingSearchWorldViews ? (
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
