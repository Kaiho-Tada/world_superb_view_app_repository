import { Box, Heading, Img, Stack, Text, WrapItem } from "@chakra-ui/react";
import Video from "features/video/types/Video";
import { FC } from "react";

const VideoCard: FC<Pick<Video, "title" | "posterPath" | "releaseDate">> = (props) => {
  const { title, posterPath, releaseDate } = props;
  return (
    <WrapItem
      role="listitem"
      aria-label={`ビデオ一覧: ${title}`}
      display="flex"
      alignItems="stretch"
    >
      <Box w="180px" bg="white" shadow="md" color="black">
        <Img
          src={`https://image.tmdb.org/t/p/original${posterPath}`}
          alt={`ポスター画像: ${title}`}
          h="300px"
          w="100%"
          mb="4"
        />

        <Stack align="center" textAlign="center" spacing={2} pb="2">
          <Heading fontSize="md" as="h4">
            {title}
          </Heading>
          <Text>{releaseDate}</Text>
        </Stack>
      </Box>
    </WrapItem>
  );
};

export default VideoCard;
