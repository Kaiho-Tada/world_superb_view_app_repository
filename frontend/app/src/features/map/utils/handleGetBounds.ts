import { LatLngBoundsLiteral, LatLngTuple } from "leaflet";

const handleGetBounds = ({ latlong, zoom }: { latlong: number[]; zoom: number }) => {
  const [latitude, longitude] = latlong;
  const scale = zoom ** 1.7;
  const bounds = [
    [latitude - 8 / scale, longitude + 12 / scale] as LatLngTuple,
    [latitude + 8 / scale, longitude - 12 / scale] as LatLngTuple,
  ] as LatLngBoundsLiteral;
  return bounds;
};

export default handleGetBounds;
