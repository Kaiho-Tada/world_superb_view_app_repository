import { renderHook } from "@testing-library/react";
import MockAdapter from "axios-mock-adapter";
import useGetAllCategories from "hooks/api/category/useGetAllCategories";
import client from "lib/api/client";
import { act } from "react-dom/test-utils";

const mockUseToast = jest.fn();
jest.mock("@chakra-ui/react", () => ({
  ...jest.requireActual("@chakra-ui/react"),
  useToast: () => mockUseToast,
}));

const mockAxios = new MockAdapter(client);

test("category取得成功時のテスト", async () => {
  mockAxios.onGet("/categories").reply(200, [
    {
      id: 1,
      name: "category1",
      classification: "滝",
    },
    {
      id: 2,
      name: "category2",
      classification: "湖",
    },
  ]);
  const { result } = renderHook(() => useGetAllCategories());
  expect(result.current.categories).toEqual([]);
  expect(result.current.loadingCategories).toBe(false);
  await act(() => {
    result.current.getAllCategories();
  });
  expect(result.current.categories).toEqual([
    {
      id: 1,
      name: "category1",
      classification: "滝",
    },
    {
      id: 2,
      name: "category2",
      classification: "湖",
    },
  ]);
  expect(result.current.loadingCategories).toBe(false);
});

test("category取得失敗時のテスト", async () => {
  mockAxios.onGet("/categories").reply(500);
  const { result } = renderHook(() => useGetAllCategories());
  expect(result.current.categories).toEqual([]);
  expect(result.current.loadingCategories).toBe(false);
  await act(() => {
    result.current.getAllCategories();
  });
  expect(result.current.categories).toEqual([]);
  expect(result.current.loadingCategories).toBe(false);
  expect(mockUseToast).toHaveBeenCalledWith({
    title: "categoriesの取得に失敗しました。",
    status: "error",
    position: "top",
    duration: 5000,
    isClosable: true,
  });
});
