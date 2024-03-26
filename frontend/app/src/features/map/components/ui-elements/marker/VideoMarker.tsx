import { Box, Flex, Text } from "@chakra-ui/react";
import { useMapContext } from "providers/MapProvider";
import { useVideoListContext } from "providers/VideoListProvider";
import { MouseEvent } from "react";
import { Marker, Popup, useMap } from "react-leaflet";
import { useNavigate } from "react-router-dom";

const VideoMarker = () => {
  const map = useMap();
  const { state } = useVideoListContext();
  const { videos } = state;
  const navigate = useNavigate();
  const { dispatch: mapDispatch } = useMapContext();

  return (
    <>
      {videos.map((video) =>
        video.worldViews.map((worldView) => (
          <Marker
            key={worldView.id}
            position={[worldView.latitude, worldView.longitude]}
            eventHandlers={{
              click: () => {
                const center = map.getCenter();
                mapDispatch({ type: "SET_MAP_CENTER", payload: center });
              },
            }}
          >
            <Popup closeButton={false}>
              <Box
                border="1px solid #000"
                boxShadow="2xl"
                display="flex"
                alignItems="stretch"
                justifyItems="stretch"
                w="140px"
                h="180px"
                color="#FFF"
                onClick={(e: MouseEvent<HTMLElement>) => {
                  e.preventDefault();
                  navigate(`/videos/${video.id}`);
                }}
                _hover={{ cursor: "pointer", opacity: "0.8" }}
              >
                <Box
                  textAlign="center"
                  backgroundImage={`https://image.tmdb.org/t/p/original${video.posterPath}`}
                  h="100%"
                  w="100%"
                  bgPosition="center"
                  bgSize="cover"
                >
                  <Flex h="100%" align="end" justify="center">
                    <Box bg="RGBA(0, 0, 0, 0.5)" w="100%">
                      <Text fontSize="md" fontWeight="bold">
                        {video.title}
                      </Text>
                      <Text fontSize="sm">{video.releaseDate}</Text>
                    </Box>
                  </Flex>
                </Box>
              </Box>
            </Popup>
          </Marker>
        ))
      )}
    </>
  );
};

export default VideoMarker;
