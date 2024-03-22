import { useMapContext } from "providers/MapProvider";
import { useMapEvents } from "react-leaflet";

const ClickHandler = () => {
  const { dispatch } = useMapContext();
  useMapEvents({
    click() {
      dispatch({
        type: "SET_CLICKED_WORLD_VIEW",
        payload: null,
      });
    },
  });
  return null;
};

export default ClickHandler;
