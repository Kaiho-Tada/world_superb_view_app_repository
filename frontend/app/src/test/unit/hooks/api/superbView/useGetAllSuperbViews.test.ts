import { renderHook } from "@testing-library/react";
import MockAdapter from "axios-mock-adapter";
import useGetAllSuperbViews from "hooks/api/superbView/useGetAllSuperbViews";
import client from "lib/api/client";
import { act } from "react-dom/test-utils";

const mockUseToast = jest.fn();
jest.mock("@chakra-ui/react", () => ({
  ...jest.requireActual("@chakra-ui/react"),
  useToast: () => mockUseToast,
}));

const mockAxios = new MockAdapter(client);

test("SuperbView取得成功時のテスト", async () => {
  mockAxios.onGet("/superb_views").reply(200, [
    {
      id: 1,
      name: "superb_view1",
      imageUrl: "imageUrl1",
      bestSeason: "bestSeason1",
    },
    {
      id: 2,
      name: "superb_view2",
      imageUrl: "imageUrl2",
      bestSeason: "bestSeason2",
    },
  ]);
  const { result } = renderHook(() => useGetAllSuperbViews());
  expect(result.current.SuperbViews).toEqual([]);
  expect(result.current.loadingSuperbViews).toBe(false);
  await act(async () => {
    await result.current.getAllSuperbViews();
  });
  expect(result.current.SuperbViews).toEqual([
    {
      id: 1,
      name: "superb_view1",
      imageUrl: "imageUrl1",
      bestSeason: "bestSeason1",
    },
    {
      id: 2,
      name: "superb_view2",
      imageUrl: "imageUrl2",
      bestSeason: "bestSeason2",
    },
  ]);
  expect(result.current.loadingSuperbViews).toBe(false);
});

test("SuperbView取得失敗時のテスト", async () => {
  mockAxios.onGet("/superb_views").reply(500);
  const { result } = renderHook(() => useGetAllSuperbViews());
  expect(result.current.SuperbViews).toEqual([]);
  expect(result.current.loadingSuperbViews).toBe(false);
  await act(async () => {
    await result.current.getAllSuperbViews();
  });
  expect(result.current.SuperbViews).toEqual([]);
  expect(result.current.loadingSuperbViews).toBe(false);
  expect(mockUseToast).toHaveBeenCalledWith({
    title: "SuperbViewsの取得に失敗しました",
    status: "error",
    position: "top",
    duration: 5000,
    isClosable: true,
  });
});
