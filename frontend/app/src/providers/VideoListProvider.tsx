import Video from "features/video/types/Video";
import { createContext, Dispatch, FC, ReactNode, useContext, useMemo, useReducer } from "react";
import CheckItem from "types/checkItem";

export type Action =
  | { type: "SET_VIDEOS"; payload: Video[] }
  | { type: "SET_LOADING_SEARCH_VIDEOS"; payload: boolean }
  | { type: "SET_SORT_CRITERIA"; payload: string }
  | { type: "SET_GENRE_CHECK_ITEMS"; payload: CheckItem[] }
  | { type: "SET_LOADING_GET_GENRES"; payload: boolean }
  | { type: "SET_KEYWORD"; payload: string }
  | { type: "SET_SHOULD_DEBOUNCE"; payload: boolean }
  | { type: "SET_VOTE_AVERAGE_RENGE"; payload: number[] }
  | { type: "SET_IS_DISABLED"; payload: boolean };

type State = {
  videos: Video[];
  loadingSearchVideos: boolean;
  sortCriteria: string;
  genreCheckItems: CheckItem[];
  loadingGetGenres: boolean;
  keyword: string;
  shouldDebounce: boolean;
  voteAverageRange: number[];
  isDisabled: boolean;
};

const initialState: State = {
  videos: [],
  loadingSearchVideos: false,
  sortCriteria: "",
  genreCheckItems: [],
  loadingGetGenres: false,
  keyword: "",
  shouldDebounce: false,
  voteAverageRange: [0, 10],
  isDisabled: true,
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_VIDEOS":
      return { ...state, videos: action.payload };

    case "SET_LOADING_SEARCH_VIDEOS":
      return { ...state, loadingSearchVideos: action.payload };

    case "SET_SORT_CRITERIA":
      return { ...state, sortCriteria: action.payload };

    case "SET_GENRE_CHECK_ITEMS":
      return { ...state, genreCheckItems: action.payload };

    case "SET_LOADING_GET_GENRES":
      return { ...state, loadingGetGenres: action.payload };

    case "SET_KEYWORD":
      return { ...state, keyword: action.payload };

    case "SET_SHOULD_DEBOUNCE":
      return { ...state, shouldDebounce: action.payload };

    case "SET_VOTE_AVERAGE_RENGE":
      return { ...state, voteAverageRange: action.payload };

    case "SET_IS_DISABLED":
      return { ...state, isDisabled: action.payload };

    default:
      return state;
  }
};

const VideoListContext = createContext(
  {} as {
    state: State;
    dispatch: Dispatch<Action>;
  }
);

const VideoListProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const value = useMemo(() => ({ state, dispatch }), [state, dispatch]);

  return <VideoListContext.Provider value={value}>{children}</VideoListContext.Provider>;
};

const useVideoListContext = () => {
  const context = useContext(VideoListContext);
  return context;
};

export { VideoListProvider, useVideoListContext };
