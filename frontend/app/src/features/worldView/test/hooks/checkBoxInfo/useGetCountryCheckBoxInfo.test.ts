import { renderHook } from "@testing-library/react";
import useGetCountryCheckBoxInfo from "features/worldView/hooks/checkBoxInfo/useGetCountryCheckBoxInfo";

const spyOnUseWorldViewListContext = jest.spyOn(
  jest.requireActual("providers/WorldViewListProvider"),
  "useWorldViewListContext"
);

const mockContextValue = {
  state: {
    countryCheckBoxItems: [
      {
        label: "アメリカ",
        stateName: "北米",
        checked: false,
      },
      {
        label: "中国",
        stateName: "アジア",
        checked: false,
      },
    ],
  },
};

const mockContextValueNotChecked = {
  state: {
    countryCheckBoxItems: [
      {
        label: "アメリカ",
        stateName: "北米",
        checked: false,
      },
      {
        label: "カナダ",
        stateName: "北米",
        checked: false,
      },
    ],
  },
};

const mockContextValuePartialChecked = {
  state: {
    countryCheckBoxItems: [
      {
        label: "アメリカ",
        stateName: "北米",
        checked: true,
      },
      {
        label: "カナダ",
        stateName: "北米",
        checked: false,
      },
    ],
  },
};

const mockContextValueAllChecked = {
  state: {
    countryCheckBoxItems: [
      {
        label: "アメリカ",
        stateName: "北米",
        checked: true,
      },
      {
        label: "カナダ",
        stateName: "北米",
        checked: true,
      },
    ],
  },
};

describe("allCheckedのテスト", () => {
  test("引数の州のstateNameプロパティを持つ全てのcountryCheckBoxItemsのcheckedがfalseである場合、allCheckedはfalseであること", () => {
    spyOnUseWorldViewListContext.mockImplementation(() => mockContextValueNotChecked);
    const { result } = renderHook(() => useGetCountryCheckBoxInfo());
    const northAmericaInfo = result.current.handleGetCountryCheckBoxInfo("北米");
    expect(northAmericaInfo.allChecked).toBe(false);
  });

  test("引数の州のstateNameプロパティを持つcountryCheckBoxItemsの一部のcheckedがtrueである場合、allCheckedはfalseであること", () => {
    spyOnUseWorldViewListContext.mockImplementation(() => mockContextValuePartialChecked);
    const { result } = renderHook(() => useGetCountryCheckBoxInfo());
    const northAmericaInfo = result.current.handleGetCountryCheckBoxInfo("北米");
    expect(northAmericaInfo.allChecked).toBe(false);
  });

  test("引数の州のstateNameプロパティを持つ全てのcountryCheckBoxItemsのcheckedがtrueである場合、allCheckedはtrueであること", () => {
    spyOnUseWorldViewListContext.mockImplementation(() => mockContextValueAllChecked);
    const { result } = renderHook(() => useGetCountryCheckBoxInfo());
    const northAmericaInfo = result.current.handleGetCountryCheckBoxInfo("北米");
    expect(northAmericaInfo.allChecked).toBe(true);
  });
});

describe("isIndeterminateのテスト", () => {
  test("引数の州のstateNameプロパティを持つ全てのcountryCheckBoxItemsのcheckedがfalseである場合、isIndeterminateはfalseであること", () => {
    spyOnUseWorldViewListContext.mockImplementation(() => mockContextValueNotChecked);
    const { result } = renderHook(() => useGetCountryCheckBoxInfo());
    const northAmericaInfo = result.current.handleGetCountryCheckBoxInfo("北米");
    expect(northAmericaInfo.isIndeterminate).toBe(false);
  });

  test("引数の州のstateNameプロパティを持つcountryCheckBoxItemsの一部のcheckedがtrueである場合、isIndeterminateはtrueであること", () => {
    spyOnUseWorldViewListContext.mockImplementation(() => mockContextValuePartialChecked);
    const { result } = renderHook(() => useGetCountryCheckBoxInfo());
    const northAmericaInfo = result.current.handleGetCountryCheckBoxInfo("北米");
    expect(northAmericaInfo.isIndeterminate).toBe(true);
  });

  test("引数の州のstateNameプロパティを持つ全てのcountryCheckBoxItemsのcheckedがtrueである場合、isIndeterminateはfalseであること", () => {
    spyOnUseWorldViewListContext.mockImplementation(() => mockContextValueAllChecked);
    const { result } = renderHook(() => useGetCountryCheckBoxInfo());
    const northAmericaInfo = result.current.handleGetCountryCheckBoxInfo("北米");
    expect(northAmericaInfo.isIndeterminate).toBe(false);
  });
});

describe("labelのテスト", () => {
  test("引数の分類と同じ分類のlabelが返されること", () => {
    spyOnUseWorldViewListContext.mockImplementation(() => mockContextValue);
    const { result } = renderHook(() => useGetCountryCheckBoxInfo());
    const northAmericaInfo = result.current.handleGetCountryCheckBoxInfo("北米");
    const AsiaInfo = result.current.handleGetCountryCheckBoxInfo("アジア");
    expect(northAmericaInfo.label).toBe("北米");
    expect(AsiaInfo.label).toBe("アジア");
  });
});
