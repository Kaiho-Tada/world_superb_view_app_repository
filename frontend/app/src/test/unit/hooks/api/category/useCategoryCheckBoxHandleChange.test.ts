import { renderHook } from "@testing-library/react";
import MockAdapter from "axios-mock-adapter";
import useCategoryCheckBoxHandleChange from "hooks/api/category/useCategoryCheckBoxHandleChange";
import client from "lib/api/client";
import { ChangeEvent } from "react";
import { act } from "react-dom/test-utils";

const mockUseToast = jest.fn();
jest.mock("@chakra-ui/react", () => ({
  ...jest.requireActual("@chakra-ui/react"),
  useToast: () => mockUseToast,
}));

const mockSetCategoriesWithCheckBoxData = jest.fn();
const mockSetCheckedCategoryLabels = jest.fn();
const mockSetLoadingSearchSuperbViews = jest.fn();
const mockSetSuperbViews = jest.fn();

jest.mock("hooks/providers/SuperbViewListProvider", () => ({
  ...jest.requireActual("hooks/providers/SuperbViewListProvider"),
  useSuperbViewListContext: () => ({
    setCategoriesWithCheckBoxData: mockSetCategoriesWithCheckBoxData,
    setCheckedCategoryLabels: mockSetCheckedCategoryLabels,
    setLoadingSearchSuperbViews: mockSetLoadingSearchSuperbViews,
    setSuperbViews: mockSetSuperbViews,
    categoriesWithCheckBoxData: [
      {
        label: "城",
        classification: "人工",
        superbViewNames: ["ノイシュバンシュタイン城", "万里の長城"],
        checked: false,
      },
    ],
  }),
}));

const mockAxios = new MockAdapter(client);
mockAxios.onGet("/superb_views/search").reply((config) => {
  if (config.params.category_names.includes("城")) {
    return [
      200,
      [
        {
          id: 1,
          name: "ノイシュバンシュタイン城",
          imageUrl: "imageUrl",
          bestSeason: "bestSeason",
        },
        {
          id: 2,
          name: "万里の長城",
          imageUrl: "imageUrl",
          bestSeason: "bestSeason",
        },
      ],
    ];
  }
  return [500];
});

test("handleChange成功時のテスト", async () => {
  const { result } = renderHook(() => useCategoryCheckBoxHandleChange());

  const mockEvent = { target: { value: "城" } };

  await act(() => {
    result.current.handleChange(mockEvent as ChangeEvent<HTMLInputElement>);
  });

  expect(mockSetCategoriesWithCheckBoxData).toHaveBeenCalledWith([
    {
      label: "城",
      classification: "人工",
      superbViewNames: ["ノイシュバンシュタイン城", "万里の長城"],
      checked: true,
    },
  ]);
  expect(mockSetCategoriesWithCheckBoxData).toHaveBeenCalledTimes(1);

  expect(mockSetCheckedCategoryLabels).toHaveBeenCalledWith(["城"]);
  expect(mockSetCheckedCategoryLabels).toHaveBeenCalledTimes(1);

  expect(mockSetLoadingSearchSuperbViews).toHaveBeenCalledWith(true);

  expect(mockSetSuperbViews).toHaveBeenCalledWith([
    {
      id: 1,
      name: "ノイシュバンシュタイン城",
      imageUrl: "imageUrl",
      bestSeason: "bestSeason",
    },
    {
      id: 2,
      name: "万里の長城",
      imageUrl: "imageUrl",
      bestSeason: "bestSeason",
    },
  ]);
  expect(mockSetSuperbViews).toHaveBeenCalledTimes(1);

  expect(mockSetLoadingSearchSuperbViews).toHaveBeenCalledWith(false);
  expect(mockSetLoadingSearchSuperbViews).toHaveBeenCalledTimes(2);
});

test("handleChange失敗時のテスト", async () => {
  const { result } = renderHook(() => useCategoryCheckBoxHandleChange());

  const mockEvent = { target: { value: "洞窟" } };

  await act(() => {
    result.current.handleChange(mockEvent as ChangeEvent<HTMLInputElement>);
  });

  expect(mockSetCategoriesWithCheckBoxData).toHaveBeenCalledWith([
    {
      label: "城",
      classification: "人工",
      superbViewNames: ["ノイシュバンシュタイン城", "万里の長城"],
      checked: false,
    },
  ]);
  expect(mockSetCategoriesWithCheckBoxData).toHaveBeenCalledTimes(1);

  expect(mockSetCheckedCategoryLabels).toHaveBeenCalledWith([]);
  expect(mockSetCheckedCategoryLabels).toHaveBeenCalledTimes(1);

  expect(mockSetLoadingSearchSuperbViews).toHaveBeenCalledWith(true);

  expect(mockSetSuperbViews).not.toHaveBeenCalledWith();
  expect(mockSetSuperbViews).toHaveBeenCalledTimes(0);

  expect(mockUseToast).toHaveBeenCalledWith({
    title: "絶景一覧の取得に失敗しました。",
    status: "error",
    position: "top",
    duration: 5000,
    isClosable: true,
  });
  expect(mockUseToast).toHaveBeenCalledTimes(1);

  expect(mockSetLoadingSearchSuperbViews).toHaveBeenCalledWith(false);
  expect(mockSetLoadingSearchSuperbViews).toHaveBeenCalledTimes(2);
});
