import { Box, Select } from "@chakra-ui/react";
import useChangeAirport from "features/map/hooks/useChangeAirport";
import { useMapContext } from "providers/MapProvider";

const DepartureAirportSelect = () => {
  const { state } = useMapContext();
  const { departureAirport } = state;
  const { handleChangeAirport } = useChangeAirport();

  return (
    <Box border="1px solid #B2B8C0" borderRadius="3px">
      <Select
        aria-label="出発する空港を選択"
        placeholder="出発する空港を選択"
        onChange={handleChangeAirport}
        size="xs"
        border="none"
        _focus={{ boxShadow: "none" }}
        _hover={{ cursor: "pointer" }}
        py="1"
        color="#000"
        value={departureAirport}
      >
        <option value="新千歳空港">新千歳空港</option>
        <option value="羽田空港">羽田空港</option>
        <option value="成田国際空港">成田国際空港</option>
        <option value="中部国際空港">中部国際空港</option>
        <option value="関西国際空港">関西国際空港</option>
        <option value="福岡空港">福岡空港</option>
        <option value="那覇空港">那覇空港</option>
      </Select>
    </Box>
  );
};

export default DepartureAirportSelect;
