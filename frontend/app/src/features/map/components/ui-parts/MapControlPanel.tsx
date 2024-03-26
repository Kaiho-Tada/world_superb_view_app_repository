import { Box, Divider, Stack, useBreakpointValue } from "@chakra-ui/react";
import "leaflet/dist/leaflet.css";
import { useMapContext } from "providers/MapProvider";
import DepartureAirportSelect from "../ui-elements/DepartureAirportSelect";
import DestinationInput from "../ui-elements/DestinationInput";
import DirectionButton from "../ui-elements/DirectionButton";
import SelectedRadio from "../ui-elements/SlectedRadio";
import VisibleRadio from "../ui-elements/VisibleRadio";

const MapControlPanel = () => {
  const { state, dispatch } = useMapContext();
  const { visibleValue, selectedValue, isHoveredMapControlIcon } = state;
  const screenSize = useBreakpointValue({ sm: "sm" });

  return isHoveredMapControlIcon || screenSize === "sm" ? (
    <Box
      role="region"
      aria-label="マップ操作パネル"
      position="absolute"
      zIndex={1}
      bg="#FFF"
      color="gray.600"
      p="3"
      borderRadius="3px"
      border="1px solid #000"
      w="200px"
      mt="85px"
      ml="10px"
      onMouseLeave={() => dispatch({ type: "SET_IS_HOVERED_MAP_CONTROL_ICON", payload: false })}
    >
      <SelectedRadio />
      <Divider my={2} borderColor="#A0A6B0" />
      <VisibleRadio />
      {visibleValue === "marker" && selectedValue === "worldView" && (
        <>
          <Divider my={2} borderColor="#A0A6B0" />
          <Stack spacing="2">
            <DepartureAirportSelect />
            <DestinationInput />
            <DirectionButton />
          </Stack>
        </>
      )}
    </Box>
  ) : null;
};

export default MapControlPanel;
