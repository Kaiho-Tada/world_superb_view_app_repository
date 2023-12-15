import { renderHook } from "@testing-library/react";
import useGetSeasonCheckBoxInfo from "hooks/season/useGetSeasonCheckBoxInfo";

const spyOnUseWorldViewListContext = jest.spyOn(
  jest.requireActual("hooks/providers/WorldViewListProvider"),
  "useWorldViewListContext"
);

const mockContextValue = {
  monthCheckBoxItems: [
    { label: "4月", season: "春", checked: false },
    { label: "8月", season: "夏", checked: false },
    { label: "10月", season: "秋", checked: false },
    { label: "12月", season: "冬", checked: false },
  ],
};
const mockContextValueNotChecked = {
  monthCheckBoxItems: [
    { label: "3月", season: "春", checked: false },
    { label: "4月", season: "春", checked: false },
    { label: "5月", season: "春", checked: false },
  ],
};

const mockContextValuePartialChecked = {
  monthCheckBoxItems: [
    { label: "3月", season: "春", checked: true },
    { label: "4月", season: "春", checked: false },
    { label: "5月", season: "春", checked: false },
  ],
};

const mockContextValueAllChecked = {
  monthCheckBoxItems: [
    { label: "3月", season: "春", checked: true },
    { label: "4月", season: "春", checked: true },
    { label: "5月", season: "春", checked: true },
  ],
};
describe("allCheckedのテスト", () => {
  test("引数の季節のseasonプロパティを持つ全てのmonthCheckBoxItemsのcheckedがfalseである場合、allCheckedはfalseであること", () => {
    spyOnUseWorldViewListContext.mockImplementation(() => mockContextValueNotChecked);
    const { result } = renderHook(() => useGetSeasonCheckBoxInfo());
    const springInfo = result.current.handleGetSeasonCheckBoxInfo("春");
    expect(springInfo.allChecked).toBe(false);
  });

  test("引数の季節のseasonプロパティを持つmonthCheckBoxItemsの一部のcheckedがtrueである場合、allCheckedはfalseであること", () => {
    spyOnUseWorldViewListContext.mockImplementation(() => mockContextValuePartialChecked);
    const { result } = renderHook(() => useGetSeasonCheckBoxInfo());
    const springInfo = result.current.handleGetSeasonCheckBoxInfo("春");
    expect(springInfo.allChecked).toBe(false);
  });

  test("引数の季節のseasonプロパティを持つ全てのmonthCheckBoxItemsのcheckedがtrueである場合、allCheckedはtrueであること", () => {
    spyOnUseWorldViewListContext.mockImplementation(() => mockContextValueAllChecked);
    const { result } = renderHook(() => useGetSeasonCheckBoxInfo());
    const springInfo = result.current.handleGetSeasonCheckBoxInfo("春");
    expect(springInfo.allChecked).toBe(true);
  });
});

describe("isIndeterminateのテスト", () => {
  test("引数の季節のseasonプロパティを持つ全てのmonthCheckBoxItemsのcheckedがfalseである場合、isIndeterminateはfalseであること", () => {
    spyOnUseWorldViewListContext.mockImplementation(() => mockContextValueNotChecked);
    const { result } = renderHook(() => useGetSeasonCheckBoxInfo());
    const springInfo = result.current.handleGetSeasonCheckBoxInfo("春");
    expect(springInfo.isIndeterminate).toBe(false);
  });

  test("引数の季節のseasonプロパティを持つmonthCheckBoxItemsの一部のcheckedがtrueである場合、isIndeterminateはtrueであること", () => {
    spyOnUseWorldViewListContext.mockImplementation(() => mockContextValuePartialChecked);
    const { result } = renderHook(() => useGetSeasonCheckBoxInfo());
    const springInfo = result.current.handleGetSeasonCheckBoxInfo("春");
    expect(springInfo.isIndeterminate).toBe(true);
  });

  test("引数の季節のseasonプロパティを持つ全てのmonthCheckBoxItemsのcheckedがtrueである場合、isIndeterminateはfalseであること", () => {
    spyOnUseWorldViewListContext.mockImplementation(() => mockContextValueAllChecked);
    const { result } = renderHook(() => useGetSeasonCheckBoxInfo());
    const springInfo = result.current.handleGetSeasonCheckBoxInfo("春");
    expect(springInfo.isIndeterminate).toBe(false);
  });
});

describe("labelのテスト", () => {
  test("引数の季節と同じ季節のlabelが返されること", () => {
    spyOnUseWorldViewListContext.mockImplementation(() => mockContextValue);
    const { result } = renderHook(() => useGetSeasonCheckBoxInfo());
    const springInfo = result.current.handleGetSeasonCheckBoxInfo("春");
    const summerInfo = result.current.handleGetSeasonCheckBoxInfo("夏");
    const autumnInfo = result.current.handleGetSeasonCheckBoxInfo("秋");
    const winterInfo = result.current.handleGetSeasonCheckBoxInfo("冬");
    expect(springInfo.label).toBe("春");
    expect(summerInfo.label).toBe("夏");
    expect(autumnInfo.label).toBe("秋");
    expect(winterInfo.label).toBe("冬");
  });
});
