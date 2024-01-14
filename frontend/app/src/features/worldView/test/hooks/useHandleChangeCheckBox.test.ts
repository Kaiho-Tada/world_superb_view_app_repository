import { renderHook } from "@testing-library/react";
import useHandleChangeCheckBox from "features/worldView/hooks/useHandleChangeCheckBox";
import { ChangeEvent } from "react";
import { act } from "react-dom/test-utils";

describe("handleChangeCheckBox関数の挙動のテスト", () => {
  const mockCheckBoxItemsDispatch = jest.fn();
  const mockCheckedLabelsDispatch = jest.fn();
  const checkBoxItemsUnchecked = [{ label: "name", checked: false }];
  const checkBoxItemsChecked = [{ label: "name", checked: true }];

  describe("e.target.valueとcheckBoxItemsのlabelプロパティの値が同じである場合", () => {
    test("checkBoxItemsのcheckedがfalseの場合、trueに更新されること", () => {
      const { result } = renderHook(() => useHandleChangeCheckBox());
      const mockEvent = {
        target: { value: "name" },
      } as ChangeEvent<HTMLInputElement>;
      act(() => {
        result.current.handleChangeCheckBox({
          e: mockEvent,
          checkBoxItems: checkBoxItemsUnchecked,
          checkBoxItemsDispatch: mockCheckBoxItemsDispatch,
          checkedLabelsDispatch: mockCheckedLabelsDispatch,
        });
      });
      expect(mockCheckBoxItemsDispatch).toHaveBeenCalledWith([{ label: "name", checked: true }]);
      expect(mockCheckedLabelsDispatch).toHaveBeenCalledWith(["name"]);
    });

    test("checkBoxItemsのcheckedがtrueの場合、falseに更新されること", () => {
      const { result } = renderHook(() => useHandleChangeCheckBox());
      const mockEvent = {
        target: { value: "name" },
      } as ChangeEvent<HTMLInputElement>;
      act(() => {
        result.current.handleChangeCheckBox({
          e: mockEvent,
          checkBoxItems: checkBoxItemsChecked,
          checkBoxItemsDispatch: mockCheckBoxItemsDispatch,
          checkedLabelsDispatch: mockCheckedLabelsDispatch,
        });
      });
      expect(mockCheckBoxItemsDispatch).toHaveBeenCalledWith([{ label: "name", checked: false }]);
      expect(mockCheckedLabelsDispatch).toHaveBeenCalledWith([]);
    });
  });

  describe("e.target.valueとcheckBoxItemsのlabelプロパティの値が異なる場合", () => {
    test("checkBoxItemsのcheckedが更新されないこと", () => {
      const { result } = renderHook(() => useHandleChangeCheckBox());
      const mockEvent = {
        target: { value: "NAME" },
      } as ChangeEvent<HTMLInputElement>;
      act(() => {
        result.current.handleChangeCheckBox({
          e: mockEvent,
          checkBoxItems: checkBoxItemsUnchecked,
          checkBoxItemsDispatch: mockCheckBoxItemsDispatch,
          checkedLabelsDispatch: mockCheckedLabelsDispatch,
        });
      });
      expect(mockCheckBoxItemsDispatch).toHaveBeenCalledWith([{ label: "name", checked: false }]);
      expect(mockCheckedLabelsDispatch).toHaveBeenCalledWith([]);
    });
  });
});
