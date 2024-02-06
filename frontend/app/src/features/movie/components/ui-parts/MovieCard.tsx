import { Box, Heading, Img, Stack, Text, WrapItem } from "@chakra-ui/react";
import Movie from "features/movie/types/Movie";
import { FC } from "react";

const MovieCard: FC<Pick<Movie, "title" | "posterPath" | "releaseDate">> = (props) => {
  const { title, posterPath, releaseDate } = props;
  return (
    <WrapItem role="listitem" aria-label={`映画一覧: ${title}`} display="flex" alignItems="stretch">
      <Box w="180px" bg="white" shadow="md" color="black">
        <Img
          src={`https://image.tmdb.org/t/p/original${posterPath}`}
          alt={`ポスター画像: ${title}`}
          h="300px" // ポスター画像の高さを固定
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

export default MovieCard;
