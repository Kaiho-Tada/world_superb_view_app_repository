import { renderHook } from "@testing-library/react";
import useSeasonHandleChange from "hooks/season/useSeasonHandleChange";
import { ChangeEvent } from "react";
import { act } from "react-dom/test-utils";

const spyOnUseWorldViewListContext = jest.spyOn(
  jest.requireActual("hooks/providers/WorldViewListProvider"),
  "useWorldViewListContext"
);

const mockSetMonthCheckBoxItems = jest.fn();
const mockSetCheckedMonthLabels = jest.fn();

const mockContextValueCheckedFalse = {
  setMonthCheckBoxItems: mockSetMonthCheckBoxItems,
  setCheckedMonthLabels: mockSetCheckedMonthLabels,
  monthCheckBoxItems: [{ label: "1月", season: "冬", checked: false }],
};

const mockContextValueCheckedTrue = {
  setMonthCheckBoxItems: mockSetMonthCheckBoxItems,
  setCheckedMonthLabels: mockSetCheckedMonthLabels,
  monthCheckBoxItems: [{ label: "1月", season: "冬", checked: true }],
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

      expect(mockSetMonthCheckBoxItems).toHaveBeenCalledWith([
        { label: "1月", season: "冬", checked: true },
      ]);
      expect(mockSetMonthCheckBoxItems).toHaveBeenCalledTimes(1);

      expect(mockSetCheckedMonthLabels).toHaveBeenCalledWith(["1月"]);
      expect(mockSetCheckedMonthLabels).toHaveBeenCalledTimes(1);
    });

    test("e.target.checkedがfalseの場合、monthCheckBoxItemsのcheckedがfalseに更新されること", () => {
      spyOnUseWorldViewListContext.mockImplementation(() => mockContextValueCheckedTrue);
      const { result } = renderHook(() => useSeasonHandleChange());
      const mockEvent = { target: { value: "冬", checked: false } };
      act(() => {
        result.current.handleChangeSeason(mockEvent as ChangeEvent<HTMLInputElement>);
      });

      expect(mockSetMonthCheckBoxItems).toHaveBeenCalledWith([
        { label: "1月", season: "冬", checked: false },
      ]);
      expect(mockSetMonthCheckBoxItems).toHaveBeenCalledTimes(1);

      expect(mockSetCheckedMonthLabels).toHaveBeenCalledWith([]);
      expect(mockSetCheckedMonthLabels).toHaveBeenCalledTimes(1);
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

      expect(mockSetMonthCheckBoxItems).toHaveBeenCalledWith([
        { label: "1月", season: "冬", checked: false },
      ]);
      expect(mockSetMonthCheckBoxItems).toHaveBeenCalledTimes(1);

      expect(mockSetCheckedMonthLabels).toHaveBeenCalledWith([]);
      expect(mockSetCheckedMonthLabels).toHaveBeenCalledTimes(1);
    });
  });
});

describe("handleChangeMonth関数の挙動のテスト", () => {
  describe("e.target.valueとmonthCheckBoxItemsのlabelプロパティの値が同じである場合", () => {
    test("monthCheckBoxItemsのcheckedがfalseの場合、trueに更新されること", () => {
      spyOnUseWorldViewListContext.mockImplementation(() => mockContextValueCheckedFalse);
      const { result } = renderHook(() => useSeasonHandleChange());
      const mockEvent = { target: { value: "1月" } };
      act(() => {
        result.current.handleChangeMonth(mockEvent as ChangeEvent<HTMLInputElement>);
      });

      expect(mockSetMonthCheckBoxItems).toHaveBeenCalledWith([
        { label: "1月", season: "冬", checked: true },
      ]);
      expect(mockSetMonthCheckBoxItems).toHaveBeenCalledTimes(1);

      expect(mockSetCheckedMonthLabels).toHaveBeenCalledWith(["1月"]);
      expect(mockSetCheckedMonthLabels).toHaveBeenCalledTimes(1);
    });

    test("monthCheckBoxItemscheckedがtrueの場合、falseに更新されること", () => {
      spyOnUseWorldViewListContext.mockImplementation(() => mockContextValueCheckedTrue);
      const { result } = renderHook(() => useSeasonHandleChange());
      const mockEvent = { target: { value: "1月" } };
      act(() => {
        result.current.handleChangeMonth(mockEvent as ChangeEvent<HTMLInputElement>);
      });

      expect(mockSetMonthCheckBoxItems).toHaveBeenCalledWith([
        { label: "1月", season: "冬", checked: false },
      ]);
      expect(mockSetMonthCheckBoxItems).toHaveBeenCalledTimes(1);

      expect(mockSetCheckedMonthLabels).toHaveBeenCalledWith([]);
      expect(mockSetCheckedMonthLabels).toHaveBeenCalledTimes(1);
    });
  });

  describe("e.target.valueとmonthCheckBoxItemsのlabelプロパティの値が異なる場合", () => {
    test("monthCheckBoxItemsのcheckedが更新されないこと", () => {
      spyOnUseWorldViewListContext.mockImplementation(() => mockContextValueCheckedFalse);
      const { result } = renderHook(() => useSeasonHandleChange());
      const mockEvent = { target: { value: "2月" } };
      act(() => {
        result.current.handleChangeMonth(mockEvent as ChangeEvent<HTMLInputElement>);
      });

      expect(mockSetMonthCheckBoxItems).toHaveBeenCalledWith([
        { label: "1月", season: "冬", checked: false },
      ]);
      expect(mockSetMonthCheckBoxItems).toHaveBeenCalledTimes(1);

      expect(mockSetCheckedMonthLabels).toHaveBeenCalledWith([]);
      expect(mockSetCheckedMonthLabels).toHaveBeenCalledTimes(1);
    });
  });
});
