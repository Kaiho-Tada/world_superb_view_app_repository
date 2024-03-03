import { renderHook } from "@testing-library/react";
import useGetModel from "hooks/api/useGetModel";

const mockToast = jest.fn();
jest.mock("@chakra-ui/react", () => ({
  ...jest.requireActual("@chakra-ui/react"),
  useToast: () => mockToast,
}));

const mockLoadingSearchModelDispatch = jest.fn();
const mockModelDispatch = jest.fn();
const mockSearchModelApi = jest.fn();

test("handleGetModel成功時のテスト", async () => {
  mockSearchModelApi.mockResolvedValue({
    data: [
      { id: 1, name: "name1" },
      { id: 2, name: "name2" },
    ],
  });

  const { result } = renderHook(() => useGetModel());
  await result.current.handleGetModel({
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

test("handleGetModel失敗時のテスト", async () => {
  mockSearchModelApi.mockImplementation(() => {
    const error = new Error();
    Object.assign(error, {
      isAxiosError: true,
      response: { status: 500 },
    });
    throw error;
  });

  const { result } = renderHook(() => useGetModel());
  await result.current.handleGetModel({
    loadingSearchModelDispatch: mockLoadingSearchModelDispatch,
    modelDispatch: mockModelDispatch,
    searchModelApi: mockSearchModelApi,
  });

  expect(mockLoadingSearchModelDispatch).toHaveBeenCalledWith(true);
  expect(mockToast).toHaveBeenCalledWith({
    title: "データの取得に失敗しました。",
    status: "error",
    position: "top",
    duration: 5000,
    isClosable: true,
  });
  expect(mockToast).toHaveBeenCalledTimes(1);
  expect(mockLoadingSearchModelDispatch).toHaveBeenCalledWith(false);
  expect(mockLoadingSearchModelDispatch).toHaveBeenCalledTimes(2);
});
