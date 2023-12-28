import { renderHook } from "@testing-library/react";
import useGetCategoryCheckBoxItems from "hooks/api/category/useGetCategoryCheckBoxItems";
import mockGetAllCategoriesApi from "lib/api/categoryApi";
import { act } from "react-dom/test-utils";

const mockUseToast = jest.fn();
jest.mock("@chakra-ui/react", () => ({
  ...jest.requireActual("@chakra-ui/react"),
  useToast: () => mockUseToast,
}));

jest.mock("lib/api/categoryApi", () => ({
  __esModule: true,
  default: jest.fn(),
}));

const mockDispatch = jest.fn();
jest.mock("hooks/providers/WorldViewListProvider", () => ({
  useWorldViewListContext: () => ({
    dispatch: mockDispatch,
  }),
}));

test("categoryCheckBoxItems取得成功時のテスト", async () => {
  (mockGetAllCategoriesApi as jest.Mock).mockResolvedValue({
    data: [
      {
        id: 1,
        name: "洞窟",
        classification: "自然",
      },
      {
        id: 2,
        name: "城",
        classification: "人工",
      },
    ],
  });
  const { result } = renderHook(() => useGetCategoryCheckBoxItems());
  await act(async () => {
    await result.current.getCategoryCheckBoxItems();
  });
  expect(mockDispatch).toHaveBeenCalledWith({
    type: "SET_LOADING_CATEGORY_CHECKBOX_ITEMS",
    payload: true,
  });
  expect(mockDispatch).toHaveBeenCalledWith({
    type: "SET_CATEGORY_CHECKBOX_ITEMS",
    payload: [
      {
        label: "洞窟",
        classification: "自然",
        checked: false,
      },
      {
        label: "城",
        classification: "人工",
        checked: false,
      },
    ],
  });
  expect(mockDispatch).toHaveBeenCalledWith({
    type: "SET_LOADING_CATEGORY_CHECKBOX_ITEMS",
    payload: false,
  });
});

test("categoryCheckBoxItems取得失敗時のテスト", async () => {
  (mockGetAllCategoriesApi as jest.Mock).mockRejectedValue(new Error());
  const { result } = renderHook(() => useGetCategoryCheckBoxItems());
  await act(async () => {
    await result.current.getCategoryCheckBoxItems();
  });
  expect(mockDispatch).toHaveBeenCalledWith({
    type: "SET_LOADING_CATEGORY_CHECKBOX_ITEMS",
    payload: true,
  });
  expect(mockUseToast).toHaveBeenCalledWith({
    title: "categoriesの取得に失敗しました。",
    status: "error",
    position: "top",
    duration: 5000,
    isClosable: true,
  });
  expect(mockDispatch).toHaveBeenCalledWith({
    type: "SET_LOADING_CATEGORY_CHECKBOX_ITEMS",
    payload: false,
  });
});
