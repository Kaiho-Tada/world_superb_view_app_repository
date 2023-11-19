import { renderHook } from "@testing-library/react";
import MockAdapter from "axios-mock-adapter";
import useGetAllCategoriesWithCheckBoxData from "hooks/api/category/useGetAllCategoriesWithCheckBoxData";
import client from "lib/api/client";
import { act } from "react-dom/test-utils";

const mockUseToast = jest.fn();
jest.mock("@chakra-ui/react", () => ({
  ...jest.requireActual("@chakra-ui/react"),
  useToast: () => mockUseToast,
}));

const mockAxios = new MockAdapter(client);

test("categoriesWithCheckBoxData取得成功時のテスト", async () => {
  mockAxios.onGet("/categories").reply(200, [
    {
      id: 1,
      name: "洞窟",
      classification: "自然",
      superbViews: [
        {
          id: 1,
          name: "マテーラの洞窟住居",
        },
        {
          id: 2,
          name: "蘆笛岩",
        },
      ],
    },
    {
      id: 2,
      name: "城",
      classification: "人工",
      superbViews: [
        {
          id: 3,
          name: "スワローズネスト",
        },
      ],
    },
  ]);
  const { result } = renderHook(() => useGetAllCategoriesWithCheckBoxData());
  expect(result.current.categoriesWithCheckBoxData).toEqual([]);
  expect(result.current.loadingCategoriesWithCheckBoxData).toBe(false);
  await act(() => {
    result.current.getAllCategoriesWithCheckBoxData();
  });

  expect(result.current.categoriesWithCheckBoxData).toEqual([
    {
      label: "洞窟",
      classification: "自然",
      superbViewNames: ["マテーラの洞窟住居", "蘆笛岩"],
      checked: false,
    },
    {
      label: "城",
      classification: "人工",
      superbViewNames: ["スワローズネスト"],
      checked: false,
    },
  ]);
  expect(result.current.loadingCategoriesWithCheckBoxData).toBe(false);
});

test("categoriesWithCheckBoxData取得失敗時のテスト", async () => {
  mockAxios.onGet("/categories").reply(500);
  const { result } = renderHook(() => useGetAllCategoriesWithCheckBoxData());
  expect(result.current.categoriesWithCheckBoxData).toEqual([]);
  expect(result.current.loadingCategoriesWithCheckBoxData).toBe(false);
  await act(() => {
    result.current.getAllCategoriesWithCheckBoxData();
  });
  expect(result.current.categoriesWithCheckBoxData).toEqual([]);
  expect(result.current.loadingCategoriesWithCheckBoxData).toBe(false);
  expect(mockUseToast).toHaveBeenCalledWith({
    title: "categoriesの取得に失敗しました。",
    status: "error",
    position: "top",
    duration: 5000,
    isClosable: true,
  });
});
