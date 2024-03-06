import { renderHook } from "@testing-library/react";
import useClear from "features/worldView/hooks/useClear";
import { act } from "react-dom/test-utils";

const mockDispatch = jest.fn();
jest.mock("providers/WorldViewListProvider", () => ({
  ...jest.requireActual("providers/WorldViewListProvider"),
  useWorldViewListContext: () => ({
    dispatch: mockDispatch,
    state: {
      categoryCheckItems: [{ label: "城", classification: "人工", checked: true }],
      countryCheckItems: [{ label: "ペルー", stateName: "中南米", checked: true }],
      characteristicCheckItems: [{ label: "幻想・神秘的", checked: true }],
      riskLevel: "4",
      monthRange: [6, 9],
      bmiRange: [0, 10],
    },
  }),
}));

describe("handleClearCheckItem関数のテスト", () => {
  test("handleClearCheckItem関数が実行されること", () => {
    const spyOnHandleClearCheckItem = jest.spyOn(
      jest.requireActual("utils/handleClearCheckItem"),
      "default"
    );
    const { result } = renderHook(() => useClear());
    result.current.handleClear();
    expect(spyOnHandleClearCheckItem).toHaveBeenCalledWith({
      checkItems: [{ label: "城", classification: "人工", checked: true }],
      checkItemsDispatch: expect.any(Function),
    });
    expect(spyOnHandleClearCheckItem).toHaveBeenCalledWith({
      checkItems: [{ label: "ペルー", stateName: "中南米", checked: true }],
      checkItemsDispatch: expect.any(Function),
    });
    expect(spyOnHandleClearCheckItem).toHaveBeenCalledWith({
      checkItems: [{ label: "幻想・神秘的", checked: true }],
      checkItemsDispatch: expect.any(Function),
    });
    spyOnHandleClearCheckItem.mockRestore();
  });

  test("handleClearCheckItem関数内でcheckItemsをクリアするdispatchが実行されること", () => {
    const { result } = renderHook(() => useClear());
    result.current.handleClear();
    expect(mockDispatch).toHaveBeenCalledWith({
      type: "SET_CATEGORY_CHECK_ITEMS",
      payload: [{ label: "城", classification: "人工", checked: false }],
    });
    expect(mockDispatch).toHaveBeenCalledWith({
      type: "SET_COUNTRY_CHECK_ITEMS",
      payload: [{ label: "ペルー", stateName: "中南米", checked: false }],
    });
    expect(mockDispatch).toHaveBeenCalledWith({
      type: "SET_CHARACTERISTIC_CHECK_ITEMS",
      payload: [{ label: "幻想・神秘的", checked: false }],
    });
  });
});

test("riskLevelがundefinedに更新されること", () => {
  const { result } = renderHook(() => useClear());
  act(() => {
    result.current.handleClear();
  });
  expect(mockDispatch).toHaveBeenCalledWith({ type: "SET_RISK_LEVEL", payload: undefined });
});

test("monthRangeの範囲が[1, 12]に更新されること", () => {
  const { result } = renderHook(() => useClear());
  act(() => {
    result.current.handleClear();
  });
  expect(mockDispatch).toHaveBeenCalledWith({ type: "SET_MONTH_RANGE", payload: [1, 12] });
});

test("bmiRangeの範囲が[-40, 30]に更新されること", () => {
  const { result } = renderHook(() => useClear());
  act(() => {
    result.current.handleClear();
  });
  expect(mockDispatch).toHaveBeenCalledWith({ type: "SET_BMI_RANGE", payload: [-40, 30] });
});

test("isDisabledがtrueに更新されること", () => {
  const { result } = renderHook(() => useClear());
  act(() => {
    result.current.handleClear();
  });
  expect(mockDispatch).toHaveBeenCalledWith({
    type: "SET_IS_DISABLED_SEARCH_BUTTON",
    payload: true,
  });
});

test("keywordをクリアするdispatchが実行されること", () => {
  const { result } = renderHook(() => useClear());
  result.current.handleClear();
  expect(mockDispatch).toHaveBeenCalledWith({ type: "SET_KEYWORD", payload: "" });
});
