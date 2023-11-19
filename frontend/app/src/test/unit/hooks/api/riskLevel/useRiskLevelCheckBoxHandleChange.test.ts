import { renderHook } from "@testing-library/react";
import MockAdapter from "axios-mock-adapter";
import useRiskLevelCheckBoxHandleChange from "hooks/api/riskLevel/useRiskLevelCheckBoxHandleChange";
import client from "lib/api/client";
import { ChangeEvent } from "react";
import { act } from "react-dom/test-utils";

const mockUseToast = jest.fn();
jest.mock("@chakra-ui/react", () => ({
  ...jest.requireActual("@chakra-ui/react"),
  useToast: () => mockUseToast,
}));

const mockSetLoadingSearchSuperbViews = jest.fn();
const mockSetRiskLevels = jest.fn();
const mockSetCheckedRiskLevelLabels = jest.fn();
const mockSetSuperbViews = jest.fn();

jest.mock("hooks/providers/SuperbViewListProvider", () => ({
  ...jest.requireActual("hooks/providers/SuperbViewListProvider"),
  useSuperbViewListContext: () => ({
    setLoadingSearchSuperbViews: mockSetLoadingSearchSuperbViews,
    setRiskLevels: mockSetRiskLevels,
    setCheckedRiskLevelLabels: mockSetCheckedRiskLevelLabels,
    setSuperbViews: mockSetSuperbViews,
    riskLevels: [
      {
        label: "4",
        checked: false,
      },
    ],
  }),
}));

const mockAxios = new MockAdapter(client);
mockAxios.onGet("/superb_views/search").reply((config) => {
  if (config.params.risk_levels.includes("4")) {
    return [
      200,
      [
        {
          id: 1,
          name: "スワローズネスト",
          imageUrl: "imageUrl",
          bestSeason: "bestSeason",
        },
        {
          id: 2,
          name: "ラリベラ石窟教会群",
          imageUrl: "imageUrl",
          bestSeason: "bestSeason",
        },
      ],
    ];
  }
  return [500];
});

test("handleChange成功時のテスト", async () => {
  const { result } = renderHook(() => useRiskLevelCheckBoxHandleChange());
  const mockEvent = { target: { value: "4" } };
  await act(() => {
    result.current.handleChange(mockEvent as ChangeEvent<HTMLInputElement>);
  });

  expect(mockSetRiskLevels).toHaveBeenCalledWith([
    {
      label: "4",
      checked: true,
    },
  ]);
  expect(mockSetRiskLevels).toHaveBeenCalledTimes(1);

  expect(mockSetCheckedRiskLevelLabels).toHaveBeenCalledWith(["4"]);
  expect(mockSetCheckedRiskLevelLabels).toHaveBeenCalledTimes(1);

  expect(mockSetLoadingSearchSuperbViews).toHaveBeenCalledWith(true);

  expect(mockSetSuperbViews).toHaveBeenCalledWith([
    {
      id: 1,
      name: "スワローズネスト",
      imageUrl: "imageUrl",
      bestSeason: "bestSeason",
    },
    {
      id: 2,
      name: "ラリベラ石窟教会群",
      imageUrl: "imageUrl",
      bestSeason: "bestSeason",
    },
  ]);
  expect(mockSetSuperbViews).toHaveBeenCalledTimes(1);

  expect(mockSetLoadingSearchSuperbViews).toHaveBeenCalledWith(false);
  expect(mockSetLoadingSearchSuperbViews).toHaveBeenCalledTimes(2);
});

test("handleChange失敗時のテスト", async () => {
  const { result } = renderHook(() => useRiskLevelCheckBoxHandleChange());
  const mockEvent = { target: { value: "3" } };
  await act(() => {
    result.current.handleChange(mockEvent as ChangeEvent<HTMLInputElement>);
  });

  expect(mockSetRiskLevels).toHaveBeenCalledWith([
    {
      label: "4",
      checked: false,
    },
  ]);
  expect(mockSetRiskLevels).toHaveBeenCalledTimes(1);

  expect(mockSetCheckedRiskLevelLabels).toHaveBeenCalledWith([]);
  expect(mockSetCheckedRiskLevelLabels).toHaveBeenCalledTimes(1);

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
