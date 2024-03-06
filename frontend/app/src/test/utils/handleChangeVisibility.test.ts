import { ChangeEvent } from "react";
import { act } from "react-dom/test-utils";
import handleChangeVisibility from "utils/handleChangeVisibility";

const mockCheckItemsDispatch = jest.fn();

describe("e.target.valueの値とcheckItemsのparentLabelプロパティの値が同じである場合", () => {
  test("e.target.checkedがtrueの場合、全てのcheckItemsのisVisibleがtrueに更新されること", () => {
    const e = { target: { value: "親ラベルA", checked: true } };
    const checkItems = [
      { label: "ラベル1", checked: false, isVisible: false, parentLabel: "親ラベルA" },
      { label: "ラベル2", checked: false, isVisible: false, parentLabel: "親ラベルA" },
    ];
    act(() => {
      handleChangeVisibility({
        e: e as ChangeEvent<HTMLInputElement>,
        checkItems,
        checkItemsDispatch: mockCheckItemsDispatch,
      });
    });
    expect(mockCheckItemsDispatch).toHaveBeenCalledWith([
      { label: "ラベル1", checked: false, isVisible: true, parentLabel: "親ラベルA" },
      { label: "ラベル2", checked: false, isVisible: true, parentLabel: "親ラベルA" },
    ]);
  });

  test("e.target.checkedがfalseの場合、全てのcheckItemsのisVisibleがfalseに更新されること", () => {
    const e = { target: { value: "親ラベルA", checked: false } };
    const checkItems = [
      { label: "ラベル1", checked: false, isVisible: true, parentLabel: "親ラベルA" },
      { label: "ラベル2", checked: false, isVisible: true, parentLabel: "親ラベルA" },
    ];
    act(() => {
      handleChangeVisibility({
        e: e as ChangeEvent<HTMLInputElement>,
        checkItems,
        checkItemsDispatch: mockCheckItemsDispatch,
      });
    });
    expect(mockCheckItemsDispatch).toHaveBeenCalledWith([
      { label: "ラベル1", checked: false, isVisible: false, parentLabel: "親ラベルA" },
      { label: "ラベル2", checked: false, isVisible: false, parentLabel: "親ラベルA" },
    ]);
  });
});

describe("e.target.valueの値とcheckItemsのparentLabelの値が異なる場合", () => {
  test("checkItemsのcheckedが更新されないこと", () => {
    const mockEvent = { target: { value: "親ラベルB", checked: true } };
    const checkItems = [
      { label: "ラベル1", parentLabel: "親ラベルA", checked: false, isVisible: false },
      { label: "ラベル2", parentLabel: "親ラベルA", checked: false, isVisible: false },
    ];
    act(() => {
      handleChangeVisibility({
        e: mockEvent as ChangeEvent<HTMLInputElement>,
        checkItems,
        checkItemsDispatch: mockCheckItemsDispatch,
      });
    });
    expect(mockCheckItemsDispatch).toHaveBeenCalledWith([
      { label: "ラベル1", parentLabel: "親ラベルA", checked: false, isVisible: false },
      { label: "ラベル2", parentLabel: "親ラベルA", checked: false, isVisible: false },
    ]);
  });
});
