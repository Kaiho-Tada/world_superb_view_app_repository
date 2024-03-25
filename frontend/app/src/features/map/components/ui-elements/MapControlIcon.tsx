import { Image } from "@chakra-ui/react";
import PinIcon from "assets/pin.png";
import { useMapContext } from "providers/MapProvider";

const MapControlIcon = () => {
  const { dispatch } = useMapContext();

  return (
    <Image
      display={{ base: "block", sm: "none" }}
      src={PinIcon}
      boxSize="43px"
      alt="マップ操作アイコン"
      p="1"
      position="absolute"
      zIndex={1}
      mt="85px"
      ml="10px"
      onMouseEnter={() => dispatch({ type: "SET_IS_HOVERED_MAP_CONTROL_ICON", payload: true })}
      bg="#FFF"
      borderRadius="6px"
      border="1px solid #000"
    />
  );
};

export default MapControlIcon;
