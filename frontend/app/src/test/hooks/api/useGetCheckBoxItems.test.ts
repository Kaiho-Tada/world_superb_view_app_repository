import { renderHook } from "@testing-library/react";
import useGetCheckBoxItems from "hooks/api/useGetCheckBoxItems";
import { act } from "react-dom/test-utils";

const mockUseToast = jest.fn();
jest.mock("@chakra-ui/react", () => ({
  ...jest.requireActual("@chakra-ui/react"),
  useToast: () => mockUseToast,
}));

const mockLoadingGetModelDispatch = jest.fn();
const mockCheckBoxItemsDispatch = jest.fn();
const mockGetAllModelApi = jest.fn();

test("handleGetCheckBoxItems関数成功時のテスト", async () => {
  mockGetAllModelApi.mockResolvedValue({
    data: [
      { id: 1, name: "name1" },
      { id: 2, name: "name2" },
    ],
  });
  const { result } = renderHook(() => useGetCheckBoxItems());
  await act(async () => {
    await result.current.handleGetCheckBoxItems({
      loadingGetModelDispatch: mockLoadingGetModelDispatch,
      checkBoxItemsDispatch: mockCheckBoxItemsDispatch,
      getAllModelApi: mockGetAllModelApi,
    });
  });
  expect(mockLoadingGetModelDispatch).toHaveBeenCalledWith(true);
  expect(mockCheckBoxItemsDispatch).toHaveBeenCalledWith([
    { label: "name1", checked: false },
    { label: "name2", checked: false },
  ]);
  expect(mockLoadingGetModelDispatch).toHaveBeenCalledWith(false);
  expect(mockLoadingGetModelDispatch).toHaveBeenCalledTimes(2);
});

test("handleGetCheckBoxItems関数失敗時のテスト", async () => {
  mockGetAllModelApi.mockImplementation(() => {
    const error = new Error();
    Object.assign(error, {
      isAxiosError: true,
      response: { status: 500 },
    });
    throw error;
  });
  const { result } = renderHook(() => useGetCheckBoxItems());
  await act(async () => {
    await result.current.handleGetCheckBoxItems({
      loadingGetModelDispatch: mockLoadingGetModelDispatch,
      checkBoxItemsDispatch: mockCheckBoxItemsDispatch,
      getAllModelApi: mockGetAllModelApi,
    });
  });
  expect(mockLoadingGetModelDispatch).toHaveBeenCalledWith(true);
  expect(mockUseToast).toHaveBeenCalledWith({
    title: "データの取得に失敗しました。",
    status: "error",
    position: "top",
    duration: 5000,
    isClosable: true,
  });
  expect(mockLoadingGetModelDispatch).toHaveBeenCalledWith(false);
  expect(mockLoadingGetModelDispatch).toHaveBeenCalledTimes(2);
});
