import { useMapContext } from "providers/MapProvider";
import { useWorldViewListContext } from "providers/WorldViewListProvider";
import { useMapEvents } from "react-leaflet";

const ClickWorldViewHandler = () => {
  const { state } = useWorldViewListContext();
  const { worldViews } = state;
  const { dispatch: mapDispatch } = useMapContext();

  useMapEvents({
    click(e) {
      const clickedLatLng = e.latlng;
      mapDispatch({ type: "SET_MAP_CENTER", payload: clickedLatLng });
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
