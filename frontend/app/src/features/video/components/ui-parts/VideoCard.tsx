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
      w={{ base: "120px", sm: "160px", md: "180px" }}
    >
      <Box bg="white" shadow="md" color="black">
        <Img
          src={`https://image.tmdb.org/t/p/original${posterPath}`}
          alt={`ポスター画像: ${title}`}
          h={{ base: "210px", sm: "280px", md: "300px" }}
          w="100%"
          mb="4"
        />
        <Stack
          align="center"
          textAlign="center"
          pb={{ base: 1, sm: 2 }}
          spacing={{ base: 1, sm: 2 }}
        >
          <Heading fontSize={{ base: "xs", sm: "sm", md: "md" }} as="h4">
            {title}
          </Heading>
          <Text fontSize={{ base: "xs", sm: "sm", md: "md" }}>{releaseDate}</Text>
        </Stack>
      </Box>
    </WrapItem>
  );
};

export default VideoCard;
