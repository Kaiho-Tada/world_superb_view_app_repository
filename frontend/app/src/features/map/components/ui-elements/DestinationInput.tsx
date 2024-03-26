import { SmallCloseIcon } from "@chakra-ui/icons";
import { Flex, Input } from "@chakra-ui/react";
import { useMapContext } from "providers/MapProvider";
import { ChangeEvent } from "react";

const DestinationInput = () => {
  const { state, dispatch } = useMapContext();
  const { destination } = state;
  const handleChangeDestination = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: "SET_DESTINATION", payload: e.target.value });
  };
  const handleClearDestination = () => {
    dispatch({ type: "SET_DESTINATION", payload: "" });
    dispatch({ type: "SET_DESTINATION_LATLONG", payload: [] });
  };

  return (
    <Flex
      align="center"
      bg="white"
      border="1px solid #B2B8C0"
      borderRadius="3px"
      pr="10px"
      py="5px"
    >
      <Input
        type="text"
        aria-label="目的地を入力"
        placeholder="目的地を入力"
        color="#000"
        size="xs"
        border="none"
        _focus={{ boxShadow: "none" }}
        value={destination}
        onChange={handleChangeDestination}
      />
      <SmallCloseIcon
        role="img"
        aria-label="クリアボタン"
        boxSize={3.5}
        onClick={handleClearDestination}
        _hover={{ cursor: "pointer" }}
      />
    </Flex>
  );
};

export default DestinationInput;
