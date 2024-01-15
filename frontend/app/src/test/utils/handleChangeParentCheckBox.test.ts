import { ChangeEvent } from "react";
import { act } from "react-dom/test-utils";
import handleChangeParentCheckBox from "utils/handleChangeParentCheckBox";

const checkBoxItemsDispatch = jest.fn();
const checkedLabelsDispatch = jest.fn();

describe("handleChangeParentCheckBox関数の挙動のテスト", () => {
  describe("e.target.valueの値とcheckBoxItemsのparentNameプロパティの値が同じである場合", () => {
    test("e.target.checkedがtrueの場合、全てのcheckBoxItemsのcheckedがtrueに更新されること", () => {
      const mockEvent = { target: { value: "親ラベル", checked: true } };
      const checkBoxItems = [
        { label: "ラベル1", parentLabel: "親ラベル", checked: false },
        { label: "ラベル2", parentLabel: "親ラベル", checked: false },
      ];
      act(() => {
        handleChangeParentCheckBox({
          e: mockEvent as ChangeEvent<HTMLInputElement>,
          checkBoxItems,
          checkBoxItemsDispatch,
          checkedLabelsDispatch,
        });
      });
      expect(checkBoxItemsDispatch).toHaveBeenCalledWith([
        { label: "ラベル1", parentLabel: "親ラベル", checked: true },
        { label: "ラベル2", parentLabel: "親ラベル", checked: true },
      ]);
      expect(checkedLabelsDispatch).toHaveBeenCalledWith(["ラベル1", "ラベル2"]);
    });

    test("e.target.checkedがfalseの場合、全てのcheckBoxItemsのcheckedがfalseに更新されること", () => {
      const mockEvent = { target: { value: "親ラベル", checked: false } };
      const checkBoxItems = [
        { label: "ラベル1", parentLabel: "親ラベル", checked: true },
        { label: "ラベル2", parentLabel: "親ラベル", checked: true },
      ];
      act(() => {
        handleChangeParentCheckBox({
          e: mockEvent as ChangeEvent<HTMLInputElement>,
          checkBoxItems,
          checkBoxItemsDispatch,
          checkedLabelsDispatch,
        });
      });
      expect(checkBoxItemsDispatch).toHaveBeenCalledWith([
        { label: "ラベル1", parentLabel: "親ラベル", checked: false },
        { label: "ラベル2", parentLabel: "親ラベル", checked: false },
      ]);
      expect(checkedLabelsDispatch).toHaveBeenCalledWith([]);
    });
  });

  describe("e.target.valueの値とcheckBoxItemsのparentNameの値が異なる場合", () => {
    test("checkBoxItemsのcheckedが更新されないこと", () => {
      const mockEvent = { target: { value: "親らべる", checked: true } };
      const checkBoxItems = [
        { label: "ラベル1", parentLabel: "親ラベル", checked: false },
        { label: "ラベル2", parentLabel: "親ラベル", checked: false },
      ];
      act(() => {
        handleChangeParentCheckBox({
          e: mockEvent as ChangeEvent<HTMLInputElement>,
          checkBoxItems,
          checkBoxItemsDispatch,
          checkedLabelsDispatch,
        });
      });
      expect(checkBoxItemsDispatch).toHaveBeenCalledWith([
        { label: "ラベル1", parentLabel: "親ラベル", checked: false },
        { label: "ラベル2", parentLabel: "親ラベル", checked: false },
      ]);
      expect(checkedLabelsDispatch).toHaveBeenCalledWith([]);
    });
  });
});
