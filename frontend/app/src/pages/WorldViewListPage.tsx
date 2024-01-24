import { Box, Flex } from "@chakra-ui/react";
import Loading from "components/ui-elements/Loading";
import Pagination from "components/ui-elements/Pagination";
import getAllCategoriesApi from "features/worldView/api/categoryApi";
import getAllCountriesApi from "features/worldView/api/countryApi";
import useWorldViewApi from "features/worldView/api/useWorldViewApi";
import FilterButton from "features/worldView/components/ui-elements/FilterButton";
import SortSelectBox from "features/worldView/components/ui-elements/SortSelectBox";
import FilterAccordion from "features/worldView/components/ui-parts/FilterAccordion";
import FilterDrawer from "features/worldView/components/ui-parts/FilterDrawer";
import WorldViewList from "features/worldView/components/ui-parts/WorldViewList";
import useGetCharacteristicCheckBoxItems from "features/worldView/hooks/api/useGetCharacteristicCheckBoxItems";
import { WorldView } from "features/worldView/types/api/worldView";
import useGetNestedCheckBoxItems from "hooks/api/useGetNestedCheckBoxItems";
import useSearchModel from "hooks/api/useSearchModel";
import useDebounce from "hooks/useDebounce";
import { useWorldViewListContext } from "providers/WorldViewListProvider";
import { memo, useEffect, useState } from "react";
import { NestedCheckBoxItem } from "types/nestedCheckBoxItem";

const WorldViewListPage = memo(() => {
  const { state, dispatch } = useWorldViewListContext();
  const { handleGetNestedCheckBoxItems } = useGetNestedCheckBoxItems();
  const { getCharacteristicCheckBoxItems } = useGetCharacteristicCheckBoxItems();
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
    state.characteristicCheckBoxItems,
    state.riskLevelCheckBoxItems,
    state.monthCheckBoxItems,
    state.bmiCheckBoxItems,
    state.keyword,
    state.sortCriteria,
  ]);

  useEffect(() => {
    handleGetNestedCheckBoxItems({
      loadingCheckBoxItemsDispatch: (payload: boolean) => {
        dispatch({ type: "SET_LOADING_CATEGORY_CHECKBOX_ITEMS", payload });
      },
      checkBoxItemsDispatch: (newCheckBoxItems: NestedCheckBoxItem[]) => {
        dispatch({ type: "SET_CATEGORY_CHECKBOX_ITEMS", payload: newCheckBoxItems });
      },
      getAllModelApi: getAllCategoriesApi,
    });
    handleGetNestedCheckBoxItems({
      loadingCheckBoxItemsDispatch: (payload: boolean) => {
        dispatch({ type: "SET_LOADING_COUNTRY_CHECKBOX_ITEMS", payload });
      },
      checkBoxItemsDispatch: (newCheckBoxItems: NestedCheckBoxItem[]) => {
        dispatch({ type: "SET_COUNTRY_CHECKBOX_ITEMS", payload: newCheckBoxItems });
      },
      getAllModelApi: getAllCountriesApi,
    });
    getCharacteristicCheckBoxItems();
  }, []);

  const [itemsOffset, setItemsOffset] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const endOffset = itemsOffset + itemsPerPage;
  const currentViews = state.worldViews.slice(itemsOffset, endOffset);
  const pageCount = Math.ceil(state.worldViews.length / itemsPerPage);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    const newOffset = (newPage - 1) * itemsPerPage;
    setItemsOffset(newOffset);
  };

  useEffect(() => {
    setItemsOffset(0);
    setCurrentPage(1);
  }, [state.worldViews]);

  return (
    <Box my="10" mx={{ base: "0", sm: "6", lg: "10" }}>
      <Flex mb="6">
        <FilterButton />
        <SortSelectBox />
      </Flex>
      <FilterDrawer />
      <Flex>
        <FilterAccordion />
        <Box w={{ sm: "100%", lg: state.isOpenFilterAccordion ? "78%" : "100%" }}>
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
    </Box>
  );
});

export default WorldViewListPage;
