import { ChangeEvent } from "react";
import { act } from "react-dom/test-utils";
import handleChangeCheckBox from "utils/handleChangeCheckBox";

describe("handleChangeCheckBox関数の挙動のテスト", () => {
  const mockCheckBoxItemsDispatch = jest.fn();

  describe("e.target.valueとcheckBoxItemsのlabelプロパティの値が同じである場合", () => {
    test("checkBoxItemsのcheckedがfalseの場合、trueに更新されること", () => {
      const mockEvent = {
        target: { value: "name" },
      } as ChangeEvent<HTMLInputElement>;
      act(() => {
        handleChangeCheckBox({
          e: mockEvent,
          checkBoxItems: [{ label: "name", checked: false }],
          checkBoxItemsDispatch: mockCheckBoxItemsDispatch,
        });
      });
      expect(mockCheckBoxItemsDispatch).toHaveBeenCalledWith([{ label: "name", checked: true }]);
    });

    test("checkBoxItemsのcheckedがtrueの場合、falseに更新されること", () => {
      const mockEvent = {
        target: { value: "name" },
      } as ChangeEvent<HTMLInputElement>;
      act(() => {
        handleChangeCheckBox({
          e: mockEvent,
          checkBoxItems: [{ label: "name", checked: true }],
          checkBoxItemsDispatch: mockCheckBoxItemsDispatch,
        });
      });
      expect(mockCheckBoxItemsDispatch).toHaveBeenCalledWith([{ label: "name", checked: false }]);
    });
  });

  describe("e.target.valueとcheckBoxItemsのlabelプロパティの値が異なる場合", () => {
    test("checkBoxItemsのcheckedが更新されないこと", () => {
      const mockEvent = {
        target: { value: "NAME" },
      } as ChangeEvent<HTMLInputElement>;
      act(() => {
        handleChangeCheckBox({
          e: mockEvent,
          checkBoxItems: [{ label: "name", checked: false }],
          checkBoxItemsDispatch: mockCheckBoxItemsDispatch,
        });
      });
      expect(mockCheckBoxItemsDispatch).toHaveBeenCalledWith([{ label: "name", checked: false }]);
    });
  });
});
