import handleGetBounds from "features/map/utils/handleGetBounds";
import { LatLngBoundsLiteral } from "leaflet";
import "leaflet/dist/leaflet.css";
import { useState } from "react";
import { ImageOverlay, useMap, useMapEvents } from "react-leaflet";

const ZoomDependentImageOverlay = ({ latlong, url }: { latlong: number[]; url: string }) => {
  const map = useMap();
  const zoomSize = map.getZoom();
  const currentBounds = handleGetBounds({ latlong, zoomSize });
  const [bounds, setBounds] = useState<LatLngBoundsLiteral>(currentBounds);

  useMapEvents({
    zoomend() {
      const zoomsize = map.getZoom();
      const newBounds = handleGetBounds({ latlong, zoomSize: zoomsize });
      setBounds(newBounds);
    },
  });

  return <ImageOverlay bounds={bounds} url={url} alt="絶景画像" />;
};

export default ZoomDependentImageOverlay;
