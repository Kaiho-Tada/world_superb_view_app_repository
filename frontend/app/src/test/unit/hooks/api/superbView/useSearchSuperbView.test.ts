import { renderHook } from "@testing-library/react";
import MockAdapter from "axios-mock-adapter";
import useSearchSuperbView from "hooks/api/superbView/useSearchSuperbView";
import client from "lib/api/client";

const mockUseToast = jest.fn();
jest.mock("@chakra-ui/react", () => ({
  ...jest.requireActual("@chakra-ui/react"),
  useToast: () => mockUseToast,
}));

const mockSetLoadingSearchSuperbViews = jest.fn();
const mockSetSuperbViews = jest.fn();

const spyOnUseSuperbViewListContext = jest.spyOn(
  jest.requireActual("hooks/providers/SuperbViewListProvider"),
  "useSuperbViewListContext"
);

const mockContextValueSucsess = {
  setLoadingSearchSuperbViews: mockSetLoadingSearchSuperbViews,
  setSuperbViews: mockSetSuperbViews,
  checkedCategoryLabels: ["遺跡"],
  checkedCountryLabels: ["中国"],
  checkedCharacteristicLabels: ["歴史・文化的"],
  checkedRiskLevelLabels: ["1"],
  checkedMonthLabels: ["9月"],
  keyword: ["の"],
};

const mockContextValueFailure = {
  setLoadingSearchSuperbViews: mockSetLoadingSearchSuperbViews,
  setSuperbViews: mockSetSuperbViews,
};

const mockAxios = new MockAdapter(client);
mockAxios.onGet("/superb_views/search").reply((config) => {
  if (
    config.params.category_names.includes("遺跡") &&
    config.params.country_names.includes("中国") &&
    config.params.characteristic_names.includes("歴史・文化的") &&
    config.params.risk_levels.includes("1") &&
    config.params.months.includes("9月") &&
    config.params.keyword.includes("の")
  ) {
    return [
      200,
      [
        {
          id: 1,
          name: "万里の長城",
        },
      ],
    ];
  }
  return [500];
});

test("handleSearchSuperbView成功時のテスト", async () => {
  spyOnUseSuperbViewListContext.mockImplementation(() => mockContextValueSucsess);
  const { result } = renderHook(() => useSearchSuperbView());
  await result.current.handleSearchSuperbView();
  expect(mockSetLoadingSearchSuperbViews).toHaveBeenCalledWith(true);
  expect(mockSetSuperbViews).toHaveBeenCalledWith([
    {
      id: 1,
      name: "万里の長城",
    },
  ]);
  expect(mockUseToast).not.toHaveBeenCalledWith();
  expect(mockUseToast).toHaveBeenCalledTimes(0);
  expect(mockSetLoadingSearchSuperbViews).toHaveBeenCalledWith(false);
  expect(mockSetLoadingSearchSuperbViews).toHaveBeenCalledTimes(2);
});

test("handleSearchSuperbView失敗時のテスト", async () => {
  spyOnUseSuperbViewListContext.mockImplementation(() => mockContextValueFailure);
  const { result } = renderHook(() => useSearchSuperbView());
  await result.current.handleSearchSuperbView();
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
