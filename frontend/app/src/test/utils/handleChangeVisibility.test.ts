import { ChangeEvent } from "react";
import { act } from "react-dom/test-utils";
import handleChangeVisibility from "utils/handleChangeVisibility";

const mockCheckBoxItemsDispatch = jest.fn();

describe("e.target.valueの値とcheckBoxItemsのparentLabelプロパティの値が同じである場合", () => {
  test("e.target.checkedがtrueの場合、全てのcheckBoxItemsのisVisibleがtrueに更新されること", () => {
    const e = { target: { value: "親ラベルA", checked: true } };
    const checkBoxItems = [
      { label: "ラベル1", checked: false, isVisible: false, parentLabel: "親ラベルA" },
      { label: "ラベル2", checked: false, isVisible: false, parentLabel: "親ラベルA" },
    ];
    act(() => {
      handleChangeVisibility({
        e: e as ChangeEvent<HTMLInputElement>,
        checkBoxItems,
        checkBoxItemsDispatch: mockCheckBoxItemsDispatch,
      });
    });
    expect(mockCheckBoxItemsDispatch).toHaveBeenCalledWith([
      { label: "ラベル1", checked: false, isVisible: true, parentLabel: "親ラベルA" },
      { label: "ラベル2", checked: false, isVisible: true, parentLabel: "親ラベルA" },
    ]);
  });

  test("e.target.checkedがfalseの場合、全てのcheckBoxItemsのisVisibleがfalseに更新されること", () => {
    const e = { target: { value: "親ラベルA", checked: false } };
    const checkBoxItems = [
      { label: "ラベル1", checked: false, isVisible: true, parentLabel: "親ラベルA" },
      { label: "ラベル2", checked: false, isVisible: true, parentLabel: "親ラベルA" },
    ];
    act(() => {
      handleChangeVisibility({
        e: e as ChangeEvent<HTMLInputElement>,
        checkBoxItems,
        checkBoxItemsDispatch: mockCheckBoxItemsDispatch,
      });
    });
    expect(mockCheckBoxItemsDispatch).toHaveBeenCalledWith([
      { label: "ラベル1", checked: false, isVisible: false, parentLabel: "親ラベルA" },
      { label: "ラベル2", checked: false, isVisible: false, parentLabel: "親ラベルA" },
    ]);
  });
});

describe("e.target.valueの値とcheckBoxItemsのparentLabelの値が異なる場合", () => {
  test("checkBoxItemsのcheckedが更新されないこと", () => {
    const mockEvent = { target: { value: "親ラベルB", checked: true } };
    const checkBoxItems = [
      { label: "ラベル1", parentLabel: "親ラベルA", checked: false, isVisible: false },
      { label: "ラベル2", parentLabel: "親ラベルA", checked: false, isVisible: false },
    ];
    act(() => {
      handleChangeVisibility({
        e: mockEvent as ChangeEvent<HTMLInputElement>,
        checkBoxItems,
        checkBoxItemsDispatch: mockCheckBoxItemsDispatch,
      });
    });
    expect(mockCheckBoxItemsDispatch).toHaveBeenCalledWith([
      { label: "ラベル1", parentLabel: "親ラベルA", checked: false, isVisible: false },
      { label: "ラベル2", parentLabel: "親ラベルA", checked: false, isVisible: false },
    ]);
  });
});
