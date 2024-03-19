import handleGetBounds from "features/map/utils/handleGetBounds";
import { LatLngBoundsLiteral } from "leaflet";
import "leaflet/dist/leaflet.css";
import { useState } from "react";
import { ImageOverlay, useMap, useMapEvents } from "react-leaflet";

const ZoomDependentImageOverlay = ({ latlong, url }: { latlong: number[]; url: string }) => {
  const map = useMap();
  const zoom = map.getZoom();
  const currentBounds = handleGetBounds({ latlong, zoom });
  const [bounds, setBounds] = useState<LatLngBoundsLiteral>(currentBounds);

  useMapEvents({
    zoomend() {
      const zoomSize = map.getZoom();
      const newBounds = handleGetBounds({ latlong, zoom: zoomSize });
      setBounds(newBounds);
    },
  });

  return <ImageOverlay bounds={bounds} url={url} />;
};

export default ZoomDependentImageOverlay;
