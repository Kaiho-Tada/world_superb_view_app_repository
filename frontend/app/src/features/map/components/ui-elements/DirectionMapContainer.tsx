import { useMapContext } from "providers/MapProvider";

const DirectionMapContainer = () => {
  const { state } = useMapContext();
  const { departureAirport, destination, destinationLatlong } = state;
  const mapsEmbedApiKey = process.env.REACT_APP_MAPS_EMBED_API_KEY;

  return (
    <iframe
      title="title"
      width="100%"
      height="750px"
      referrerPolicy="no-referrer-when-downgrade"
      src={`https://www.google.com/maps/embed/v1/directions?key=${mapsEmbedApiKey}
      &origin=${departureAirport}
      &destination=${
        destinationLatlong.length === 0
          ? destination
          : `${destinationLatlong[0]},${destinationLatlong[1]}`
      }
      &zoom=3
      &mode=flying&maptype=satellite
      `}
      allowFullScreen
    />
  );
};

export default DirectionMapContainer;
