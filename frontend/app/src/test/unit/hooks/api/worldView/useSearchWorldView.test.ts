import { renderHook } from "@testing-library/react";
import MockAdapter from "axios-mock-adapter";
import useSearchWorldView from "hooks/api/worldView/useSearchWorldView";
import client from "lib/api/client";

const mockUseToast = jest.fn();
jest.mock("@chakra-ui/react", () => ({
  ...jest.requireActual("@chakra-ui/react"),
  useToast: () => mockUseToast,
}));

const mockSetLoadingSearchWorldViews = jest.fn();
const mockSetWorldViews = jest.fn();

const spyOnUseWorldViewListContext = jest.spyOn(
  jest.requireActual("hooks/providers/WorldViewListProvider"),
  "useWorldViewListContext"
);

const mockContextValueSucsess = {
  setLoadingSearchWorldViews: mockSetLoadingSearchWorldViews,
  setWorldViews: mockSetWorldViews,
  checkedCategoryLabels: ["遺跡"],
  checkedCountryLabels: ["中国"],
  checkedCharacteristicLabels: ["歴史・文化的"],
  checkedRiskLevelLabels: ["1"],
  checkedMonthLabels: ["9月"],
  checkedBmiLabels: ["4.0"],
  keyword: ["の"],
};

const mockContextValueFailure = {
  setLoadingSearchWorldViews: mockSetLoadingSearchWorldViews,
  setWorldViews: mockSetWorldViews,
};

const mockAxios = new MockAdapter(client);
mockAxios.onGet("/world_views/search").reply((config) => {
  if (
    config.params.category_names.includes("遺跡") &&
    config.params.country_names.includes("中国") &&
    config.params.characteristic_names.includes("歴史・文化的") &&
    config.params.risk_levels.includes("1") &&
    config.params.months.includes("9月") &&
    config.params.bmi_ranges.includes("4.0") &&
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

test("handleSearchWorldView成功時のテスト", async () => {
  spyOnUseWorldViewListContext.mockImplementation(() => mockContextValueSucsess);
  const { result } = renderHook(() => useSearchWorldView());
  await result.current.handleSearchWorldView();
  expect(mockSetLoadingSearchWorldViews).toHaveBeenCalledWith(true);
  expect(mockSetWorldViews).toHaveBeenCalledWith([
    {
      id: 1,
      name: "万里の長城",
    },
  ]);
  expect(mockUseToast).not.toHaveBeenCalledWith();
  expect(mockUseToast).toHaveBeenCalledTimes(0);
  expect(mockSetLoadingSearchWorldViews).toHaveBeenCalledWith(false);
  expect(mockSetLoadingSearchWorldViews).toHaveBeenCalledTimes(2);
});

test("handleSearchWorldView失敗時のテスト", async () => {
  spyOnUseWorldViewListContext.mockImplementation(() => mockContextValueFailure);
  const { result } = renderHook(() => useSearchWorldView());
  await result.current.handleSearchWorldView();
  expect(mockSetLoadingSearchWorldViews).toHaveBeenCalledWith(true);
  expect(mockSetWorldViews).not.toHaveBeenCalledWith();
  expect(mockSetWorldViews).toHaveBeenCalledTimes(0);
  expect(mockUseToast).toHaveBeenCalledWith({
    title: "絶景一覧の取得に失敗しました。",
    status: "error",
    position: "top",
    duration: 5000,
    isClosable: true,
  });
  expect(mockUseToast).toHaveBeenCalledTimes(1);
  expect(mockSetLoadingSearchWorldViews).toHaveBeenCalledWith(false);
  expect(mockSetLoadingSearchWorldViews).toHaveBeenCalledTimes(2);
});
