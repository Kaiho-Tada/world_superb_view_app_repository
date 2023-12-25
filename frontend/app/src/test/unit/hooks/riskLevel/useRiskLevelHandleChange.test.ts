import { renderHook } from "@testing-library/react";
import useRiskLevelHandleChange from "hooks/riskLevel/useRiskLevelHandleChange";
import { ChangeEvent } from "react";
import { act } from "react-dom/test-utils";

const spyOnUseWorldViewListContext = jest.spyOn(
  jest.requireActual("hooks/providers/WorldViewListProvider"),
  "useWorldViewListContext"
);

const mockDispatch = jest.fn();
const mockContextValueCheckedFalse = {
  dispatch: mockDispatch,
  state: {
    riskLevelCheckBoxItems: [
      {
        label: "4",
        checked: false,
      },
    ],
  },
};

const mockContextValueCheckedTrue = {
  dispatch: mockDispatch,
  state: {
    riskLevelCheckBoxItems: [
      {
        label: "4",
        checked: true,
      },
    ],
  },
};

describe("handleChangeRiskLevel関数の挙動のテスト", () => {
  test("categoriesWithCheckBoxDataのcheckedがfalseの場合、trueに更新されること", () => {
    spyOnUseWorldViewListContext.mockImplementation(() => mockContextValueCheckedFalse);
    const { result } = renderHook(() => useRiskLevelHandleChange());
    const mockEvent = { target: { value: "4" } };
    act(() => {
      result.current.handleChangeRiskLevel(mockEvent as ChangeEvent<HTMLInputElement>);
    });
    expect(mockDispatch).toHaveBeenCalledWith({
      type: "SET_RISK_LEVEL_CHECKBOX_ITEMS",
      payload: [
        {
          label: "4",
          checked: true,
        },
      ],
    });
    expect(mockDispatch).toHaveBeenCalledWith({
      type: "SET_CHECKED_RISK_LEVEL_LABELS",
      payload: ["4"],
    });
  });

  test("categoriesWithCheckBoxDataのcheckedがtrueの場合、falseに更新されること", () => {
    spyOnUseWorldViewListContext.mockImplementation(() => mockContextValueCheckedTrue);
    const { result } = renderHook(() => useRiskLevelHandleChange());
    const mockEvent = { target: { value: "4" } };
    act(() => {
      result.current.handleChangeRiskLevel(mockEvent as ChangeEvent<HTMLInputElement>);
    });
    expect(mockDispatch).toHaveBeenCalledWith({
      type: "SET_RISK_LEVEL_CHECKBOX_ITEMS",
      payload: [
        {
          label: "4",
          checked: false,
        },
      ],
    });
    expect(mockDispatch).toHaveBeenCalledWith({
      type: "SET_CHECKED_RISK_LEVEL_LABELS",
      payload: [],
    });
  });
});
