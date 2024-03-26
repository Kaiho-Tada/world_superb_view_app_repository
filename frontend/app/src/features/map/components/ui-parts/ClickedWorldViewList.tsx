import { Box, Flex, Text, Wrap, WrapItem } from "@chakra-ui/react";
import defaultImg from "assets/default.png";
import "leaflet/dist/leaflet.css";
import { useMapContext } from "providers/MapProvider";
import { MouseEvent } from "react";
import { useNavigate } from "react-router-dom";

const ClickedWorldViewList = () => {
  const navigate = useNavigate();
  const { state } = useMapContext();
  const { clickedWorldViews } = state;

  return clickedWorldViews ? (
    <Wrap role="list" aria-label="絶景一覧">
      {clickedWorldViews.map((view) => (
        <WrapItem
          role="listitem"
          aria-label={`絶景一覧: ${view.name}`}
          key={view.id}
          border="1px solid #000"
          boxShadow="2xl"
          display="flex"
          alignItems="stretch"
          justifyItems="stretch"
          w="190px"
          h="220px"
          color="#FFF"
          onClick={(e: MouseEvent<HTMLElement>) => {
            e.preventDefault();
            navigate(`/world_views/${view.id}`);
          }}
          _hover={{ cursor: "pointer", opacity: "0.8" }}
        >
          <Box
            textAlign="center"
            backgroundImage={view.imgUrl ? view.imgUrl : defaultImg}
            h="100%"
            w="100%"
            bgPosition="center"
            bgSize="cover"
          >
            <Flex h="100%" align="end" justify="center">
              <Box bg="RGBA(0, 0, 0, 0.5)" w="100%">
                <Text fontSize="md" fontWeight="bold">
                  {view.name}
                </Text>
                <Text fontSize="sm">
                  {(() => {
                    const countryNames = view.countries.map((country) => country.name);
                    const countryNameResult =
                      countryNames.length > 1 ? countryNames.join(", ") : countryNames[0];
                    return countryNameResult;
                  })()}
                </Text>
              </Box>
            </Flex>
          </Box>
        </WrapItem>
      ))}
    </Wrap>
  ) : null;
};

export default ClickedWorldViewList;
