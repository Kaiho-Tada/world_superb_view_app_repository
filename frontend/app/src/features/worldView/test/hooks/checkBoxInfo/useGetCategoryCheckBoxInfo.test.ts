import { renderHook } from "@testing-library/react";
import useGetCategoryCheckBoxInfo from "features/worldView/hooks/checkBoxInfo/useGetCategoryCheckBoxInfo";

const spyOnUseWorldViewListContext = jest.spyOn(
  jest.requireActual("providers/WorldViewListProvider"),
  "useWorldViewListContext"
);

const mockContextValue = {
  state: {
    categoryCheckBoxItems: [
      {
        label: "砂漠",
        classification: "自然",
        checked: false,
      },
      {
        label: "城",
        classification: "人工",
        checked: false,
      },
    ],
  },
};

const mockContextValueNotChecked = {
  state: {
    categoryCheckBoxItems: [
      {
        label: "砂漠",
        classification: "自然",
        checked: false,
      },
      {
        label: "洞窟",
        classification: "自然",
        checked: false,
      },
    ],
  },
};

const mockContextValuePartialChecked = {
  state: {
    categoryCheckBoxItems: [
      {
        label: "砂漠",
        classification: "自然",
        checked: true,
      },
      {
        label: "洞窟",
        classification: "自然",
        checked: false,
      },
    ],
  },
};

const mockContextValueAllChecked = {
  state: {
    categoryCheckBoxItems: [
      {
        label: "砂漠",
        classification: "自然",
        checked: true,
      },
      {
        label: "洞窟",
        classification: "自然",
        checked: true,
      },
    ],
  },
};

describe("allCheckedのテスト", () => {
  test("引数の分類のclassificationプロパティを持つ全てのcategoryCheckBoxItemsのcheckedがfalseである場合、allCheckedはfalseであること", () => {
    spyOnUseWorldViewListContext.mockImplementation(() => mockContextValueNotChecked);
    const { result } = renderHook(() => useGetCategoryCheckBoxInfo());
    const natureInfo = result.current.handleGetCategoryCheckBoxInfo("自然");
    expect(natureInfo.allChecked).toBe(false);
  });

  test("引数の分類のclassificationプロパティを持つcategoryCheckBoxItemsの一部のcheckedがtrueである場合、allCheckedはfalseであること", () => {
    spyOnUseWorldViewListContext.mockImplementation(() => mockContextValuePartialChecked);
    const { result } = renderHook(() => useGetCategoryCheckBoxInfo());
    const natureInfo = result.current.handleGetCategoryCheckBoxInfo("自然");
    expect(natureInfo.allChecked).toBe(false);
  });

  test("引数の分類のclassificationプロパティを持つ全てのcategoryCheckBoxItemsのcheckedがtrueである場合、allCheckedはtrueであること", () => {
    spyOnUseWorldViewListContext.mockImplementation(() => mockContextValueAllChecked);
    const { result } = renderHook(() => useGetCategoryCheckBoxInfo());
    const natureInfo = result.current.handleGetCategoryCheckBoxInfo("自然");
    expect(natureInfo.allChecked).toBe(true);
  });
});

describe("isIndeterminateのテスト", () => {
  test("引数の分類のclassificationプロパティを持つ全てのcategoryCheckBoxItemsのcheckedがfalseである場合、isIndeterminateはfalseであること", () => {
    spyOnUseWorldViewListContext.mockImplementation(() => mockContextValueNotChecked);
    const { result } = renderHook(() => useGetCategoryCheckBoxInfo());
    const natureInfo = result.current.handleGetCategoryCheckBoxInfo("自然");
    expect(natureInfo.isIndeterminate).toBe(false);
  });

  test("引数の分類のclassificationプロパティを持つcategoryCheckBoxItemsの一部のcheckedがtrueである場合、isIndeterminateはtrueであること", () => {
    spyOnUseWorldViewListContext.mockImplementation(() => mockContextValuePartialChecked);
    const { result } = renderHook(() => useGetCategoryCheckBoxInfo());
    const natureInfo = result.current.handleGetCategoryCheckBoxInfo("自然");
    expect(natureInfo.isIndeterminate).toBe(true);
  });

  test("引数の分類のclassificationプロパティを持つ全てのcategoryCheckBoxItemsのcheckedがtrueである場合、isIndeterminateはfalseであること", () => {
    spyOnUseWorldViewListContext.mockImplementation(() => mockContextValueAllChecked);
    const { result } = renderHook(() => useGetCategoryCheckBoxInfo());
    const natureInfo = result.current.handleGetCategoryCheckBoxInfo("自然");
    expect(natureInfo.isIndeterminate).toBe(false);
  });
});

describe("labelのテスト", () => {
  test("引数の分類と同じ分類のlabelが返されること", () => {
    spyOnUseWorldViewListContext.mockImplementation(() => mockContextValue);
    const { result } = renderHook(() => useGetCategoryCheckBoxInfo());
    const natureInfo = result.current.handleGetCategoryCheckBoxInfo("自然");
    const artificialInfo = result.current.handleGetCategoryCheckBoxInfo("人工");
    expect(natureInfo.label).toBe("自然");
    expect(artificialInfo.label).toBe("人工");
  });
});
