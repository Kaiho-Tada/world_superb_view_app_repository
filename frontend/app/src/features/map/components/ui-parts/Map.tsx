import { Box } from "@chakra-ui/react";
import defaultImg from "assets/default.png";
import ClickHandler from "features/map/components/ui-elements/ClickHandler";
import ZoomDependentImageOverlay from "features/map/components/ui-elements/ZoomDependentImageOverlay";
import WorldViewList from "features/map/components/ui-parts/WorldViewList";
import getAllWorldViewsApi from "features/worldView/api/getAllWorldViewsApi";
import { WorldView } from "features/worldView/types/api/worldView";
import useGetModel from "hooks/api/useGetModel";
import "leaflet/dist/leaflet.css";
import { useWorldViewListContext } from "providers/WorldViewListProvider";
import { useEffect, useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";

const Map = () => {
  const { state, dispatch } = useWorldViewListContext();
  const { worldViews } = state;
  const [clickedViews, setClickedViews] = useState<
    Pick<WorldView, "id" | "name" | "imgUrl" | "countries" | "latitude" | "longitude">[] | undefined
  >(undefined);

  const loadingGetWorldViewDispatch = (payload: boolean) => {
    dispatch({ type: "SET_LOADING_GET_WORLDVIEWS", payload });
  };
  const worldViewDispatch = (responseData: WorldView[]) => {
    dispatch({ type: "SET_WORLD_VIEWS", payload: responseData });
  };
  const { handleGetModel } = useGetModel();

  useEffect(() => {
    handleGetModel<WorldView>({
      loadingGetModelDispatch: loadingGetWorldViewDispatch,
      modelDispatch: worldViewDispatch,
      getModelApi: getAllWorldViewsApi,
    });
  }, []);

  return (
    <Box bg="white">
      <MapContainer
        center={[30, 0]}
        zoom={2}
        scrollWheelZoom={false}
        style={{ height: "65vh", width: "100%" }}
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
