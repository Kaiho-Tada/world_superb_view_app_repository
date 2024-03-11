import { LatLngBoundsLiteral, LatLngTuple } from "leaflet";

const handleGetBounds = ({ latlong, zoomSize }: { latlong: number[]; zoomSize: number }) => {
  const [latitude, longitude] = latlong;
  const scale = zoomSize ** 1.7;
  const bounds = [
    [latitude - 8 / scale, longitude + 12 / scale] as LatLngTuple,
    [latitude + 8 / scale, longitude - 12 / scale] as LatLngTuple,
  ] as LatLngBoundsLiteral;
  return bounds;
};

export default handleGetBounds;
