import { renderHook } from "@testing-library/react";
import useGetModel from "hooks/api/useGetModel";

const mockToast = jest.fn();
jest.mock("@chakra-ui/react", () => ({
  ...jest.requireActual("@chakra-ui/react"),
  useToast: () => mockToast,
}));

const mockLoadingGetModelDispatch = jest.fn();
const mockModelDispatch = jest.fn();
const mockGetModelApi = jest.fn();

test("handleGetModel成功時のテスト", async () => {
  mockGetModelApi.mockResolvedValue({
    data: [
      { id: 1, name: "name1" },
      { id: 2, name: "name2" },
    ],
  });

  const { result } = renderHook(() => useGetModel());
  await result.current.handleGetModel({
    loadingGetModelDispatch: mockLoadingGetModelDispatch,
    modelDispatch: mockModelDispatch,
    getModelApi: mockGetModelApi,
  });

  expect(mockLoadingGetModelDispatch).toHaveBeenCalledWith(true);
  expect(mockModelDispatch).toHaveBeenCalledWith([
    { id: 1, name: "name1" },
    { id: 2, name: "name2" },
  ]);
  expect(mockModelDispatch).toHaveBeenCalledTimes(1);
  expect(mockLoadingGetModelDispatch).toHaveBeenCalledWith(false);
  expect(mockLoadingGetModelDispatch).toHaveBeenCalledTimes(2);
});

test("handleGetModel失敗時のテスト", async () => {
  mockGetModelApi.mockImplementation(() => {
    const error = new Error();
    Object.assign(error, {
      isAxiosError: true,
      response: { status: 500 },
    });
    throw error;
  });

  const { result } = renderHook(() => useGetModel());
  await result.current.handleGetModel({
    loadingGetModelDispatch: mockLoadingGetModelDispatch,
    modelDispatch: mockModelDispatch,
    getModelApi: mockGetModelApi,
  });

  expect(mockLoadingGetModelDispatch).toHaveBeenCalledWith(true);
  expect(mockToast).toHaveBeenCalledWith({
    title: "データの取得に失敗しました。",
    status: "error",
    position: "top",
    duration: 5000,
    isClosable: true,
  });
  expect(mockToast).toHaveBeenCalledTimes(1);
  expect(mockLoadingGetModelDispatch).toHaveBeenCalledWith(false);
  expect(mockLoadingGetModelDispatch).toHaveBeenCalledTimes(2);
});
