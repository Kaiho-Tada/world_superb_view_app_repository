import FilterDrawer from "components/ui-parts/FilterDrawer";
import getAllCategoriesApi from "features/worldView/api/categoryApi";
import getAllCharacteristicsApi from "features/worldView/api/characteristicApi";
import getAllCountriesApi from "features/worldView/api/countryApi";
import FilterAccordionPanel from "features/worldView/components/ui-parts/FilterAccordionPanel";
import useGetCheckItems from "hooks/api/useGetCheckItems";
import useGetNestedCheckItems from "hooks/api/useGetNestedCheckItems";
import "leaflet/dist/leaflet.css";
import { useWorldViewListContext } from "providers/WorldViewListProvider";
import { FC, useEffect } from "react";
import CheckItem from "types/checkItem";
import { NestedCheckItem } from "types/nestedCheckItem";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}
const WorldViewFilterDrawer: FC<Props> = ({ isOpen, onClose }) => {
  const { state, dispatch } = useWorldViewListContext();
  const { isSkipGetCheckItmes, isVisitedDetailPage } = state;
  const { handleGetCheckItems } = useGetCheckItems();
  const { handleGetNestedCheckItems } = useGetNestedCheckItems();

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
    if (!isSkipGetCheckItmes && !isVisitedDetailPage) {
      handleGetCheckItems({
        loadingGetModelDispatch: loadingGetCharacteristicDispatch,
        checkItemsDispatch: characteristicCheckItemsDispatch,
        getModelApi: getAllCharacteristicsApi,
      });
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
    }
    if (isSkipGetCheckItmes) {
      dispatch({ type: "SET_IS_SKIP_GET_CHECK_ITEMS", payload: false });
    }
    if (isVisitedDetailPage) {
      dispatch({ type: "SET_IS_VISIT_DETAIL_PAGE", payload: false });
    }
  }, []);

  return (
    <FilterDrawer isOpen={isOpen} onClose={onClose}>
      <FilterAccordionPanel />
    </FilterDrawer>
  );
};

export default WorldViewFilterDrawer;
