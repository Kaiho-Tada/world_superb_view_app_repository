import { renderHook } from "@testing-library/react";
import { useVideoListContext, VideoListProvider } from "providers/VideoListProvider";
import { act } from "react-dom/test-utils";

test("SET_VIDEOSアクションがディスパッチされた際、moviesが指定された値に更新されること", () => {
  const { result } = renderHook(() => useVideoListContext(), {
    wrapper: ({ children }) => <VideoListProvider>{children}</VideoListProvider>,
  });
  expect(result.current.state.videos).toEqual([]);

  const mockWorldViews = [
    {
      id: 1,
      name: "name",
      imgUrl: "imgUrl",
      countries: [{ id: 1, name: "name" }],
      latitude: 0,
      longitude: 0,
    },
  ];
  const mockGenres = [{ id: 1, name: "name" }];
  act(() => {
    result.current.dispatch({
      type: "SET_VIDEOS",
      payload: [
        {
          id: 1,
          title: "タイトル",
          posterPath: "posterPath",
          popularity: 6,
          voteAverage: 7,
          releaseDate: "releaseDate",
          overview: "overview",
          worldViews: mockWorldViews,
          genres: mockGenres,
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
      voteAverage: 7,
      releaseDate: "releaseDate",
      overview: "overview",
      worldViews: mockWorldViews,
      genres: mockGenres,
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

test("SET_KEYWORDアクションがディスパッチされた際、keywordが指定された値に更新されること", () => {
  const { result } = renderHook(() => useVideoListContext(), {
    wrapper: ({ children }) => <VideoListProvider>{children}</VideoListProvider>,
  });
  expect(result.current.state.keyword).toBe("");
  act(() => {
    result.current.dispatch({
      type: "SET_KEYWORD",
      payload: "キーワード",
    });
  });
  expect(result.current.state.keyword).toBe("キーワード");
});

test("SET_SHOULD_DEBOUNCEアクションがディスパッチされた際、shouldDebounceが指定された値に更新されること", () => {
  const { result } = renderHook(() => useVideoListContext(), {
    wrapper: ({ children }) => <VideoListProvider>{children}</VideoListProvider>,
  });
  expect(result.current.state.shouldDebounce).toBe(false);
  act(() => {
    result.current.dispatch({
      type: "SET_SHOULD_DEBOUNCE",
      payload: true,
    });
  });
  expect(result.current.state.shouldDebounce).toBe(true);
});

test("SET_VOTE_AVERAGE_RENGEアクションがディスパッチされた際、voteAverageRangeが指定された配列に更新されること", () => {
  const { result } = renderHook(() => useVideoListContext(), {
    wrapper: ({ children }) => <VideoListProvider>{children}</VideoListProvider>,
  });
  expect(result.current.state.voteAverageRange).toEqual([0, 10]);
  act(() => {
    result.current.dispatch({
      type: "SET_VOTE_AVERAGE_RENGE",
      payload: [3, 7],
    });
  });
  expect(result.current.state.voteAverageRange).toEqual([3, 7]);
});

test("SET_IS_DISABLEDアクションがディスパッチされた際、isDisabledが指定された値に更新されること", () => {
  const { result } = renderHook(() => useVideoListContext(), {
    wrapper: ({ children }) => <VideoListProvider>{children}</VideoListProvider>,
  });
  expect(result.current.state.isDisabled).toBe(true);
  act(() => {
    result.current.dispatch({
      type: "SET_IS_DISABLED",
      payload: false,
    });
  });
  expect(result.current.state.isDisabled).toBe(false);
});

test("SET_CURRENT_PAGEアクションがディスパッチされた際、currentPageが指定された値に更新されること", () => {
  const { result } = renderHook(() => useVideoListContext(), {
    wrapper: ({ children }) => <VideoListProvider>{children}</VideoListProvider>,
  });
  expect(result.current.state.currentPage).toBe(1);
  act(() => {
    result.current.dispatch({
      type: "SET_CURRENT_PAGE",
      payload: 2,
    });
  });
  expect(result.current.state.currentPage).toBe(2);
});

test("SET_ITEMS_OFFSETアクションがディスパッチされた際、itemsOffsetが指定された値に更新されること", () => {
  const { result } = renderHook(() => useVideoListContext(), {
    wrapper: ({ children }) => <VideoListProvider>{children}</VideoListProvider>,
  });
  expect(result.current.state.itemsOffset).toBe(0);
  act(() => {
    result.current.dispatch({
      type: "SET_ITEMS_OFFSET",
      payload: 30,
    });
  });
  expect(result.current.state.itemsOffset).toBe(30);
});

test("SET_IS_SKIP_SEARCH_VIDEOアクションがディスパッチされた際、isSkipSearchVideoが指定された値に更新されること", () => {
  const { result } = renderHook(() => useVideoListContext(), {
    wrapper: ({ children }) => <VideoListProvider>{children}</VideoListProvider>,
  });
  expect(result.current.state.isSkipSearchVideo).toBe(false);
  act(() => {
    result.current.dispatch({
      type: "SET_IS_SKIP_SEARCH_VIDEO",
      payload: true,
    });
  });
  expect(result.current.state.isSkipSearchVideo).toBe(true);
});

test("SET_IS_SKIP_GET_CHECK_ITEMSアクションがディスパッチされた際、isSkipGetCheckItemsが指定された値に更新されること", () => {
  const { result } = renderHook(() => useVideoListContext(), {
    wrapper: ({ children }) => <VideoListProvider>{children}</VideoListProvider>,
  });
  expect(result.current.state.isSkipGetCheckItems).toBe(false);
  act(() => {
    result.current.dispatch({
      type: "SET_IS_SKIP_GET_CHECK_ITEMS",
      payload: true,
    });
  });
  expect(result.current.state.isSkipGetCheckItems).toBe(true);
});

test("SET_IS_VISIT_DETAIL_PAGEアクションがディスパッチされた際、isVisitedDetailPageが指定された値に更新されること", () => {
  const { result } = renderHook(() => useVideoListContext(), {
    wrapper: ({ children }) => <VideoListProvider>{children}</VideoListProvider>,
  });
  expect(result.current.state.isVisitedDetailPage).toBe(false);
  act(() => {
    result.current.dispatch({
      type: "SET_IS_VISIT_DETAIL_PAGE",
      payload: true,
    });
  });
  expect(result.current.state.isVisitedDetailPage).toBe(true);
});
