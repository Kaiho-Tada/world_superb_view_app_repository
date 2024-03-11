import { Box, useDisclosure } from "@chakra-ui/react";
import defaultImg from "assets/default.png";
import { AxiosResponse } from "axios";
import FilterDrawer from "components/ui-parts/FilterDrawer";
import ClickHandler from "features/map/components/ui-elements/ClickHandler";
import ZoomDependentImageOverlay from "features/map/components/ui-elements/ZoomDependentImageOverlay";
import WorldViewList from "features/map/components/ui-parts/WorldViewList";
import getAllCategoriesApi from "features/worldView/api/categoryApi";
import getAllCharacteristicsApi from "features/worldView/api/characteristicApi";
import getAllCountriesApi from "features/worldView/api/countryApi";
import useWorldViewApi from "features/worldView/api/useWorldViewApi";
import FilterSearchBox from "features/worldView/components/ui-elements/FilterSearchBox";
import FilterAccordionPanel from "features/worldView/components/ui-parts/FilterAccordionPanel";
import { WorldView } from "features/worldView/types/api/worldView";
import useGetCheckItems from "hooks/api/useGetCheckItems";
import useGetModel from "hooks/api/useGetModel";
import useGetNestedCheckItems from "hooks/api/useGetNestedCheckItems";
import useDebounce from "hooks/useDebounce";
import "leaflet/dist/leaflet.css";
import { useWorldViewListContext } from "providers/WorldViewListProvider";
import { useEffect, useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import CheckItem from "types/checkItem";
import { NestedCheckItem } from "types/nestedCheckItem";
import MenuIconButton from "../ui-elements/MenuButton";

const Map = () => {
  const { state, dispatch } = useWorldViewListContext();
  const {
    worldViews,
    categoryCheckItems,
    countryCheckItems,
    characteristicCheckItems,
    riskLevel,
    keyword,
    sortCriteria,
    isSkipSearchApi,
    shouldDebounce,
    isSkipGetCheckItmesApi,
  } = state;
  const { handleGetModel } = useGetModel();
  const { handleDebounceWithArg } = useDebounce(1500);
  const { searchWorldViewApi } = useWorldViewApi();
  const { handleGetCheckItems } = useGetCheckItems();
  const { handleGetNestedCheckItems } = useGetNestedCheckItems();
  const [clickedViews, setClickedViews] = useState<
    Pick<WorldView, "id" | "name" | "imgUrl" | "countries" | "latitude" | "longitude">[] | undefined
  >(undefined);

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
          loadingGetModelDispatch: (payload: boolean) => void;
          modelDispatch: (responseData: WorldView[]) => void;
          getModelApi: () => Promise<AxiosResponse<WorldView[]>>;
        }>({
          fn: handleGetModel,
          arg: {
            loadingGetModelDispatch: loadingSearchWorldViewDispatch,
            modelDispatch: worldViewDispatch,
            getModelApi: searchWorldViewApi,
          },
        });
        dispatch({ type: "SET_SHOULD_DEBOUNCE", payload: false });
      } else {
        handleGetModel<WorldView>({
          loadingGetModelDispatch: loadingSearchWorldViewDispatch,
          modelDispatch: worldViewDispatch,
          getModelApi: searchWorldViewApi,
        });
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
        loadingGetModelDispatch: loadingGetCharacteristicDispatch,
        checkItemsDispatch: characteristicCheckItemsDispatch,
        getModelApi: getAllCharacteristicsApi,
      });
    } else {
      dispatch({ type: "SET_IS_SKIP_GET_CHECK_ITEMS_API", payload: false });
    }
  }, []);

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box bg="white" style={{ position: "relative" }}>
      <Box style={{ position: "absolute", zIndex: 1, left: "33%", width: "30%" }} mt="3">
        <FilterSearchBox />
      </Box>
      <Box style={{ position: "absolute", zIndex: 1, right: "1%" }} mt="1">
        <MenuIconButton onOpen={onOpen} />
      </Box>
      <FilterDrawer isOpen={isOpen} onClose={onClose}>
        <FilterAccordionPanel />
      </FilterDrawer>
      <MapContainer
        center={[30, 0]}
        zoom={2}
        scrollWheelZoom={false}
        style={{ height: "65vh", width: "100%", position: "relative", zIndex: 0 }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {worldViews.map((worldView) => (
          <ZoomDependentImageOverlay
            key={worldView.id}
            latlong={[worldView.latitude, worldView.longitude]}
            url={worldView.imgUrl || defaultImg}
          />
        ))}
        <ClickHandler worldViews={worldViews} setClickedViews={setClickedViews} />
      </MapContainer>
      <WorldViewList clickedViews={clickedViews} />
    </Box>
  );
};

export default Map;
