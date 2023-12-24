import { renderHook } from "@testing-library/react";
import useGetAllWorldViews from "hooks/api/worldView/useGetAllWorldViews";
import { act } from "react-dom/test-utils";

const mockUseToast = jest.fn();
jest.mock("@chakra-ui/react", () => ({
  ...jest.requireActual("@chakra-ui/react"),
  useToast: () => mockUseToast,
}));

const spyOnWorldViewApi = jest.spyOn(jest.requireActual("lib/api/worldViewApi"), "default");
test("WorldView取得成功時のテスト", async () => {
  spyOnWorldViewApi.mockImplementation(() => ({
    getAllWorldViewsApi: jest.fn().mockImplementation(() => ({
      data: [
        {
          id: 1,
          name: "world_view1",
          imageUrl: "imageUrl1",
          bestSeason: "bestSeason1",
        },
        {
          id: 2,
          name: "world_view2",
          imageUrl: "imageUrl2",
          bestSeason: "bestSeason2",
        },
      ],
    })),
  }));

  const { result } = renderHook(() => useGetAllWorldViews());
  expect(result.current.WorldViews).toEqual([]);
  expect(result.current.loadingWorldViews).toBe(false);
  await act(async () => {
    await result.current.getAllWorldViews();
  });
  expect(result.current.WorldViews).toEqual([
    {
      id: 1,
      name: "world_view1",
      imageUrl: "imageUrl1",
      bestSeason: "bestSeason1",
    },
    {
      id: 2,
      name: "world_view2",
      imageUrl: "imageUrl2",
      bestSeason: "bestSeason2",
    },
  ]);
  expect(result.current.loadingWorldViews).toBe(false);
});

test("WorldView取得失敗時のテスト", async () => {
  spyOnWorldViewApi.mockImplementation(() => ({
    getAllWorldViewsApi: jest.fn().mockImplementation(() => {
      const error = new Error();
      Object.assign(error, { isAxiosError: true, response: { status: 500 } });
      throw error;
    }),
  }));
  const { result } = renderHook(() => useGetAllWorldViews());
  expect(result.current.WorldViews).toEqual([]);
  expect(result.current.loadingWorldViews).toBe(false);
  await act(async () => {
    await result.current.getAllWorldViews();
  });
  expect(result.current.WorldViews).toEqual([]);
  expect(result.current.loadingWorldViews).toBe(false);
  expect(mockUseToast).toHaveBeenCalledWith({
    title: "WorldViewsの取得に失敗しました",
    status: "error",
    position: "top",
    duration: 5000,
    isClosable: true,
  });
});
