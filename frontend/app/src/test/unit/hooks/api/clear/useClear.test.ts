import { renderHook } from "@testing-library/react";
import useClear from "hooks/api/clear/useClear";

const mockDispatch = jest.fn();
jest.mock("hooks/providers/WorldViewListProvider", () => ({
  ...jest.requireActual("hooks/providers/WorldViewListProvider"),
  useWorldViewListContext: () => ({
    dispatch: mockDispatch,
    state: {
      categoryCheckBoxItems: [
        {
          label: "城",
          classification: "人工",
          checked: true,
        },
      ],
      countryCheckBoxItems: [
        {
          label: "ペルー",
          stateName: "中南米",
          checked: true,
        },
      ],
      characteristicCheckBoxItems: [
        {
          label: "幻想・神秘的",
          checked: true,
        },
      ],
      riskLevelCheckBoxItems: [
        {
          label: "4",
          checked: true,
        },
      ],
      monthCheckBoxItems: [{ label: "1月", season: "冬", checked: true }],
      bmiCheckBoxItems: [{ label: "0%〜10%", checked: true }],
    },
  }),
}));

test("categoriesWithCheckBoxDataのcheckedがtrueの場合、falseに切り替わること", () => {
  const { result } = renderHook(() => useClear());
  result.current.handleClear();
  expect(mockDispatch).toHaveBeenCalledWith({
    type: "SET_CATEGORY_CHECKBOX_ITEMS",
    payload: [
      {
        label: "城",
        classification: "人工",
        checked: false,
      },
    ],
  });
});

test("countriesWithCheckBoxDataのcheckedがtrueの場合、falseに切り替わること", () => {
  const { result } = renderHook(() => useClear());
  result.current.handleClear();
  expect(mockDispatch).toHaveBeenCalledWith({
    type: "SET_COUNTRY_CHECKBOX_ITEMS",
    payload: [
      {
        label: "ペルー",
        stateName: "中南米",
        checked: false,
      },
    ],
  });
});

test("characteristicsWithCheckBoxDataのcheckedがtrueの場合、falseに切り替わること", () => {
  const { result } = renderHook(() => useClear());
  result.current.handleClear();
  expect(mockDispatch).toHaveBeenCalledWith({
    type: "SET_CHARACTERISTIC_CHECKBOX_ITEMS",
    payload: [
      {
        label: "幻想・神秘的",
        checked: false,
      },
    ],
  });
});

test("riskLevelsのcheckedがtrueの場合、falseに切り替わること", () => {
  const { result } = renderHook(() => useClear());
  result.current.handleClear();
  expect(mockDispatch).toHaveBeenCalledWith({
    type: "SET_RISK_LEVEL_CHECKBOX_ITEMS",
    payload: [
      {
        label: "4",
        checked: false,
      },
    ],
  });
});

test("monthCheckBoxItemsのcheckedがtrueの場合、falseに切り替わること", () => {
  const { result } = renderHook(() => useClear());
  result.current.handleClear();
  expect(mockDispatch).toHaveBeenCalledWith({
    type: "SET_MONTH_CHECKBOX_ITEMS",
    payload: [{ label: "1月", season: "冬", checked: false }],
  });
});

test("bmiCheckBoxItemsのcheckedがtrueの場合、falseに切り替わること", () => {
  const { result } = renderHook(() => useClear());
  result.current.handleClear();
  expect(mockDispatch).toHaveBeenCalledWith({
    type: "SET_BMI_CHECKBOX_ITEMS",
    payload: [{ label: "0%〜10%", checked: false }],
  });
});

test("各setCheckedLablesに空の配列が渡されること", () => {
  const { result } = renderHook(() => useClear());
  result.current.handleClear();
  expect(mockDispatch).toHaveBeenCalledWith({
    type: "SET_CHECKED_CATEGORY_LABELS",
    payload: [],
  });
  expect(mockDispatch).toHaveBeenCalledWith({
    type: "SET_CHECKED_COUNTRY_LABELS",
    payload: [],
  });
  expect(mockDispatch).toHaveBeenCalledWith({
    type: "SET_CHECKED_CHARACTERISTIC_LABELS",
    payload: [],
  });
  expect(mockDispatch).toHaveBeenCalledWith({
    type: "SET_CHECKED_RISK_LEVEL_LABELS",
    payload: [],
  });
  expect(mockDispatch).toHaveBeenCalledWith({
    type: "SET_CHECKED_MONTH_LABELS",
    payload: [],
  });
  expect(mockDispatch).toHaveBeenCalledWith({
    type: "SET_CHECKED_BMI_LABELS",
    payload: [],
  });
});

test("keywordが空文字に更新されること", () => {
  const { result } = renderHook(() => useClear());
  result.current.handleClear();
  expect(mockDispatch).toHaveBeenCalledWith({
    type: "SET_KEYWORD",
    payload: "",
  });
});
