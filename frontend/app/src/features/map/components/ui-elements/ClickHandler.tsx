import { WorldView } from "features/worldView/types/api/worldView";
import { useMapEvents } from "react-leaflet";

const ClickHandler = ({
  worldViews,
  setClickedViews,
}: {
  worldViews: Pick<WorldView, "id" | "name" | "imgUrl" | "countries" | "latitude" | "longitude">[];
  setClickedViews: React.Dispatch<
    React.SetStateAction<
      | Pick<WorldView, "id" | "name" | "imgUrl" | "countries" | "latitude" | "longitude">[]
      | undefined
    >
  >;
}) => {
  useMapEvents({
    click(e) {
      const clickedLatLng = e.latlng;
      const nearbyWorldViews = worldViews?.filter((v) => {
        const latDiff = Math.abs(v.latitude - clickedLatLng.lat);
        const lngDiff = Math.abs(v.longitude - clickedLatLng.lng);
        return latDiff <= 0.3 && lngDiff <= 0.3;
      });
      if (nearbyWorldViews && nearbyWorldViews.length > 0) {
        setClickedViews(nearbyWorldViews);
      } else {
        setClickedViews(undefined);
      }
    },
  });
  return null;
};
export default ClickHandler;
