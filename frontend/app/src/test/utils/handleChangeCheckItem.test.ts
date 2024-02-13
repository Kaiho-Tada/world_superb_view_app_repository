import { MouseEvent } from "react";
import handleChangeCheckItem from "utils/handleChangeCheckItem";

describe("handleChangeCheckItem関数の挙動のテスト", () => {
  const mockCheckItemsDispatch = jest.fn();

  describe("e.target.valueとcheckItemsのlabelプロパティの値が同じである場合", () => {
    test("checkItemsのcheckedがfalseの場合、trueに更新されること", () => {
      const mockEvent: Partial<MouseEvent<HTMLDivElement>> = {
        target: Object.assign(document.createElement("div"), {
          innerText: "ラベルA",
        }),
      };
      handleChangeCheckItem({
        e: mockEvent as MouseEvent<HTMLDivElement>,
        checkItems: [{ label: "ラベルA", checked: false }],
        checkItemsDispatch: mockCheckItemsDispatch,
      });
      expect(mockCheckItemsDispatch).toHaveBeenCalledWith([{ label: "ラベルA", checked: true }]);
    });

    test("checkItemsのcheckedがtrueの場合、falseに更新されること", () => {
      const mockEvent: Partial<MouseEvent<HTMLDivElement>> = {
        target: Object.assign(document.createElement("div"), {
          innerText: "ラベルA",
        }),
      };
      handleChangeCheckItem({
        e: mockEvent as MouseEvent<HTMLDivElement>,
        checkItems: [{ label: "ラベルA", checked: true }],
        checkItemsDispatch: mockCheckItemsDispatch,
      });
      expect(mockCheckItemsDispatch).toHaveBeenCalledWith([{ label: "ラベルA", checked: false }]);
    });
  });

  describe("e.target.valueとcheckItemsのlabelプロパティの値が異なる場合", () => {
    test("checkItemsのcheckedが更新されないこと", () => {
      const mockEvent: Partial<MouseEvent<HTMLDivElement>> = {
        target: Object.assign(document.createElement("div"), {
          innerText: "ラベルB",
        }),
      };
      handleChangeCheckItem({
        e: mockEvent as MouseEvent<HTMLDivElement>,
        checkItems: [{ label: "ラベルA", checked: false }],
        checkItemsDispatch: mockCheckItemsDispatch,
      });
      expect(mockCheckItemsDispatch).toHaveBeenCalledWith([{ label: "ラベルA", checked: false }]);
    });
  });
});
