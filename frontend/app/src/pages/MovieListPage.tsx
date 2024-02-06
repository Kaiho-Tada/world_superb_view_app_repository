import { Box } from "@chakra-ui/react";
import Loading from "components/ui-elements/Loading";
import Pagination from "components/ui-elements/Pagination";
import searchMovieApi from "features/movie/api/movieApi";
import MovieList from "features/movie/components/ui-parts/MovieList";
import Movie from "features/movie/types/Movie";
import useSearchModel from "hooks/api/useSearchModel";
import { useMovieListContext } from "providers/MovieListProvider";
import { FC, useCallback, useEffect, useState } from "react";

const MovieListPage: FC = () => {
  const { state, dispatch } = useMovieListContext();
  const { movies } = state;
  const { handleSearchModel } = useSearchModel();

  const movieDispatch = (responseData: Movie[]) => {
    dispatch({ type: "SET_MOVIES", payload: responseData });
  };
  const loadingSearchMovieDispatch = (payload: boolean) => {
    dispatch({ type: "SET_LOADING_SEARCH_MOVIES", payload });
  };

  useEffect(() => {
    handleSearchModel<Movie>({
      modelDispatch: movieDispatch,
      loadingSearchModelDispatch: loadingSearchMovieDispatch,
      searchModelApi: searchMovieApi,
    });
  }, []);

  const [itemsOffset, setItemsOffset] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 30;
  const endOffset = itemsOffset + itemsPerPage;
  const currentMovies = movies.slice(itemsOffset, endOffset);
  const pageCount = Math.ceil(movies.length / itemsPerPage);
  const handlePageChange = useCallback(
    (newPage: number) => {
      setCurrentPage(newPage);
      const newOffset = (newPage - 1) * itemsPerPage;
      setItemsOffset(newOffset);
    },
    [itemsPerPage]
  );

  useEffect(() => {
    setItemsOffset(0);
    setCurrentPage(1);
  }, [movies]);

  return state.loadingSearchMovies ? (
    <Loading />
  ) : (
    <Box my="6">
      <MovieList currentMovies={currentMovies} />
      <Pagination
        pageCount={pageCount}
        currentPage={currentPage}
        handlePageChange={handlePageChange}
      />
    </Box>
  );
};

export default MovieListPage;
