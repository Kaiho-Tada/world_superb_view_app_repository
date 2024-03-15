import { renderHook } from "@testing-library/react";
import { MapProvider, useMapContext } from "providers/MapProvider";
import { act } from "react-dom/test-utils";

test("SET_CLICKED_WORLD_VIEWSアクションがディスパッチされた際、clickedWorldViewsが指定された値に更新されること", () => {
  const mockClickedWorldViews = Array.from({ length: 2 }, (_, index) => ({
    id: index + 1,
    name: `worldView${index + 1}`,
    imgUrl: "画像URL",
    countries: [{ id: index + 1, name: `country${index + 1}`, riskLevel: 1, bmi: 1 }],
    latitude: 0,
    longitude: 0,
  }));

  const { result } = renderHook(() => useMapContext(), {
    wrapper: ({ children }) => <MapProvider>{children}</MapProvider>,
  });
  expect(result.current.state.clickedWorldViews).toEqual(null);
  act(() => {
    result.current.dispatch({ type: "SET_CLICKED_WORLD_VIEWS", payload: mockClickedWorldViews });
  });
  expect(result.current.state.clickedWorldViews).toEqual(mockClickedWorldViews);
});

test("SET_CLICKED_VIDEOSアクションがディスパッチされた際、clickedVideosが指定された値に更新されること", () => {
  const mockClickedVideos = Array.from({ length: 2 }, (_, index) => {
    const id = index + 1;
    return {
      id,
      title: `title${id}`,
      posterPath: `posterPath${id}`,
      releaseDate: `releaseDate${id}`,
    };
  });

  const { result } = renderHook(() => useMapContext(), {
    wrapper: ({ children }) => <MapProvider>{children}</MapProvider>,
  });
  expect(result.current.state.clickedVideos).toEqual(null);
  act(() => {
    result.current.dispatch({ type: "SET_CLICKED_VIDEOS", payload: mockClickedVideos });
  });
  expect(result.current.state.clickedVideos).toEqual(mockClickedVideos);
});

test("SET_VISIBLE_VALUEアクションがディスパッチされた際、visibleValueが指定された値に更新されること", () => {
  const { result } = renderHook(() => useMapContext(), {
    wrapper: ({ children }) => <MapProvider>{children}</MapProvider>,
  });
  expect(result.current.state.visibleValue).toEqual("worldView");
  act(() => {
    result.current.dispatch({ type: "SET_VISIBLE_VALUE", payload: "video" });
  });
  expect(result.current.state.visibleValue).toEqual("video");
});
