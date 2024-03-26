import { useMapContext } from "providers/MapProvider";
import { useMap, useMapEvents } from "react-leaflet";

const ZoomLayersControlHandler = () => {
  const { dispatch } = useMapContext();
  const map = useMap();

  useMapEvents({
    zoomend() {
      const zoom = map.getZoom();
      dispatch({ type: "SET_ZOOM", payload: zoom });
    },
  });
  return null;
};

export default ZoomLayersControlHandler;
