import { renderHook } from "@testing-library/react";
import useCategoryHandleChange from "hooks/api/category/useCategoryHandleChange";
import * as SuperbViewListProviderModule from "hooks/providers/SuperbViewListProvider";
import { ChangeEvent } from "react";
import { act } from "react-dom/test-utils";

const spyOnUseSuperbViewListContext = jest.spyOn(
  SuperbViewListProviderModule,
  "useSuperbViewListContext"
);

const mockSetCategoriesWithCheckBoxData = jest.fn();
const mockSetCheckedCategoryLabels = jest.fn();

const mockContextValueCheckedFalse = {
  ...jest.requireActual("hooks/providers/SuperbViewListProvider").useSuperbViewListContext,
  setCategoriesWithCheckBoxData: mockSetCategoriesWithCheckBoxData,
  setCheckedCategoryLabels: mockSetCheckedCategoryLabels,
  categoriesWithCheckBoxData: [
    {
      label: "城",
      classification: "人工",
      superbViewNames: ["ノイシュバンシュタイン城", "万里の長城"],
      checked: false,
    },
  ],
};

const mockContextValueCheckedTrue = {
  ...jest.requireActual("hooks/providers/SuperbViewListProvider").useSuperbViewListContext,
  setCategoriesWithCheckBoxData: mockSetCategoriesWithCheckBoxData,
  setCheckedCategoryLabels: mockSetCheckedCategoryLabels,
  categoriesWithCheckBoxData: [
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
    expect(mockSetCategoriesWithCheckBoxData).toHaveBeenCalledWith([
      {
        label: "城",
        classification: "人工",
        superbViewNames: ["ノイシュバンシュタイン城", "万里の長城"],
        checked: true,
      },
    ]);
    expect(mockSetCategoriesWithCheckBoxData).toHaveBeenCalledTimes(1);

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
    expect(mockSetCategoriesWithCheckBoxData).toHaveBeenCalledWith([
      {
        label: "城",
        classification: "人工",
        superbViewNames: ["ノイシュバンシュタイン城", "万里の長城"],
        checked: false,
      },
    ]);
    expect(mockSetCategoriesWithCheckBoxData).toHaveBeenCalledTimes(1);

    expect(mockSetCheckedCategoryLabels).toHaveBeenCalledWith([]);
    expect(mockSetCheckedCategoryLabels).toHaveBeenCalledTimes(1);
  });
});
