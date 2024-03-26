import { SmallCloseIcon } from "@chakra-ui/icons";
import { Box, Divider, Flex, HStack, Text, useDisclosure } from "@chakra-ui/react";
import defaultImg from "assets/default.png";
import "leaflet/dist/leaflet.css";
import { useMapContext } from "providers/MapProvider";
import PanoramaModal from "./PanoramaModal";

const PanoramaModalOpener = () => {
  const { state, dispatch } = useMapContext();
  const { clickedWorldView } = state;
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    clickedWorldView && (
      <>
        <PanoramaModal isOpen={isOpen} onClose={onClose} />
        <Flex
          bg="#FFF"
          color="#000"
          position="absolute"
          zIndex={1}
          left="50%"
          transform="translateX(-50%)"
          bottom="5%"
          borderRadius="10px"
          border="1px solid #000"
          p="2"
          boxShadow="2xl"
          _hover={{ cursor: "pointer", opacity: "0.8" }}
          onClick={onOpen}
          role="dialog"
        >
          <Box
            textAlign="center"
            backgroundImage={clickedWorldView.imgUrl ? clickedWorldView.imgUrl : defaultImg}
            h="80px"
            w="120px"
            bgPosition="center"
            bgSize="cover"
            borderRadius="10px"
            border="1px solid #000"
            mr="3"
          >
            <Flex h="100%" align="end" justify="center">
              <Box bg="RGBA(0, 0, 0, 0.5)" w="100%" borderRadius="10px">
                <Text color="#FFF" fontSize="sm">
                  ストリートビュー
                </Text>
              </Box>
            </Flex>
          </Box>
          <Box>
            <Text fontSize="md" fontWeight="bold">
              {clickedWorldView.name}
            </Text>
            <Text fontSize="sm">
              {(() => {
                const countryNames = clickedWorldView.countries.map((country) => country.name);
                const countryNameResult =
                  countryNames.length > 1 ? countryNames.join(", ") : countryNames[0];
                return countryNameResult;
              })()}
            </Text>
            <Divider my="1" borderColor="#A0A6B0" />
            <HStack spacing="2">
              <Text fontSize="xs" color="gray.500">
                {clickedWorldView.latitude}
              </Text>
              <Text fontSize="xs" color="gray.500">
                {clickedWorldView.longitude}
              </Text>
            </HStack>
          </Box>
          <SmallCloseIcon
            role="button"
            aria-label="ダイアログを閉じる"
            ml="3"
            boxSize={4}
            onClick={() => {
              dispatch({
                type: "SET_CLICKED_WORLD_VIEW",
                payload: null,
              });
            }}
            color="gray.500"
            _hover={{ cursor: "pointer" }}
          />
        </Flex>
      </>
    )
  );
};

export default PanoramaModalOpener;
