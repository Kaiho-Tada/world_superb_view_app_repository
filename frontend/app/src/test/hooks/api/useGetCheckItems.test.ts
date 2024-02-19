import { renderHook } from "@testing-library/react";
import useGetCheckItems from "hooks/api/useGetCheckItems";
import { act } from "react-dom/test-utils";

const mockUseToast = jest.fn();
jest.mock("@chakra-ui/react", () => ({
  ...jest.requireActual("@chakra-ui/react"),
  useToast: () => mockUseToast,
}));

const mockCheckItemsDispatch = jest.fn();
const mockLoadingModelDispatch = jest.fn();
const mockFetchModelApi = jest.fn();

test("handleGetCheckItems関数成功時のテスト", async () => {
  mockFetchModelApi.mockResolvedValue({
    data: [
      { id: 1, name: "name1" },
      { id: 2, name: "name2" },
    ],
  });
  const { result } = renderHook(() => useGetCheckItems());
  await act(async () => {
    await result.current.handleGetCheckItems({
      checkItemsDispatch: mockCheckItemsDispatch,
      loadingModelDispatch: mockLoadingModelDispatch,
      fetchModelApi: mockFetchModelApi,
    });
  });
  expect(mockLoadingModelDispatch).toHaveBeenCalledWith(true);
  expect(mockCheckItemsDispatch).toHaveBeenCalledWith([
    { label: "name1", checked: false },
    { label: "name2", checked: false },
  ]);
  expect(mockLoadingModelDispatch).toHaveBeenCalledWith(false);
  expect(mockLoadingModelDispatch).toHaveBeenCalledTimes(2);
});

test("handleGetCheckItems関数失敗時のテスト", async () => {
  mockFetchModelApi.mockImplementation(() => {
    const error = new Error();
    Object.assign(error, {
      isAxiosError: true,
      response: { data: { error: "モデルの取得に失敗しました。" }, status: 500 },
    });
    throw error;
  });
  const { result } = renderHook(() => useGetCheckItems());
  await act(async () => {
    await result.current.handleGetCheckItems({
      checkItemsDispatch: mockCheckItemsDispatch,
      loadingModelDispatch: mockLoadingModelDispatch,
      fetchModelApi: mockFetchModelApi,
    });
  });
  expect(mockLoadingModelDispatch).toHaveBeenCalledWith(true);
  expect(mockCheckItemsDispatch).toHaveBeenCalledTimes(0);
  expect(mockUseToast).toHaveBeenCalledWith({
    title: "モデルの取得に失敗しました。",
    status: "error",
    position: "top",
    duration: 5000,
    isClosable: true,
  });
  expect(mockLoadingModelDispatch).toHaveBeenCalledWith(false);
  expect(mockLoadingModelDispatch).toHaveBeenCalledTimes(2);
});
