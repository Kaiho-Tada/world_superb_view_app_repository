import { useMapContext } from "providers/MapProvider";
import { useVideoListContext } from "providers/VideoListProvider";
import { useMapEvents } from "react-leaflet";

const ClickVideoHandler = () => {
  const { state } = useVideoListContext();
  const { videos } = state;
  const { dispatch: mapDispatch } = useMapContext();

  useMapEvents({
    click(e) {
      const clickedLatLng = e.latlng;
      mapDispatch({ type: "SET_MAP_CENTER", payload: clickedLatLng });

      const clickedVideos = videos.filter((video) => {
        const worldViewsAtClickedLatLng = video.worldViews.filter((worldView) => {
          const latDiff = Math.abs(worldView.latitude - clickedLatLng.lat);
          const lngDiff = Math.abs(worldView.longitude - clickedLatLng.lng);
          return latDiff <= 0.3 && lngDiff <= 0.3;
        });
        return worldViewsAtClickedLatLng.length > 0;
      });
      if (clickedVideos && clickedVideos.length > 0) {
        mapDispatch({ type: "SET_CLICKED_VIDEOS", payload: clickedVideos });
      } else {
        mapDispatch({ type: "SET_CLICKED_VIDEOS", payload: null });
      }
    },
  });
  return null;
};
export default ClickVideoHandler;
