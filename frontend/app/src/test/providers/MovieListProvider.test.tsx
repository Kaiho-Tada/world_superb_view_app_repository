import { renderHook } from "@testing-library/react";
import { MovieListProvider, useMovieListContext } from "providers/MovieListProvider";
import { act } from "react-dom/test-utils";

test("SET_MOVIESアクションがディスパッチされた際、moviesが指定された値に更新されること", () => {
  const { result } = renderHook(() => useMovieListContext(), {
    wrapper: ({ children }) => <MovieListProvider>{children}</MovieListProvider>,
  });
  expect(result.current.state.movies).toEqual([]);
  act(() => {
    result.current.dispatch({
      type: "SET_MOVIES",
      payload: [
        {
          id: 1,
          title: "タイトル",
          posterPath: "posterPath",
          budget: 100,
          revenue: 200,
          popularity: 6,
          vote_average: 7,
          releaseDate: "releaseDate",
          status: true,
          overview: "overview",
        },
      ],
    });
  });
  expect(result.current.state.movies).toEqual([
    {
      id: 1,
      title: "タイトル",
      posterPath: "posterPath",
      budget: 100,
      revenue: 200,
      popularity: 6,
      vote_average: 7,
      releaseDate: "releaseDate",
      status: true,
      overview: "overview",
    },
  ]);
});

test("SET_LOADING_SEARCH_MOVIESアクションがディスパッチされた際、loadingSearchMoviesが指定された値に更新されること", () => {
  const { result } = renderHook(() => useMovieListContext(), {
    wrapper: ({ children }) => <MovieListProvider>{children}</MovieListProvider>,
  });
  expect(result.current.state.loadingSearchMovies).toBe(false);
  act(() => {
    result.current.dispatch({ type: "SET_LOADING_SEARCH_MOVIES", payload: true });
  });
  expect(result.current.state.loadingSearchMovies).toBe(true);
});
