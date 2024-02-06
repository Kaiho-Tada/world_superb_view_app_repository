import Movie from "features/movie/types/Movie";
import { createContext, Dispatch, FC, ReactNode, useContext, useMemo, useReducer } from "react";

export type Action =
  | { type: "SET_MOVIES"; payload: Movie[] }
  | { type: "SET_LOADING_SEARCH_MOVIES"; payload: boolean };

type State = {
  movies: Movie[];
  loadingSearchMovies: boolean;
};

const initialState: State = {
  movies: [],
  loadingSearchMovies: false,
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_MOVIES":
      return { ...state, movies: action.payload };

    case "SET_LOADING_SEARCH_MOVIES":
      return { ...state, loadingSearchMovies: action.payload };

    default:
      return state;
  }
};

const MovieListContext = createContext(
  {} as {
    state: State;
    dispatch: Dispatch<Action>;
  }
);

const MovieListProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const value = useMemo(() => ({ state, dispatch }), [state, dispatch]);

  return <MovieListContext.Provider value={value}>{children}</MovieListContext.Provider>;
};

const useMovieListContext = () => {
  const context = useContext(MovieListContext);
  return context;
};

export { MovieListProvider, useMovieListContext };
