import { renderHook } from "@testing-library/react";
import useCategoryHandleChange from "features/worldView/hooks/filter/useCategoryHandleChange";
import { ChangeEvent } from "react";
import { act } from "react-dom/test-utils";

const spyOnUseWorldViewListContext = jest.spyOn(
  jest.requireActual("providers/WorldViewListProvider"),
  "useWorldViewListContext"
);

const mockDispatch = jest.fn();
const mockContextValueCheckedFalse = {
  dispatch: mockDispatch,
  state: {
    categoryCheckBoxItems: [
      {
        label: "城",
        parentLabel: "人工",
        checked: false,
      },
    ],
  },
};

const mockContextValueCheckedTrue = {
  dispatch: mockDispatch,
  state: {
    categoryCheckBoxItems: [
      {
        label: "城",
        parentLabel: "人工",
        checked: true,
      },
    ],
  },
};

describe("handleChangeClassification関数の挙動のテスト", () => {
  describe("e.target.valueの値とcategoryCheckBoxItemsのclassificationプロパティの値が同じである場合", () => {
    test("e.target.checkedがtrueの場合、categoryCheckBoxItemsのcheckedがtrueに更新されること", () => {
      spyOnUseWorldViewListContext.mockImplementation(() => mockContextValueCheckedFalse);
      const { result } = renderHook(() => useCategoryHandleChange());
      const mockEvent = { target: { value: "人工", checked: true } };
      act(() => {
        result.current.handleChangeClassification(mockEvent as ChangeEvent<HTMLInputElement>);
      });
      expect(mockDispatch).toHaveBeenCalledWith({
        type: "SET_CATEGORY_CHECKBOX_ITEMS",
        payload: [
          {
            label: "城",
            parentLabel: "人工",
            checked: true,
          },
        ],
      });
      expect(mockDispatch).toHaveBeenCalledWith({
        type: "SET_CHECKED_CATEGORY_LABELS",
        payload: ["城"],
      });
    });
    test("e.target.checkedがfalseの場合、categoryCheckBoxItemsのcheckedがfalseに更新されること", () => {
      spyOnUseWorldViewListContext.mockImplementation(() => mockContextValueCheckedTrue);
      const { result } = renderHook(() => useCategoryHandleChange());
      const mockEvent = { target: { value: "人工", checked: false } };
      act(() => {
        result.current.handleChangeClassification(mockEvent as ChangeEvent<HTMLInputElement>);
      });
      expect(mockDispatch).toHaveBeenCalledWith({
        type: "SET_CATEGORY_CHECKBOX_ITEMS",
        payload: [
          {
            label: "城",
            parentLabel: "人工",
            checked: false,
          },
        ],
      });
      expect(mockDispatch).toHaveBeenCalledWith({
        type: "SET_CHECKED_CATEGORY_LABELS",
        payload: [],
      });
    });
  });
  describe("e.target.valueの値とcategoryCheckBoxItemsのclassificationの値が異なる場合", () => {
    test("monthCheckBoxItemsのcheckedが更新されないこと", () => {
      spyOnUseWorldViewListContext.mockImplementation(() => mockContextValueCheckedFalse);
      const { result } = renderHook(() => useCategoryHandleChange());
      const mockEvent = { target: { value: "自然", checked: true } };
      act(() => {
        result.current.handleChangeClassification(mockEvent as ChangeEvent<HTMLInputElement>);
      });
      expect(mockDispatch).toHaveBeenCalledWith({
        type: "SET_CATEGORY_CHECKBOX_ITEMS",
        payload: [
          {
            label: "城",
            parentLabel: "人工",
            checked: false,
          },
        ],
      });
      expect(mockDispatch).toHaveBeenCalledWith({
        type: "SET_CHECKED_CATEGORY_LABELS",
        payload: [],
      });
    });
  });
});
