import useWorldViewApi from "features/worldView/api/useWorldViewApi";
import { WorldView } from "features/worldView/types/api/worldView";
import useGetModel from "hooks/api/useGetModel";
import useDebounce from "hooks/useDebounce";
import { useMapContext } from "providers/MapProvider";
import { useWorldViewListContext } from "providers/WorldViewListProvider";
import { useEffect } from "react";
import { useMapEvents } from "react-leaflet";

const ClickWorldViewHandler = () => {
  const { state, dispatch: viewDispatch } = useWorldViewListContext();
  const { dispatch: mapDispatch } = useMapContext();
  const { handleDebounce } = useDebounce(1500);
  const { searchWorldViewApi } = useWorldViewApi();
  const { handleGetModel } = useGetModel();

  const {
    worldViews,
    categoryCheckItems,
    countryCheckItems,
    characteristicCheckItems,
    riskLevel,
    keyword,
    isSkipSearchWorldViews,
    shouldDebounce,
  } = state;

  const loadingSearchWorldViewsDispatch = (payload: boolean) => {
    viewDispatch({ type: "SET_LOADING_SEARCH_WORLDVIEWS", payload });
  };
  const worldViesDispatch = (responseData: WorldView[]) => {
    viewDispatch({ type: "SET_WORLD_VIEWS", payload: responseData });
  };
  const handleSearchWorldViews = () => {
    handleGetModel<WorldView>({
      loadingGetModelDispatch: loadingSearchWorldViewsDispatch,
      modelDispatch: worldViesDispatch,
      getModelApi: searchWorldViewApi,
    });
  };
  useEffect(() => {
    if (!isSkipSearchWorldViews) {
      if (!shouldDebounce) {
        handleSearchWorldViews();
      } else {
        handleDebounce(handleSearchWorldViews);
        viewDispatch({ type: "SET_SHOULD_DEBOUNCE", payload: false });
      }
    }
    viewDispatch({ type: "SET_IS_SKIP_SEARCH_WORLD_VIEWS", payload: false });
  }, [categoryCheckItems, countryCheckItems, characteristicCheckItems, riskLevel, keyword]);

  useMapEvents({
    click(e) {
      const clickedLatLng = e.latlng;
      const nearbyWorldViews = worldViews?.filter((v) => {
        const latDiff = Math.abs(v.latitude - clickedLatLng.lat);
        const lngDiff = Math.abs(v.longitude - clickedLatLng.lng);
        return latDiff <= 0.3 && lngDiff <= 0.3;
      });
      if (nearbyWorldViews && nearbyWorldViews.length > 0) {
        mapDispatch({ type: "SET_CLICKED_WORLD_VIEWS", payload: nearbyWorldViews });
      } else {
        mapDispatch({ type: "SET_CLICKED_WORLD_VIEWS", payload: null });
      }
    },
  });
  return null;
};
export default ClickWorldViewHandler;
