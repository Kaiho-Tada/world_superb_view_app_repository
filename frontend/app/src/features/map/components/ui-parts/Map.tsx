import { Box, Divider, useDisclosure } from "@chakra-ui/react";
import ClickWorldViewHandler from "features/map/components/ui-elements/ClickWorldViewHandler";
import ClickedWorldViewList from "features/map/components/ui-parts/ClickedWorldViewList";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useMapContext } from "providers/MapProvider";
import { LayersControl, MapContainer, TileLayer } from "react-leaflet";
import ClickVideoHandler from "../ui-elements/ClickVideoHandler";
import VideoMarker from "../ui-elements/marker/VideoMarker";
import WorldViewMarker from "../ui-elements/marker/WorldViewMarker";
import MenuButton from "../ui-elements/MenuButton";
import SelectedRadio from "../ui-elements/SlectedRadio";
import VideoFilterSearchBox from "../ui-elements/VideoFilterSearchBox";
import VideoImageOverlays from "../ui-elements/VideoImageOverlays";
import VisibleRadio from "../ui-elements/VisibleRadio";
import WorldViewFilterSearchBox from "../ui-elements/WorldViewFilterSearchBox";
import WorldViewImageOverlays from "../ui-elements/WorldViewImageOverlays";
import ClickedVideoList from "./ClickedVideoList";
import VideoFilterDrawer from "./VideoFilterDrawer";
import WorldViewFilterDrawer from "./WorldViewFilterDrawer";

L.Icon.Default.imagePath = "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/";

const Map = () => {
  const { state } = useMapContext();
  const { visibleValue, selectedValue } = state;
  const {
    isOpen: isOpenWorldView,
    onOpen: onOpenWorldView,
    onClose: onCloseWorldView,
  } = useDisclosure();
  const { isOpen: isOpenVideo, onOpen: onOpenVideo, onClose: onCloseVideo } = useDisclosure();

  return (
    <Box bg="white" style={{ position: "relative" }}>
      <Box style={{ position: "absolute", zIndex: 1, left: "33%", width: "30%" }} mt="3">
        {selectedValue === "worldView" ? <WorldViewFilterSearchBox /> : <VideoFilterSearchBox />}
      </Box>
      <Box
        style={{ position: "absolute", zIndex: 1, top: "11%", left: "1%" }}
        bg="#FFF"
        color="gray.600"
        py="2"
        px="2"
        borderRadius="3px"
        border="1px solid #000"
      >
        <VisibleRadio />
        <Divider my={2} borderColor="#A0A6B0" />
        <SelectedRadio />
      </Box>
      <Box style={{ position: "absolute", zIndex: 1, right: "1%" }} mt="1">
        <MenuButton onOpen={selectedValue === "worldView" ? onOpenWorldView : onOpenVideo} />
      </Box>
      <WorldViewFilterDrawer isOpen={isOpenWorldView} onClose={onCloseWorldView} />
      <VideoFilterDrawer isOpen={isOpenVideo} onClose={onCloseVideo} />
      <Box style={{ position: "absolute", zIndex: 1, left: "1%", bottom: "1%" }}>
        {visibleValue === "image" && selectedValue === "worldView" && <ClickedWorldViewList />}
        {visibleValue === "image" && selectedValue === "video" && <ClickedVideoList />}
      </Box>
      <MapContainer
        center={[30, 0]}
        zoom={2}
        scrollWheelZoom={false}
        style={{
          height: "92vh",
          width: "100%",
          position: "relative",
          zIndex: 0,
        }}
      >
        <LayersControl position="bottomleft">
          <LayersControl.BaseLayer checked name="デフォルト">
            <TileLayer
              attribution='© <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
          </LayersControl.BaseLayer>
          <LayersControl.BaseLayer name="詳細">
            <TileLayer
              attribution="<a href='https://maps.gsi.go.jp/development/ichiran.html' target='_blank'>国土地理院</a>"
              url="https://cyberjapandata.gsi.go.jp/xyz/pale/{z}/{x}/{y}.png"
            />
          </LayersControl.BaseLayer>
          <LayersControl.BaseLayer name="航空写真">
            <TileLayer
              attribution="Tiles © Esri — Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community"
              url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
            />
          </LayersControl.BaseLayer>
        </LayersControl>
        {visibleValue === "marker" && selectedValue === "worldView" && <WorldViewMarker />}
        {visibleValue === "marker" && selectedValue === "video" && <VideoMarker />}
        {visibleValue === "image" && selectedValue === "worldView" && <WorldViewImageOverlays />}
        {visibleValue === "image" && selectedValue === "video" && <VideoImageOverlays />}
        <ClickWorldViewHandler />
        <ClickVideoHandler />
      </MapContainer>
    </Box>
  );
};

export default Map;
