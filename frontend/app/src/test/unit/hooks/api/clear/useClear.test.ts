import { renderHook } from "@testing-library/react";
import useClear from "hooks/api/clear/useClear";

const mockSetCategoriesWithCheckBoxData = jest.fn();
const mockSetCountriesWithCheckBoxData = jest.fn();
const mockSetCharacteristicsWithCheckBoxData = jest.fn();
const mockSetRiskLevels = jest.fn();
const mockGetAllSuperbViews = jest.fn();
const mockSetCheckedCategoryLabels = jest.fn();
const mockSetCheckedCountryLabels = jest.fn();
const mockSetCheckedCharacteristicLabels = jest.fn();
const mockSetCheckedRiskLevelLabels = jest.fn();

jest.mock("hooks/providers/SuperbViewListProvider", () => ({
  ...jest.requireActual("hooks/providers/SuperbViewListProvider"),
  useSuperbViewListContext: () => ({
    categoriesWithCheckBoxData: [
      {
        label: "城",
        classification: "人工",
        superbViewNames: ["ノイシュバンシュタイン城", "万里の長城"],
        checked: true,
      },
    ],
    setCategoriesWithCheckBoxData: mockSetCategoriesWithCheckBoxData,
    countriesWithCheckBoxData: [
      {
        label: "ペルー",
        stateName: "中南米",
        superbViewNames: ["マチュピチュ", "ヴィニクンカ山"],
        checked: true,
      },
    ],
    setCountriesWithCheckBoxData: mockSetCountriesWithCheckBoxData,
    characteristicsWithCheckBoxData: [
      {
        label: "幻想・神秘的",
        superbViewNames: ["マチュピチュ", "モン・サン・ミシェル"],
        checked: true,
      },
    ],
    setCharacteristicsWithCheckBoxData: mockSetCharacteristicsWithCheckBoxData,
    riskLevels: [
      {
        label: "4",
        checked: true,
      },
    ],
    setRiskLevels: mockSetRiskLevels,
    getAllSuperbViews: mockGetAllSuperbViews,
    setCheckedCategoryLabels: mockSetCheckedCategoryLabels,
    setCheckedCountryLabels: mockSetCheckedCountryLabels,
    setCheckedCharacteristicLabels: mockSetCheckedCharacteristicLabels,
    setCheckedRiskLevelLabels: mockSetCheckedRiskLevelLabels,
  }),
}));

test("categoriesWithCheckBoxDataのcheckedがtrueの場合、falseに切り替わること", () => {
  const { result } = renderHook(() => useClear());
  result.current.handleClear();
  expect(mockSetCategoriesWithCheckBoxData).toHaveBeenCalledWith([
    {
      label: "城",
      classification: "人工",
      superbViewNames: ["ノイシュバンシュタイン城", "万里の長城"],
      checked: false,
    },
  ]);
});

test("countriesWithCheckBoxDataのcheckedがtrueの場合、falseに切り替わること", () => {
  const { result } = renderHook(() => useClear());
  result.current.handleClear();
  expect(mockSetCountriesWithCheckBoxData).toHaveBeenCalledWith([
    {
      label: "ペルー",
      stateName: "中南米",
      superbViewNames: ["マチュピチュ", "ヴィニクンカ山"],
      checked: false,
    },
  ]);
});

test("characteristicsWithCheckBoxDataのcheckedがtrueの場合、falseに切り替わること", () => {
  const { result } = renderHook(() => useClear());
  result.current.handleClear();
  expect(mockSetCharacteristicsWithCheckBoxData).toHaveBeenCalledWith([
    {
      label: "幻想・神秘的",
      superbViewNames: ["マチュピチュ", "モン・サン・ミシェル"],
      checked: false,
    },
  ]);
});

test("riskLevelsのcheckedがtrueの場合、falseに切り替わること", () => {
  const { result } = renderHook(() => useClear());
  result.current.handleClear();
  expect(mockSetRiskLevels).toHaveBeenCalledWith([
    {
      label: "4",
      checked: false,
    },
  ]);
});

test("各setCheckedLablesに空の配列が渡されること", () => {
  const { result } = renderHook(() => useClear());
  result.current.handleClear();
  expect(mockSetCheckedCategoryLabels).toHaveBeenCalledWith([]);
  expect(mockSetCheckedCountryLabels).toHaveBeenCalledWith([]);
  expect(mockSetCheckedCharacteristicLabels).toHaveBeenCalledWith([]);
  expect(mockSetCheckedRiskLevelLabels).toHaveBeenCalledWith([]);
});

test("getAllSuperbViewsが実行されること", () => {
  const { result } = renderHook(() => useClear());
  result.current.handleClear();
  expect(mockGetAllSuperbViews).toHaveBeenCalledTimes(1);
});
