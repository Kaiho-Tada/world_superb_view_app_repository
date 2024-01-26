import { renderHook } from "@testing-library/react";
import useGetNestedCheckBoxItems from "hooks/api/useGetNestedCheckBoxItems";
import { act } from "react-dom/test-utils";

const mockUseToast = jest.fn();
jest.mock("@chakra-ui/react", () => ({
  ...jest.requireActual("@chakra-ui/react"),
  useToast: () => mockUseToast,
}));

const mockLoadingCheckBoxItemsDispatch = jest.fn();
const mockCheckBoxItemsDispatch = jest.fn();
const mockGetAllModelApi = jest.fn();

test("handleGetCheckBoxItems関数成功時のテスト", async () => {
  mockGetAllModelApi.mockResolvedValue({
    data: [
      { id: 1, name: "name1", parent: "parent1" },
      { id: 2, name: "name2", parent: "parent2" },
    ],
  });
  const { result } = renderHook(() => useGetNestedCheckBoxItems());
  await act(async () => {
    await result.current.handleGetNestedCheckBoxItems({
      loadingCheckBoxItemsDispatch: mockLoadingCheckBoxItemsDispatch,
      checkBoxItemsDispatch: mockCheckBoxItemsDispatch,
      getAllModelApi: mockGetAllModelApi,
    });
  });
  expect(mockLoadingCheckBoxItemsDispatch).toHaveBeenCalledWith(true);
  expect(mockCheckBoxItemsDispatch).toHaveBeenCalledWith([
    { label: "name1", parentLabel: "parent1", checked: false },
    { label: "name2", parentLabel: "parent2", checked: false },
  ]);
  expect(mockLoadingCheckBoxItemsDispatch).toHaveBeenCalledWith(false);
  expect(mockLoadingCheckBoxItemsDispatch).toHaveBeenCalledTimes(2);
});

test("handleGetCheckBoxItems関数失敗時のテスト", async () => {
  mockGetAllModelApi.mockImplementation(() => {
    const error = new Error();
    Object.assign(error, {
      isAxiosError: true,
      response: { data: { error: "モデルの取得に失敗しました。" }, status: 500 },
    });
    throw error;
  });
  const { result } = renderHook(() => useGetNestedCheckBoxItems());
  await act(async () => {
    await result.current.handleGetNestedCheckBoxItems({
      loadingCheckBoxItemsDispatch: mockLoadingCheckBoxItemsDispatch,
      checkBoxItemsDispatch: mockCheckBoxItemsDispatch,
      getAllModelApi: mockGetAllModelApi,
    });
  });
  expect(mockLoadingCheckBoxItemsDispatch).toHaveBeenCalledWith(true);
  expect(mockUseToast).toHaveBeenCalledWith({
    title: "モデルの取得に失敗しました。",
    status: "error",
    position: "top",
    duration: 5000,
    isClosable: true,
  });
  expect(mockLoadingCheckBoxItemsDispatch).toHaveBeenCalledWith(false);
  expect(mockLoadingCheckBoxItemsDispatch).toHaveBeenCalledTimes(2);
});
