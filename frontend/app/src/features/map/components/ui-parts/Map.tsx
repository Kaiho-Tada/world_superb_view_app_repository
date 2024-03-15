import { Box, useDisclosure } from "@chakra-ui/react";
import ClickWorldViewHandler from "features/map/components/ui-elements/ClickWorldViewHandler";
import ClickedWorldViewList from "features/map/components/ui-parts/ClickedWorldViewList";
import "leaflet/dist/leaflet.css";
import { useMapContext } from "providers/MapProvider";
import { MapContainer, TileLayer } from "react-leaflet";
import ClickVideoHandler from "../ui-elements/ClickVideoHandler";
import MapRadioButton from "../ui-elements/MapRadioButton";
import MenuButton from "../ui-elements/MenuButton";
import VideoFilterSearchBox from "../ui-elements/VideoFilterSearchBox";
import VideoImageOverlays from "../ui-elements/VideoImageOverlays";
import WorldViewFilterSearchBox from "../ui-elements/WorldViewFilterSearchBox";
import WorldViewImageOverlays from "../ui-elements/WorldViewImageOverlays";
import ClickedVideoList from "./ClickedVideoList";
import VideoFilterDrawer from "./VideoFilterDrawer";
import WorldViewFilterDrawer from "./WorldViewFilterDrawer";

const Map = () => {
  const { state } = useMapContext();
  const { visibleValue } = state;
  const {
    isOpen: isOpenWorldView,
    onOpen: onOpenWorldView,
    onClose: onCloseWorldView,
  } = useDisclosure();
  const { isOpen: isOpenVideo, onOpen: onOpenVideo, onClose: onCloseVideo } = useDisclosure();

  return (
    <Box bg="white" style={{ position: "relative" }}>
      <Box style={{ position: "absolute", zIndex: 1, left: "33%", width: "30%" }} mt="3">
        {visibleValue === "worldView" ? <WorldViewFilterSearchBox /> : <VideoFilterSearchBox />}
      </Box>
      <Box
        style={{ position: "absolute", zIndex: 1, left: "1%" }}
        mt="20"
        bg="#FFF"
        color="gray.600"
        py="2"
        px="2"
        borderRadius="3px"
        border="1px solid #000"
      >
        <MapRadioButton />
      </Box>
      <Box style={{ position: "absolute", zIndex: 1, right: "1%" }} mt="1">
        <MenuButton onOpen={visibleValue === "worldView" ? onOpenWorldView : onOpenVideo} />
      </Box>
      <WorldViewFilterDrawer isOpen={isOpenWorldView} onClose={onCloseWorldView} />
      <VideoFilterDrawer isOpen={isOpenVideo} onClose={onCloseVideo} />
      <MapContainer
        center={[30, 0]}
        zoom={2}
        scrollWheelZoom={false}
        style={{
          height: "65vh",
          width: "100%",
          position: "relative",
          zIndex: 0,
        }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {visibleValue === "worldView" ? <WorldViewImageOverlays /> : <VideoImageOverlays />}
        <ClickWorldViewHandler />
        <ClickVideoHandler />
      </MapContainer>
      {visibleValue === "worldView" ? <ClickedWorldViewList /> : <ClickedVideoList />}
    </Box>
  );
};

export default Map;
