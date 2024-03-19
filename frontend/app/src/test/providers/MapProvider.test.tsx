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
  expect(result.current.state.visibleValue).toEqual("marker");
  act(() => {
    result.current.dispatch({ type: "SET_VISIBLE_VALUE", payload: "image" });
  });
  expect(result.current.state.visibleValue).toEqual("image");
});

test("SET_SELECTED_VALUEアクションがディスパッチされた際、selectedValueが指定された値に更新されること", () => {
  const { result } = renderHook(() => useMapContext(), {
    wrapper: ({ children }) => <MapProvider>{children}</MapProvider>,
  });
  expect(result.current.state.selectedValue).toEqual("worldView");
  act(() => {
    result.current.dispatch({ type: "SET_SELECTED_VALUE", payload: "video" });
  });
  expect(result.current.state.selectedValue).toEqual("video");
});

test("SET_LAYER_VALUEアクションがディスパッチされた際、layerValueが指定された値に更新されること", () => {
  const { result } = renderHook(() => useMapContext(), {
    wrapper: ({ children }) => <MapProvider>{children}</MapProvider>,
  });
  expect(result.current.state.layerValue).toEqual("aerialShot");
  act(() => {
    result.current.dispatch({ type: "SET_LAYER_VALUE", payload: "simple" });
  });
  expect(result.current.state.layerValue).toEqual("simple");
});

test("SET_LAYER_VALUEアクションがディスパッチされた際、layerValueが指定された値に更新されること", () => {
  const { result } = renderHook(() => useMapContext(), {
    wrapper: ({ children }) => <MapProvider>{children}</MapProvider>,
  });
  expect(result.current.state.layerValue).toEqual("aerialShot");
  act(() => {
    result.current.dispatch({ type: "SET_LAYER_VALUE", payload: "simple" });
  });
  expect(result.current.state.layerValue).toEqual("simple");
});

test("SET_MAP_CENTERアクションがディスパッチされた際、mapCenterが指定された値に更新されること", () => {
  const { result } = renderHook(() => useMapContext(), {
    wrapper: ({ children }) => <MapProvider>{children}</MapProvider>,
  });
  expect(result.current.state.mapCenter).toEqual([30, 0]);
  act(() => {
    result.current.dispatch({ type: "SET_MAP_CENTER", payload: [100, 1000] });
  });
  expect(result.current.state.mapCenter).toEqual([100, 1000]);
});

test("SET_ZOOMアクションがディスパッチされた際、zoomが指定された値に更新されること", () => {
  const { result } = renderHook(() => useMapContext(), {
    wrapper: ({ children }) => <MapProvider>{children}</MapProvider>,
  });
  expect(result.current.state.zoom).toEqual(2);
  act(() => {
    result.current.dispatch({ type: "SET_ZOOM", payload: 10 });
  });
  expect(result.current.state.zoom).toEqual(10);
});
