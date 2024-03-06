import { ChangeEvent } from "react";
import { act } from "react-dom/test-utils";
import handleChangeCheckBox from "utils/handleChangeCheckBox";

describe("handleChangeCheckBox関数の挙動のテスト", () => {
  const mockCheckItemsDispatch = jest.fn();

  describe("e.target.valueとcheckItemsのlabelプロパティの値が同じである場合", () => {
    test("checkItemsのcheckedがfalseの場合、trueに更新されること", () => {
      const mockEvent = {
        target: { value: "name" },
      } as ChangeEvent<HTMLInputElement>;
      act(() => {
        handleChangeCheckBox({
          e: mockEvent,
          checkItems: [{ label: "name", checked: false }],
          checkItemsDispatch: mockCheckItemsDispatch,
        });
      });
      expect(mockCheckItemsDispatch).toHaveBeenCalledWith([{ label: "name", checked: true }]);
    });

    test("checkItemsのcheckedがtrueの場合、falseに更新されること", () => {
      const mockEvent = {
        target: { value: "name" },
      } as ChangeEvent<HTMLInputElement>;
      act(() => {
        handleChangeCheckBox({
          e: mockEvent,
          checkItems: [{ label: "name", checked: true }],
          checkItemsDispatch: mockCheckItemsDispatch,
        });
      });
      expect(mockCheckItemsDispatch).toHaveBeenCalledWith([{ label: "name", checked: false }]);
    });
  });

  describe("e.target.valueとcheckItemsのlabelプロパティの値が異なる場合", () => {
    test("checkItemsのcheckedが更新されないこと", () => {
      const mockEvent = {
        target: { value: "NAME" },
      } as ChangeEvent<HTMLInputElement>;
      act(() => {
        handleChangeCheckBox({
          e: mockEvent,
          checkItems: [{ label: "name", checked: false }],
          checkItemsDispatch: mockCheckItemsDispatch,
        });
      });
      expect(mockCheckItemsDispatch).toHaveBeenCalledWith([{ label: "name", checked: false }]);
    });
  });
});
