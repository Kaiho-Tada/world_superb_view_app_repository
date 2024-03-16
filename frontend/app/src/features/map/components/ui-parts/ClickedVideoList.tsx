import { Box, Flex, Text, Wrap, WrapItem } from "@chakra-ui/react";
import { useMapContext } from "providers/MapProvider";
import { MouseEvent } from "react";
import { useNavigate } from "react-router-dom";

const ClickedVideoList = () => {
  const navigate = useNavigate();
  const { state } = useMapContext();
  const { clickedVideos } = state;

  return clickedVideos ? (
    <Wrap role="list" aria-label="ビデオ一覧">
      {clickedVideos.map((video) => (
        <WrapItem
          key={video.id}
          role="listitem"
          aria-label={`ビデオ一覧: ${video.title}`}
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
        </WrapItem>
      ))}
    </Wrap>
  ) : null;
};

export default ClickedVideoList;
