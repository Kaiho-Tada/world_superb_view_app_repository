import { renderHook } from "@testing-library/react";
import useGetCategoryCheckBoxInfo from "hooks/category/useGetCategoryCheckBoxInfo";

const spyOnUseSuperbViewListContext = jest.spyOn(
  jest.requireActual("hooks/providers/SuperbViewListProvider"),
  "useSuperbViewListContext"
);

const mockContextValue = {
  categoryCheckBoxItems: [
    {
      label: "砂漠",
      classification: "自然",
      superbViewNames: ["superbView1", "superbView2"],
      checked: false,
    },
    {
      label: "城",
      classification: "人工",
      superbViewNames: ["ノイシュバンシュタイン城", "万里の長城"],
      checked: false,
    },
  ],
};

const mockContextValueNotChecked = {
  categoryCheckBoxItems: [
    {
      label: "砂漠",
      classification: "自然",
      superbViewNames: ["superbView1", "superbView2"],
      checked: false,
    },
    {
      label: "洞窟",
      classification: "自然",
      superbViewNames: ["superbView1", "superbView2"],
      checked: false,
    },
  ],
};

const mockContextValuePartialChecked = {
  categoryCheckBoxItems: [
    {
      label: "砂漠",
      classification: "自然",
      superbViewNames: ["superbView1", "superbView2"],
      checked: true,
    },
    {
      label: "洞窟",
      classification: "自然",
      superbViewNames: ["superbView1", "superbView2"],
      checked: false,
    },
  ],
};

const mockContextValueAllChecked = {
  categoryCheckBoxItems: [
    {
      label: "砂漠",
      classification: "自然",
      superbViewNames: ["superbView1", "superbView2"],
      checked: true,
    },
    {
      label: "洞窟",
      classification: "自然",
      superbViewNames: ["superbView1", "superbView2"],
      checked: true,
    },
  ],
};

describe("allCheckedのテスト", () => {
  test("引数の分類のclassificationプロパティを持つ全てのcategoryCheckBoxItemsのcheckedがfalseである場合、allCheckedはfalseであること", () => {
    spyOnUseSuperbViewListContext.mockImplementation(() => mockContextValueNotChecked);
    const { result } = renderHook(() => useGetCategoryCheckBoxInfo());
    const natureInfo = result.current.handleGetCategoryCheckBoxInfo("自然");
    expect(natureInfo.allChecked).toBe(false);
  });

  test("引数の分類のclassificationプロパティを持つcategoryCheckBoxItemsの一部のcheckedがtrueである場合、allCheckedはfalseであること", () => {
    spyOnUseSuperbViewListContext.mockImplementation(() => mockContextValuePartialChecked);
    const { result } = renderHook(() => useGetCategoryCheckBoxInfo());
    const natureInfo = result.current.handleGetCategoryCheckBoxInfo("自然");
    expect(natureInfo.allChecked).toBe(false);
  });

  test("引数の分類のclassificationプロパティを持つ全てのcategoryCheckBoxItemsのcheckedがtrueである場合、allCheckedはtrueであること", () => {
    spyOnUseSuperbViewListContext.mockImplementation(() => mockContextValueAllChecked);
    const { result } = renderHook(() => useGetCategoryCheckBoxInfo());
    const natureInfo = result.current.handleGetCategoryCheckBoxInfo("自然");
    expect(natureInfo.allChecked).toBe(true);
  });
});

describe("isIndeterminateのテスト", () => {
  test("引数の分類のclassificationプロパティを持つ全てのcategoryCheckBoxItemsのcheckedがfalseである場合、isIndeterminateはfalseであること", () => {
    spyOnUseSuperbViewListContext.mockImplementation(() => mockContextValueNotChecked);
    const { result } = renderHook(() => useGetCategoryCheckBoxInfo());
    const natureInfo = result.current.handleGetCategoryCheckBoxInfo("自然");
    expect(natureInfo.isIndeterminate).toBe(false);
  });

  test("引数の分類のclassificationプロパティを持つcategoryCheckBoxItemsの一部のcheckedがtrueである場合、isIndeterminateはtrueであること", () => {
    spyOnUseSuperbViewListContext.mockImplementation(() => mockContextValuePartialChecked);
    const { result } = renderHook(() => useGetCategoryCheckBoxInfo());
    const natureInfo = result.current.handleGetCategoryCheckBoxInfo("自然");
    expect(natureInfo.isIndeterminate).toBe(true);
  });

  test("引数の分類のclassificationプロパティを持つ全てのcategoryCheckBoxItemsのcheckedがtrueである場合、isIndeterminateはfalseであること", () => {
    spyOnUseSuperbViewListContext.mockImplementation(() => mockContextValueAllChecked);
    const { result } = renderHook(() => useGetCategoryCheckBoxInfo());
    const natureInfo = result.current.handleGetCategoryCheckBoxInfo("自然");
    expect(natureInfo.isIndeterminate).toBe(false);
  });
});

describe("labelのテスト", () => {
  test("引数の分類と同じ分類のlabelが返されること", () => {
    spyOnUseSuperbViewListContext.mockImplementation(() => mockContextValue);
    const { result } = renderHook(() => useGetCategoryCheckBoxInfo());
    const natureInfo = result.current.handleGetCategoryCheckBoxInfo("自然");
    const artificialInfo = result.current.handleGetCategoryCheckBoxInfo("人工");
    expect(natureInfo.label).toBe("自然");
    expect(artificialInfo.label).toBe("人工");
  });
});
