import { Box } from "@chakra-ui/react";
import { useMapContext } from "providers/MapProvider";

const ReturnMapButton = () => {
  const { dispatch } = useMapContext();

  return (
    <Box
      position="absolute"
      zIndex={1}
      top="0%"
      left="50%"
      transform="translateX(-50%)"
      mt="4"
      role="button"
      borderRadius="30px"
      border="1px solid #000"
      bg="gray.100"
      color="#000"
      py="3"
      px="8"
      onClick={() => {
        dispatch({ type: "SET_IS_DIRECTION_MAP", payload: false });
      }}
      _hover={{ cursor: "pointer", opacity: 0.8 }}
    >
      マップに戻る
    </Box>
  );
};

export default ReturnMapButton;
