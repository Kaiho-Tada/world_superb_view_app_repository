import { renderHook } from "@testing-library/react";
import useSearchWorldView from "hooks/api/useSearchModel";

const mockToast = jest.fn();
jest.mock("@chakra-ui/react", () => ({
  ...jest.requireActual("@chakra-ui/react"),
  useToast: () => mockToast,
}));

const mockLoadingSearchModelDispatch = jest.fn();
const mockModelDispatch = jest.fn();
const mockSearchModelApi = jest.fn();

test("handleSearchWorldView成功時のテスト", async () => {
  mockSearchModelApi.mockResolvedValue({
    data: [
      { id: 1, name: "name1" },
      { id: 2, name: "name2" },
    ],
  });

  const { result } = renderHook(() => useSearchWorldView());
  await result.current.handleSearchModel({
    loadingSearchModelDispatch: mockLoadingSearchModelDispatch,
    modelDispatch: mockModelDispatch,
    searchModelApi: mockSearchModelApi,
  });

  expect(mockLoadingSearchModelDispatch).toHaveBeenCalledWith(true);
  expect(mockModelDispatch).toHaveBeenCalledWith([
    { id: 1, name: "name1" },
    { id: 2, name: "name2" },
  ]);
  expect(mockModelDispatch).toHaveBeenCalledTimes(1);
  expect(mockLoadingSearchModelDispatch).toHaveBeenCalledWith(false);
  expect(mockLoadingSearchModelDispatch).toHaveBeenCalledTimes(2);
});

test("handleSearchWorldView失敗時のテスト", async () => {
  mockSearchModelApi.mockImplementation(() => {
    const error = new Error();
    Object.assign(error, {
      isAxiosError: true,
      response: { data: { error: "絶景モデルのフィルタリング処理に失敗しました。" }, status: 500 },
    });
    throw error;
  });

  const { result } = renderHook(() => useSearchWorldView());
  await result.current.handleSearchModel({
    loadingSearchModelDispatch: mockLoadingSearchModelDispatch,
    modelDispatch: mockModelDispatch,
    searchModelApi: mockSearchModelApi,
  });

  expect(mockLoadingSearchModelDispatch).toHaveBeenCalledWith(true);
  expect(mockToast).toHaveBeenCalledWith({
    title: "絶景モデルのフィルタリング処理に失敗しました。",
    status: "error",
    position: "top",
    duration: 5000,
    isClosable: true,
  });
  expect(mockToast).toHaveBeenCalledTimes(1);
  expect(mockLoadingSearchModelDispatch).toHaveBeenCalledWith(false);
  expect(mockLoadingSearchModelDispatch).toHaveBeenCalledTimes(2);
});
