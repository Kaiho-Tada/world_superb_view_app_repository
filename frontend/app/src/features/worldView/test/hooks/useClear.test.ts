import { renderHook } from "@testing-library/react";
import useClear from "features/worldView/hooks/useClear";
import { act } from "react-dom/test-utils";

const mockDispatch = jest.fn();
jest.mock("providers/WorldViewListProvider", () => ({
  ...jest.requireActual("providers/WorldViewListProvider"),
  useWorldViewListContext: () => ({
    dispatch: mockDispatch,
    state: {
      categoryCheckBoxItems: [{ label: "城", classification: "人工", checked: true }],
      countryCheckBoxItems: [{ label: "ペルー", stateName: "中南米", checked: true }],
      characteristicCheckItems: [{ label: "幻想・神秘的", checked: true }],
      riskLevelCheckBoxItems: [{ label: "4", checked: true }],
      monthCheckBoxItems: [{ label: "1月", season: "冬", checked: true }],
      bmiRange: [0, 10],
    },
  }),
}));

describe("handleClearCheckBox関数のテスト", () => {
  test("handleClearCheckBox関数が実行されること", () => {
    const spyOnHandleClearCheckBox = jest.spyOn(
      jest.requireActual("utils/handleClearCheckBox"),
      "default"
    );
    const { result } = renderHook(() => useClear());
    result.current.handleClear();
    expect(spyOnHandleClearCheckBox).toHaveBeenCalledWith({
      checkBoxItems: [{ label: "城", classification: "人工", checked: true }],
      checkBoxItemsDispatch: expect.any(Function),
    });
    expect(spyOnHandleClearCheckBox).toHaveBeenCalledWith({
      checkBoxItems: [{ label: "ペルー", stateName: "中南米", checked: true }],
      checkBoxItemsDispatch: expect.any(Function),
    });
    expect(spyOnHandleClearCheckBox).toHaveBeenCalledWith({
      checkBoxItems: [{ label: "幻想・神秘的", checked: true }],
      checkBoxItemsDispatch: expect.any(Function),
    });
    expect(spyOnHandleClearCheckBox).toHaveBeenCalledWith({
      checkBoxItems: [{ label: "4", checked: true }],
      checkBoxItemsDispatch: expect.any(Function),
    });
    expect(spyOnHandleClearCheckBox).toHaveBeenCalledWith({
      checkBoxItems: [{ label: "1月", season: "冬", checked: true }],
      checkBoxItemsDispatch: expect.any(Function),
    });
    // expect(spyOnHandleClearCheckBox).toHaveBeenCalledWith({
    //   checkBoxItems: [{ label: "0%〜10%", checked: true }],
    //   checkBoxItemsDispatch: expect.any(Function),
    // });

    spyOnHandleClearCheckBox.mockRestore();
  });

  test("handleClearCheckBox関数内でcheckBoxItemsをクリアするdispatchが実行されること", () => {
    const { result } = renderHook(() => useClear());
    result.current.handleClear();
    expect(mockDispatch).toHaveBeenCalledWith({
      type: "SET_CATEGORY_CHECKBOX_ITEMS",
      payload: [{ label: "城", classification: "人工", checked: false }],
    });
    expect(mockDispatch).toHaveBeenCalledWith({
      type: "SET_COUNTRY_CHECKBOX_ITEMS",
      payload: [{ label: "ペルー", stateName: "中南米", checked: false }],
    });
    expect(mockDispatch).toHaveBeenCalledWith({
      type: "SET_CHARACTERISTIC_CHECK_ITEMS",
      payload: [{ label: "幻想・神秘的", checked: false }],
    });
    expect(mockDispatch).toHaveBeenCalledWith({
      type: "SET_RISK_LEVEL_CHECKBOX_ITEMS",
      payload: [{ label: "4", checked: false }],
    });
    expect(mockDispatch).toHaveBeenCalledWith({
      type: "SET_MONTH_CHECKBOX_ITEMS",
      payload: [{ label: "1月", season: "冬", checked: false }],
    });
    // expect(mockDispatch).toHaveBeenCalledWith({
    //   type: "SET_BMI_CHECKBOX_ITEMS",
    //   payload: [{ label: "0%〜10%", checked: false }],
    // });
  });
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
