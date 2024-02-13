import { renderHook } from "@testing-library/react";
import { useVideoListContext, VideoListProvider } from "providers/VideoListProvider";
import { act } from "react-dom/test-utils";

test("SET_VIDEOSアクションがディスパッチされた際、moviesが指定された値に更新されること", () => {
  const { result } = renderHook(() => useVideoListContext(), {
    wrapper: ({ children }) => <VideoListProvider>{children}</VideoListProvider>,
  });
  expect(result.current.state.videos).toEqual([]);
  act(() => {
    result.current.dispatch({
      type: "SET_VIDEOS",
      payload: [
        {
          id: 1,
          title: "タイトル",
          posterPath: "posterPath",
          popularity: 6,
          vote_average: 7,
          releaseDate: "releaseDate",
          overview: "overview",
        },
      ],
    });
  });
  expect(result.current.state.videos).toEqual([
    {
      id: 1,
      title: "タイトル",
      posterPath: "posterPath",
      popularity: 6,
      vote_average: 7,
      releaseDate: "releaseDate",
      overview: "overview",
    },
  ]);
});

test("SET_LOADING_SEARCH_VIDEOSアクションがディスパッチされた際、loadingSearchVideosが指定された値に更新されること", () => {
  const { result } = renderHook(() => useVideoListContext(), {
    wrapper: ({ children }) => <VideoListProvider>{children}</VideoListProvider>,
  });
  expect(result.current.state.loadingSearchVideos).toBe(false);
  act(() => {
    result.current.dispatch({ type: "SET_LOADING_SEARCH_VIDEOS", payload: true });
  });
  expect(result.current.state.loadingSearchVideos).toBe(true);
});

test("SET_SORT_CRITERIAアクションがディスパッチされた際、sortCriteriaが指定された値に更新されること", () => {
  const { result } = renderHook(() => useVideoListContext(), {
    wrapper: ({ children }) => <VideoListProvider>{children}</VideoListProvider>,
  });
  expect(result.current.state.sortCriteria).toBe("");
  act(() => {
    result.current.dispatch({ type: "SET_SORT_CRITERIA", payload: "popularity" });
  });
  expect(result.current.state.sortCriteria).toBe("popularity");
});

test("SET_GENRE_CHECK_ITEMSアクションがディスパッチされた際、genreCheckItemsが指定された値に更新されること", () => {
  const { result } = renderHook(() => useVideoListContext(), {
    wrapper: ({ children }) => <VideoListProvider>{children}</VideoListProvider>,
  });
  expect(result.current.state.genreCheckItems).toEqual([]);
  act(() => {
    result.current.dispatch({
      type: "SET_GENRE_CHECK_ITEMS",
      payload: [
        { label: "ラベルA", checked: false },
        { label: "ラベルB", checked: false },
      ],
    });
  });
  expect(result.current.state.genreCheckItems).toEqual([
    { label: "ラベルA", checked: false },
    { label: "ラベルB", checked: false },
  ]);
});
