import { renderHook } from "@testing-library/react";
import useCategoryHandleChange from "hooks/api/category/useCategoryHandleChange";
import { ChangeEvent } from "react";
import { act } from "react-dom/test-utils";

const spyOnUseSuperbViewListContext = jest.spyOn(
  jest.requireActual("hooks/providers/SuperbViewListProvider"),
  "useSuperbViewListContext"
);

const mockSetCategoryCheckBoxItems = jest.fn();
const mockSetCheckedCategoryLabels = jest.fn();

const mockContextValueCheckedFalse = {
  setCategoryCheckBoxItems: mockSetCategoryCheckBoxItems,
  setCheckedCategoryLabels: mockSetCheckedCategoryLabels,
  categoryCheckBoxItems: [
    {
      label: "城",
      classification: "人工",
      checked: false,
    },
  ],
};

const mockContextValueCheckedTrue = {
  setCategoryCheckBoxItems: mockSetCategoryCheckBoxItems,
  setCheckedCategoryLabels: mockSetCheckedCategoryLabels,
  categoryCheckBoxItems: [
    {
      label: "城",
      classification: "人工",
      checked: true,
    },
  ],
};

describe("handleChangeClassification関数の挙動のテスト", () => {
  describe("e.target.valueの値とcategoryCheckBoxItemsのclassificationプロパティの値が同じである場合", () => {
    test("e.target.checkedがtrueの場合、categoryCheckBoxItemsのcheckedがtrueに更新されること", () => {
      spyOnUseSuperbViewListContext.mockImplementation(() => mockContextValueCheckedFalse);
      const { result } = renderHook(() => useCategoryHandleChange());
      const mockEvent = { target: { value: "人工", checked: true } };
      act(() => {
        result.current.handleChangeClassification(mockEvent as ChangeEvent<HTMLInputElement>);
      });

      expect(mockSetCategoryCheckBoxItems).toHaveBeenCalledWith([
        {
          label: "城",
          classification: "人工",
          checked: true,
        },
      ]);
      expect(mockSetCategoryCheckBoxItems).toHaveBeenCalledTimes(1);

      expect(mockSetCheckedCategoryLabels).toHaveBeenCalledWith(["城"]);
      expect(mockSetCheckedCategoryLabels).toHaveBeenCalledTimes(1);
    });

    test("e.target.checkedがfalseの場合、categoryCheckBoxItemsのcheckedがfalseに更新されること", () => {
      spyOnUseSuperbViewListContext.mockImplementation(() => mockContextValueCheckedTrue);
      const { result } = renderHook(() => useCategoryHandleChange());
      const mockEvent = { target: { value: "人工", checked: false } };
      act(() => {
        result.current.handleChangeClassification(mockEvent as ChangeEvent<HTMLInputElement>);
      });

      expect(mockSetCategoryCheckBoxItems).toHaveBeenCalledWith([
        {
          label: "城",
          classification: "人工",
          checked: false,
        },
      ]);
      expect(mockSetCategoryCheckBoxItems).toHaveBeenCalledTimes(1);

      expect(mockSetCheckedCategoryLabels).toHaveBeenCalledWith([]);
      expect(mockSetCheckedCategoryLabels).toHaveBeenCalledTimes(1);
    });

    describe("e.target.valueの値とcategoryCheckBoxItemsのclassificationの値が異なる場合", () => {
      test("monthCheckBoxItemsのcheckedが更新されないこと", () => {
        spyOnUseSuperbViewListContext.mockImplementation(() => mockContextValueCheckedFalse);
        const { result } = renderHook(() => useCategoryHandleChange());
        const mockEvent = { target: { value: "自然", checked: true } };
        act(() => {
          result.current.handleChangeClassification(mockEvent as ChangeEvent<HTMLInputElement>);
        });

        expect(mockSetCategoryCheckBoxItems).toHaveBeenCalledWith([
          {
            label: "城",
            classification: "人工",
            checked: false,
          },
        ]);
        expect(mockSetCategoryCheckBoxItems).toHaveBeenCalledTimes(1);

        expect(mockSetCheckedCategoryLabels).toHaveBeenCalledWith([]);
        expect(mockSetCheckedCategoryLabels).toHaveBeenCalledTimes(1);
      });
    });
  });
});

describe("handleChangeCategory関数の挙動のテスト", () => {
  test("categoryCheckBoxItemsのcheckedがfalseの場合、trueに更新されること", () => {
    spyOnUseSuperbViewListContext.mockImplementation(() => mockContextValueCheckedFalse);
    const { result } = renderHook(() => useCategoryHandleChange());
    const mockEvent = { target: { value: "城" } };
    act(() => {
      result.current.handleChangeCategory(mockEvent as ChangeEvent<HTMLInputElement>);
    });
    expect(mockSetCategoryCheckBoxItems).toHaveBeenCalledWith([
      {
        label: "城",
        classification: "人工",
        checked: true,
      },
    ]);
    expect(mockSetCategoryCheckBoxItems).toHaveBeenCalledTimes(1);

    expect(mockSetCheckedCategoryLabels).toHaveBeenCalledWith(["城"]);
    expect(mockSetCheckedCategoryLabels).toHaveBeenCalledTimes(1);
  });

  test("categoryCheckBoxItemsのcheckedがtrueの場合、falseに更新されること", () => {
    spyOnUseSuperbViewListContext.mockImplementation(() => mockContextValueCheckedTrue);
    const { result } = renderHook(() => useCategoryHandleChange());
    const mockEvent = { target: { value: "城" } };
    act(() => {
      result.current.handleChangeCategory(mockEvent as ChangeEvent<HTMLInputElement>);
    });
    expect(mockSetCategoryCheckBoxItems).toHaveBeenCalledWith([
      {
        label: "城",
        classification: "人工",
        checked: false,
      },
    ]);
    expect(mockSetCategoryCheckBoxItems).toHaveBeenCalledTimes(1);

    expect(mockSetCheckedCategoryLabels).toHaveBeenCalledWith([]);
    expect(mockSetCheckedCategoryLabels).toHaveBeenCalledTimes(1);
  });
});
