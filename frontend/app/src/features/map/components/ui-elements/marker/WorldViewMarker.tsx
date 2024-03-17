import { Box, Flex, Text } from "@chakra-ui/react";
import defaultImg from "assets/default.png";
import { useWorldViewListContext } from "providers/WorldViewListProvider";
import { MouseEvent } from "react";
import { Marker, Popup } from "react-leaflet";
import { useNavigate } from "react-router-dom";
import "./popupStyles.css";

const WorldViewMarker = () => {
  const { state } = useWorldViewListContext();
  const { worldViews } = state;
  const navigate = useNavigate();

  return (
    <>
      {worldViews.map((worldView) => (
        <Marker key={worldView.id} position={[worldView.latitude, worldView.longitude]}>
          <Popup closeButton={false}>
            <Box
              key={worldView.id}
              border="1px solid #000"
              boxShadow="2xl"
              w="140px"
              h="180px"
              color="#FFF"
              onClick={(e: MouseEvent<HTMLElement>) => {
                e.preventDefault();
                navigate(`/world_views/${worldView.id}`);
              }}
              _hover={{ cursor: "pointer", opacity: "0.8" }}
            >
              <Box
                textAlign="center"
                backgroundImage={worldView.imgUrl ? worldView.imgUrl : defaultImg}
                h="100%"
                w="100%"
                bgPosition="center"
                bgSize="cover"
              >
                <Flex h="100%" align="end">
                  <Box bg="RGBA(0, 0, 0, 0.5)" w="100%">
                    <Text fontSize="md" fontWeight="bold">
                      {worldView.name}
                    </Text>
                    <Text fontSize="sm">
                      {(() => {
                        const countryNames = worldView.countries.map((country) => country.name);
                        const countryNameResult =
                          countryNames.length > 1 ? countryNames.join(", ") : countryNames[0];
                        return countryNameResult;
                      })()}
                    </Text>
                  </Box>
                </Flex>
              </Box>
            </Box>
          </Popup>
        </Marker>
      ))}
    </>
  );
};

export default WorldViewMarker;
