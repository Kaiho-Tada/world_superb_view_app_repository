import Video from "features/video/types/Video";
import { createContext, Dispatch, FC, ReactNode, useContext, useMemo, useReducer } from "react";

export type Action =
  | { type: "SET_VIDEOS"; payload: Video[] }
  | { type: "SET_LOADING_SEARCH_VIDEOS"; payload: boolean };

type State = {
  videos: Video[];
  loadingSearchVideos: boolean;
};

const initialState: State = {
  videos: [],
  loadingSearchVideos: false,
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_VIDEOS":
      return { ...state, videos: action.payload };

    case "SET_LOADING_SEARCH_VIDEOS":
      return { ...state, loadingSearchVideos: action.payload };

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
