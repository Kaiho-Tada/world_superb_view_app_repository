import { ChangeEvent } from "react";
import { act } from "react-dom/test-utils";
import handleChangeParentCheckBox from "utils/handleChangeParentCheckBox";

const checkItemsDispatch = jest.fn();

describe("handleChangeParentCheck関数の挙動のテスト", () => {
  describe("e.target.valueの値とcheckItemsのparentNameプロパティの値が同じである場合", () => {
    test("e.target.checkedがtrueの場合、全てのcheckItemsのcheckedがtrueに更新されること", () => {
      const mockEvent = { target: { value: "親ラベルA", checked: true } };
      const checkItems = [
        { label: "ラベル1", parentLabel: "親ラベルA", checked: false, isVisible: false },
        { label: "ラベル2", parentLabel: "親ラベルA", checked: false, isVisible: false },
      ];
      act(() => {
        handleChangeParentCheckBox({
          e: mockEvent as ChangeEvent<HTMLInputElement>,
          checkItems,
          checkItemsDispatch,
        });
      });
      expect(checkItemsDispatch).toHaveBeenCalledWith([
        { label: "ラベル1", parentLabel: "親ラベルA", checked: true, isVisible: false },
        { label: "ラベル2", parentLabel: "親ラベルA", checked: true, isVisible: false },
      ]);
    });

    test("e.target.checkedがfalseの場合、全てのcheckItemsのcheckedがfalseに更新されること", () => {
      const mockEvent = { target: { value: "親ラベルA", checked: false } };
      const checkItems = [
        { label: "ラベル1", parentLabel: "親ラベルA", checked: true, isVisible: false },
        { label: "ラベル2", parentLabel: "親ラベルA", checked: true, isVisible: false },
      ];
      act(() => {
        handleChangeParentCheckBox({
          e: mockEvent as ChangeEvent<HTMLInputElement>,
          checkItems,
          checkItemsDispatch,
        });
      });
      expect(checkItemsDispatch).toHaveBeenCalledWith([
        { label: "ラベル1", parentLabel: "親ラベルA", checked: false, isVisible: false },
        { label: "ラベル2", parentLabel: "親ラベルA", checked: false, isVisible: false },
      ]);
    });
  });

  describe("e.target.valueの値とcheckItemsのparentNameの値が異なる場合", () => {
    test("checkItemsのcheckedが更新されないこと", () => {
      const mockEvent = { target: { value: "親ラベルB", checked: true } };
      const checkItems = [
        { label: "ラベル1", parentLabel: "親ラベルA", checked: false, isVisible: false },
        { label: "ラベル2", parentLabel: "親ラベルA", checked: false, isVisible: false },
      ];
      act(() => {
        handleChangeParentCheckBox({
          e: mockEvent as ChangeEvent<HTMLInputElement>,
          checkItems,
          checkItemsDispatch,
        });
      });
      expect(checkItemsDispatch).toHaveBeenCalledWith([
        { label: "ラベル1", parentLabel: "親ラベルA", checked: false, isVisible: false },
        { label: "ラベル2", parentLabel: "親ラベルA", checked: false, isVisible: false },
      ]);
    });
  });
});
