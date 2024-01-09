import { renderHook } from "@testing-library/react";
import useSearchWorldView from "features/worldView/hooks/api/useSearchWorldView";

const mockUseToast = jest.fn();
jest.mock("@chakra-ui/react", () => ({
  ...jest.requireActual("@chakra-ui/react"),
  useToast: () => mockUseToast,
}));

const spyOnUseWorldViewListContext = jest.spyOn(
  jest.requireActual("providers/WorldViewListProvider"),
  "useWorldViewListContext"
);

const mockDispatch = jest.fn();
const mockContextValue = {
  dispatch: mockDispatch,
};

const mockSearchWorldViewApi = jest.fn();
jest.mock("features/worldView/api/worldViewApi", () => ({
  __esModule: true,
  default: () => ({
    searchWorldViewApi: mockSearchWorldViewApi,
  }),
}));

test("handleSearchWorldView成功時のテスト", async () => {
  spyOnUseWorldViewListContext.mockReturnValue(mockContextValue);
  mockSearchWorldViewApi.mockResolvedValue({
    data: [
      {
        id: 1,
        name: "万里の長城",
      },
      {
        id: 2,
        name: "蘆笛岩",
      },
    ],
  });

  const { result } = renderHook(() => useSearchWorldView());
  await result.current.handleSearchWorldView();
  expect(mockDispatch).toHaveBeenCalledWith({
    type: "SET_WORLD_VIEWS",
    payload: [
      {
        id: 1,
        name: "万里の長城",
      },
      {
        id: 2,
        name: "蘆笛岩",
      },
    ],
  });

  expect(mockUseToast).not.toHaveBeenCalledWith();
  expect(mockUseToast).toHaveBeenCalledTimes(0);
  expect(mockDispatch).toHaveBeenCalledWith({
    type: "SET_LOADING_SEARCH_WORLDVIEWS",
    payload: false,
  });
});

test("handleSearchWorldView失敗時のテスト", async () => {
  spyOnUseWorldViewListContext.mockReturnValue(mockContextValue);
  mockSearchWorldViewApi.mockRejectedValue(new Error());
  const { result } = renderHook(() => useSearchWorldView());
  await result.current.handleSearchWorldView();
  expect(mockDispatch).toHaveBeenCalledWith({
    type: "SET_LOADING_SEARCH_WORLDVIEWS",
    payload: true,
  });
  expect(mockUseToast).toHaveBeenCalledWith({
    title: "絶景一覧の取得に失敗しました。",
    status: "error",
    position: "top",
    duration: 5000,
    isClosable: true,
  });
  expect(mockUseToast).toHaveBeenCalledTimes(1);
  expect(mockDispatch).toHaveBeenCalledWith({
    type: "SET_LOADING_SEARCH_WORLDVIEWS",
    payload: false,
  });
});
