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
      superbViewNames: ["ノイシュバンシュタイン城", "万里の長城"],
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
      superbViewNames: ["ノイシュバンシュタイン城", "万里の長城"],
      checked: true,
    },
  ],
};

describe("handleChangeCategory関数の挙動のテスト", () => {
  test("categoriesWithCheckBoxDataのcheckedがfalseの場合、trueに更新されること", () => {
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
        superbViewNames: ["ノイシュバンシュタイン城", "万里の長城"],
        checked: true,
      },
    ]);
    expect(mockSetCategoryCheckBoxItems).toHaveBeenCalledTimes(1);

    expect(mockSetCheckedCategoryLabels).toHaveBeenCalledWith(["城"]);
    expect(mockSetCheckedCategoryLabels).toHaveBeenCalledTimes(1);
  });

  test("categoriesWithCheckBoxDataのcheckedがtrueの場合、falseに更新されること", () => {
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
        superbViewNames: ["ノイシュバンシュタイン城", "万里の長城"],
        checked: false,
      },
    ]);
    expect(mockSetCategoryCheckBoxItems).toHaveBeenCalledTimes(1);

    expect(mockSetCheckedCategoryLabels).toHaveBeenCalledWith([]);
    expect(mockSetCheckedCategoryLabels).toHaveBeenCalledTimes(1);
  });
});
