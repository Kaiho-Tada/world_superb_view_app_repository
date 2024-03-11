import { Box } from "@chakra-ui/react";
import defaultImg from "assets/default.png";
import { AxiosResponse } from "axios";
import ClickHandler from "features/map/components/ui-elements/ClickHandler";
import ZoomDependentImageOverlay from "features/map/components/ui-elements/ZoomDependentImageOverlay";
import WorldViewList from "features/map/components/ui-parts/WorldViewList";
import useWorldViewApi from "features/worldView/api/useWorldViewApi";
import FilterSearchBox from "features/worldView/components/ui-elements/FilterSearchBox";
import { WorldView } from "features/worldView/types/api/worldView";
import useGetModel from "hooks/api/useGetModel";
import useDebounce from "hooks/useDebounce";
import "leaflet/dist/leaflet.css";
import { useWorldViewListContext } from "providers/WorldViewListProvider";
import { useEffect, useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";

const Map = () => {
  const { state, dispatch } = useWorldViewListContext();
  const { worldViews, keyword, isSkipSearchApi, shouldDebounce } = state;
  const { handleGetModel } = useGetModel();
  const { handleDebounceWithArg } = useDebounce(1500);
  const { searchWorldViewApi } = useWorldViewApi();
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
  }, [keyword]);

  return (
    <Box bg="white" style={{ position: "relative" }}>
      <Box style={{ position: "absolute", zIndex: 1, left: "33%", width: "30%" }} mt="3">
        <FilterSearchBox />
      </Box>
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
