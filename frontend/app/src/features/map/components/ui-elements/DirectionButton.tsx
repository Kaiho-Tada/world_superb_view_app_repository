import { Box, Flex } from "@chakra-ui/react";
import { useMapContext } from "providers/MapProvider";

const DirectionButton = () => {
  const { state, dispatch } = useMapContext();
  const { departureAirport, destination } = state;

  return (
    <Flex justify="center">
      <Box
        role="button"
        fontSize="sm"
        bg="#2B6CB0"
        borderRadius="30px"
        color="white"
        textAlign="center"
        py="1"
        px="4"
        onClick={() => {
          dispatch({ type: "SET_IS_DIRECTION_MAP", payload: true });
        }}
        _hover={{ cursor: "pointer", opacity: 0.8 }}
        opacity={departureAirport && destination ? 1 : 0.6}
        pointerEvents={departureAirport && destination ? "auto" : "none"}
      >
        経路を表示
      </Box>
    </Flex>
  );
};

export default DirectionButton;
