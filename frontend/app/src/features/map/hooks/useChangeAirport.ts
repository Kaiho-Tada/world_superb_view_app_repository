import { useMapContext } from "providers/MapProvider";
import { ChangeEvent } from "react";

const useChangeAirport = () => {
  const { dispatch } = useMapContext();

  const handleChangeAirport = (e: ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    dispatch({ type: "SET_DEPARTURE_AIRPORT", payload: value });
  };
  return { handleChangeAirport };
};

export default useChangeAirport;
