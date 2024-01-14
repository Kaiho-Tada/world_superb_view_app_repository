import { renderHook } from "@testing-library/react";
import useSeasonHandleChange from "features/worldView/hooks/filter/useSeasonHandleChange";
import { ChangeEvent } from "react";
import { act } from "react-dom/test-utils";

const spyOnUseWorldViewListContext = jest.spyOn(
  jest.requireActual("providers/WorldViewListProvider"),
  "useWorldViewListContext"
);

const mockDispatch = jest.fn();
const mockContextValueCheckedFalse = {
  dispatch: mockDispatch,
  state: {
    monthCheckBoxItems: [{ label: "1月", season: "冬", checked: false }],
  },
};

const mockContextValueCheckedTrue = {
  dispatch: mockDispatch,
  state: {
    monthCheckBoxItems: [{ label: "1月", season: "冬", checked: true }],
  },
};

describe("handleChangeSeason関数の挙動のテスト", () => {
  describe("e.target.valueの値とmonthCheckBoxItemsのseasonプロパティの値が同じである場合", () => {
    test("e.target.checkedがtrueの場合、monthCheckBoxItemsのcheckedがtrueに更新されること", () => {
      spyOnUseWorldViewListContext.mockImplementation(() => mockContextValueCheckedFalse);
      const { result } = renderHook(() => useSeasonHandleChange());
      const mockEvent = { target: { value: "冬", checked: true } };
      act(() => {
        result.current.handleChangeSeason(mockEvent as ChangeEvent<HTMLInputElement>);
      });
      expect(mockDispatch).toHaveBeenCalledWith({
        type: "SET_MONTH_CHECKBOX_ITEMS",
        payload: [{ label: "1月", season: "冬", checked: true }],
      });
      expect(mockDispatch).toHaveBeenCalledWith({
        type: "SET_CHECKED_MONTH_LABELS",
        payload: ["1月"],
      });
    });

    test("e.target.checkedがfalseの場合、monthCheckBoxItemsのcheckedがfalseに更新されること", () => {
      spyOnUseWorldViewListContext.mockImplementation(() => mockContextValueCheckedTrue);
      const { result } = renderHook(() => useSeasonHandleChange());
      const mockEvent = { target: { value: "冬", checked: false } };
      act(() => {
        result.current.handleChangeSeason(mockEvent as ChangeEvent<HTMLInputElement>);
      });
      expect(mockDispatch).toHaveBeenCalledWith({
        type: "SET_MONTH_CHECKBOX_ITEMS",
        payload: [{ label: "1月", season: "冬", checked: false }],
      });
      expect(mockDispatch).toHaveBeenCalledWith({
        type: "SET_CHECKED_MONTH_LABELS",
        payload: [],
      });
    });
  });

  describe("e.target.valueの値とmonthCheckBoxItemsのseasonの値が異なる場合", () => {
    test("monthCheckBoxItemsのcheckedが更新されないこと", () => {
      spyOnUseWorldViewListContext.mockImplementation(() => mockContextValueCheckedFalse);
      const { result } = renderHook(() => useSeasonHandleChange());
      const mockEvent = { target: { value: "夏", checked: true } };
      act(() => {
        result.current.handleChangeSeason(mockEvent as ChangeEvent<HTMLInputElement>);
      });
      expect(mockDispatch).toHaveBeenCalledWith({
        type: "SET_MONTH_CHECKBOX_ITEMS",
        payload: [{ label: "1月", season: "冬", checked: false }],
      });
      expect(mockDispatch).toHaveBeenCalledWith({
        type: "SET_CHECKED_MONTH_LABELS",
        payload: [],
      });
    });
  });
});
