import Video from "features/video/types/Video";
import { WorldView } from "features/worldView/types/api/worldView";
import { createContext, Dispatch, FC, ReactNode, useContext, useMemo, useReducer } from "react";

export type Action =
  | {
      type: "SET_CLICKED_WORLD_VIEWS";
      payload:
        | Pick<WorldView, "id" | "name" | "imgUrl" | "countries" | "latitude" | "longitude">[]
        | null;
    }
  | {
      type: "SET_CLICKED_VIDEOS";
      payload: Pick<Video, "id" | "title" | "posterPath" | "releaseDate">[] | null;
    }
  | { type: "SET_VISIBLE_VALUE"; payload: string };

type State = {
  clickedWorldViews:
    | Pick<WorldView, "id" | "name" | "imgUrl" | "countries" | "latitude" | "longitude">[]
    | null;
  clickedVideos: Pick<Video, "id" | "title" | "posterPath" | "releaseDate">[] | null;
  visibleValue: string;
};

const initialState: State = {
  clickedWorldViews: null,
  clickedVideos: null,
  visibleValue: "worldView",
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_CLICKED_WORLD_VIEWS":
      return { ...state, clickedWorldViews: action.payload };

    case "SET_CLICKED_VIDEOS":
      return { ...state, clickedVideos: action.payload };

    case "SET_VISIBLE_VALUE":
      return { ...state, visibleValue: action.payload };
    default:
      return state;
  }
};

const MapContext = createContext(
  {} as {
    state: State;
    dispatch: Dispatch<Action>;
  }
);

const MapProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const value = useMemo(() => ({ state, dispatch }), [state, dispatch]);

  return <MapContext.Provider value={value}>{children}</MapContext.Provider>;
};

const useMapContext = () => {
  const context = useContext(MapContext);
  return context;
};

export { MapProvider, useMapContext };
