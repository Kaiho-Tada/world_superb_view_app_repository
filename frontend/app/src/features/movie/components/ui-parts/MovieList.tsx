import { Wrap } from "@chakra-ui/react";
import Movie from "features/movie/types/Movie";
import { FC } from "react";
import MovieCard from "./MovieCard";

type Props = { currentMovies: Movie[] };

const MovieList: FC<Props> = (props) => {
  const { currentMovies } = props;
  return (
    <Wrap role="list" aria-label="映画一覧" ml="8" mt="8">
      {currentMovies.map((movie: Movie) => (
        <MovieCard
          key={movie.id}
          title={movie.title}
          posterPath={movie.posterPath}
          releaseDate={movie.releaseDate}
        />
      ))}
    </Wrap>
  );
};

export default MovieList;
