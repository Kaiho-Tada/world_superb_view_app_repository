import { renderHook } from "@testing-library/react";
import useGetNestedCheckItems from "hooks/api/useGetNestedCheckItems";
import { act } from "react-dom/test-utils";

const mockUseToast = jest.fn();
jest.mock("@chakra-ui/react", () => ({
  ...jest.requireActual("@chakra-ui/react"),
  useToast: () => mockUseToast,
}));

const mockLoadingGetModelDispatch = jest.fn();
const mockCheckItemsDispatch = jest.fn();
const mockGetAllModelApi = jest.fn();

test("handleGetCheckItems関数成功時のテスト", async () => {
  mockGetAllModelApi.mockResolvedValue({
    data: [
      { id: 1, name: "name1", parent: "parent1" },
      { id: 2, name: "name2", parent: "parent2" },
    ],
  });
  const { result } = renderHook(() => useGetNestedCheckItems());
  await act(async () => {
    await result.current.handleGetNestedCheckItems({
      loadingGetModelDispatch: mockLoadingGetModelDispatch,
      checkItemsDispatch: mockCheckItemsDispatch,
      getAllModelApi: mockGetAllModelApi,
    });
  });
  expect(mockLoadingGetModelDispatch).toHaveBeenCalledWith(true);
  expect(mockCheckItemsDispatch).toHaveBeenCalledWith([
    { label: "name1", parentLabel: "parent1", checked: false, isVisible: false },
    { label: "name2", parentLabel: "parent2", checked: false, isVisible: false },
  ]);
  expect(mockLoadingGetModelDispatch).toHaveBeenCalledWith(false);
  expect(mockLoadingGetModelDispatch).toHaveBeenCalledTimes(2);
});

test("handleGetCheckItems関数失敗時のテスト", async () => {
  mockGetAllModelApi.mockImplementation(() => {
    const error = new Error();
    Object.assign(error, {
      isAxiosError: true,
      response: { status: 500 },
    });
    throw error;
  });
  const { result } = renderHook(() => useGetNestedCheckItems());
  await act(async () => {
    await result.current.handleGetNestedCheckItems({
      loadingGetModelDispatch: mockLoadingGetModelDispatch,
      checkItemsDispatch: mockCheckItemsDispatch,
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
