import { ChangeEvent } from "react";
import { act } from "react-dom/test-utils";
import handleChangeParentCheckBox from "utils/handleChangeParentCheckBox";

const checkBoxItemsDispatch = jest.fn();

describe("handleChangeParentCheckBox関数の挙動のテスト", () => {
  describe("e.target.valueの値とcheckBoxItemsのparentNameプロパティの値が同じである場合", () => {
    test("e.target.checkedがtrueの場合、全てのcheckBoxItemsのcheckedがtrueに更新されること", () => {
      const mockEvent = { target: { value: "親ラベルA", checked: true } };
      const checkBoxItems = [
        { label: "ラベル1", parentLabel: "親ラベルA", checked: false, isVisible: false },
        { label: "ラベル2", parentLabel: "親ラベルA", checked: false, isVisible: false },
      ];
      act(() => {
        handleChangeParentCheckBox({
          e: mockEvent as ChangeEvent<HTMLInputElement>,
          checkBoxItems,
          checkBoxItemsDispatch,
        });
      });
      expect(checkBoxItemsDispatch).toHaveBeenCalledWith([
        { label: "ラベル1", parentLabel: "親ラベルA", checked: true, isVisible: false },
        { label: "ラベル2", parentLabel: "親ラベルA", checked: true, isVisible: false },
      ]);
    });

    test("e.target.checkedがfalseの場合、全てのcheckBoxItemsのcheckedがfalseに更新されること", () => {
      const mockEvent = { target: { value: "親ラベルA", checked: false } };
      const checkBoxItems = [
        { label: "ラベル1", parentLabel: "親ラベルA", checked: true, isVisible: false },
        { label: "ラベル2", parentLabel: "親ラベルA", checked: true, isVisible: false },
      ];
      act(() => {
        handleChangeParentCheckBox({
          e: mockEvent as ChangeEvent<HTMLInputElement>,
          checkBoxItems,
          checkBoxItemsDispatch,
        });
      });
      expect(checkBoxItemsDispatch).toHaveBeenCalledWith([
        { label: "ラベル1", parentLabel: "親ラベルA", checked: false, isVisible: false },
        { label: "ラベル2", parentLabel: "親ラベルA", checked: false, isVisible: false },
      ]);
    });
  });

  describe("e.target.valueの値とcheckBoxItemsのparentNameの値が異なる場合", () => {
    test("checkBoxItemsのcheckedが更新されないこと", () => {
      const mockEvent = { target: { value: "親ラベルB", checked: true } };
      const checkBoxItems = [
        { label: "ラベル1", parentLabel: "親ラベルA", checked: false, isVisible: false },
        { label: "ラベル2", parentLabel: "親ラベルA", checked: false, isVisible: false },
      ];
      act(() => {
        handleChangeParentCheckBox({
          e: mockEvent as ChangeEvent<HTMLInputElement>,
          checkBoxItems,
          checkBoxItemsDispatch,
        });
      });
      expect(checkBoxItemsDispatch).toHaveBeenCalledWith([
        { label: "ラベル1", parentLabel: "親ラベルA", checked: false, isVisible: false },
        { label: "ラベル2", parentLabel: "親ラベルA", checked: false, isVisible: false },
      ]);
    });
  });
});
