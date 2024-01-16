import { renderHook } from "@testing-library/react";
import useGetCheckBoxInfo from "features/worldView/hooks/useGetCheckBoxInfo";

const categoryCheckBoxItemsNotChecked = [
  { label: "砂漠", parentLabel: "自然", checked: false },
  { label: "洞窟", parentLabel: "自然", checked: false },
];
const countryCheckBoxItemsNotChecked = [
  { label: "アメリカ", parentLabel: "北米", checked: false },
  { label: "カナダ", parentLabel: "北米", checked: false },
];
const monthCheckBoxItemsNotChecked = [
  { label: "3月", parentLabel: "春", checked: false },
  { label: "4月", parentLabel: "春", checked: false },
];
const categoryCheckBoxItemsPartialChecked = [
  { label: "砂漠", parentLabel: "自然", checked: true },
  { label: "洞窟", parentLabel: "自然", checked: false },
];
const countryCheckBoxItemsPartialChecked = [
  { label: "アメリカ", parentLabel: "北米", checked: true },
  { label: "カナダ", parentLabel: "北米", checked: false },
];
const monthCheckBoxItemsPartialChecked = [
  { label: "3月", parentLabel: "春", checked: true },
  { label: "4月", parentLabel: "春", checked: false },
];
const categoryCheckBoxItemsAllChecked = [
  { label: "砂漠", parentLabel: "自然", checked: true },
  { label: "洞窟", parentLabel: "自然", checked: true },
];
const countryCheckBoxItemsAllChecked = [
  { label: "アメリカ", parentLabel: "北米", checked: true },
  { label: "カナダ", parentLabel: "北米", checked: true },
];
const monthCheckBoxItemsAllChecked = [
  { label: "3月", parentLabel: "春", checked: true },
  { label: "4月", parentLabel: "春", checked: true },
];
const countryCheckBoxItems = [
  { label: "中国", parentLabel: "アジア", checked: false },
  { label: "オーストラリア", parentLabel: "大洋州", checked: false },
  { label: "アメリカ", parentLabel: "北米", checked: true },
  { label: "メキシコ", parentLabel: "中南米", checked: false },
  { label: "イギリス", parentLabel: "ヨーロッパ", checked: false },
  { label: "トルコ", parentLabel: "中東", checked: false },
  { label: "エジプト", parentLabel: "アフリカ", checked: false },
];

describe("allCheckedのテスト", () => {
  test("引数のparentと同じ(classification or stateName or season)プロパティを持つ全てのcheckBoxItemsのcheckedがfalseである場合、allCheckedはfalseであること", () => {
    const { result } = renderHook(() => useGetCheckBoxInfo());
    const categoryInfo = result.current.handleGetCheckBoxInfo({
      parentLabel: "自然",
      checkBoxItems: categoryCheckBoxItemsNotChecked,
    });
    const countryInfo = result.current.handleGetCheckBoxInfo({
      parentLabel: "北米",
      checkBoxItems: countryCheckBoxItemsNotChecked,
    });
    const monthInfo = result.current.handleGetCheckBoxInfo({
      parentLabel: "春",
      checkBoxItems: monthCheckBoxItemsNotChecked,
    });
    expect(categoryInfo.allChecked).toBe(false);
    expect(countryInfo.allChecked).toBe(false);
    expect(monthInfo.allChecked).toBe(false);
  });

  test("引数のparentと同じ(classification or stateName or season)プロパティを持つcheckBoxItemsが一部でもチェックされている場合でも、allCheckedはfalseであること", () => {
    const { result } = renderHook(() => useGetCheckBoxInfo());
    const categoryInfo = result.current.handleGetCheckBoxInfo({
      parentLabel: "自然",
      checkBoxItems: categoryCheckBoxItemsPartialChecked,
    });
    const countryInfo = result.current.handleGetCheckBoxInfo({
      parentLabel: "北米",
      checkBoxItems: countryCheckBoxItemsPartialChecked,
    });
    const monthInfo = result.current.handleGetCheckBoxInfo({
      parentLabel: "春",
      checkBoxItems: monthCheckBoxItemsPartialChecked,
    });
    expect(categoryInfo.allChecked).toBe(false);
    expect(countryInfo.allChecked).toBe(false);
    expect(monthInfo.allChecked).toBe(false);
  });

  test("引数のparentと同じ(classification or stateName or season)プロパティを持つ全てのcategoryCheckBoxItemsのcheckedがtrueである場合、allCheckedはtrueであること", () => {
    const { result } = renderHook(() => useGetCheckBoxInfo());
    const categoryInfo = result.current.handleGetCheckBoxInfo({
      parentLabel: "自然",
      checkBoxItems: categoryCheckBoxItemsAllChecked,
    });
    const countryInfo = result.current.handleGetCheckBoxInfo({
      parentLabel: "北米",
      checkBoxItems: countryCheckBoxItemsAllChecked,
    });
    const monthInfo = result.current.handleGetCheckBoxInfo({
      parentLabel: "春",
      checkBoxItems: monthCheckBoxItemsAllChecked,
    });
    expect(categoryInfo.allChecked).toBe(true);
    expect(countryInfo.allChecked).toBe(true);
    expect(monthInfo.allChecked).toBe(true);
  });
});

describe("isIndeterminateのテスト", () => {
  test("引数のparentと同じ(classification or stateName or season)プロパティを持つ全てのcheckBoxItemsのcheckedがfalseである場合、isIndeterminateはfalseであること", () => {
    const { result } = renderHook(() => useGetCheckBoxInfo());
    const categoryInfo = result.current.handleGetCheckBoxInfo({
      parentLabel: "自然",
      checkBoxItems: categoryCheckBoxItemsNotChecked,
    });
    const countryInfo = result.current.handleGetCheckBoxInfo({
      parentLabel: "北米",
      checkBoxItems: countryCheckBoxItemsNotChecked,
    });
    const monthInfo = result.current.handleGetCheckBoxInfo({
      parentLabel: "春",
      checkBoxItems: monthCheckBoxItemsNotChecked,
    });
    expect(categoryInfo.isIndeterminate).toBe(false);
    expect(countryInfo.isIndeterminate).toBe(false);
    expect(monthInfo.isIndeterminate).toBe(false);
  });

  test("引数のparentと同じ(classification or stateName or season)プロパティを持つcheckBoxItemsの一部のcheckedがtrueである場合、isIndeterminateはtrueであること", () => {
    const { result } = renderHook(() => useGetCheckBoxInfo());
    const categoryInfo = result.current.handleGetCheckBoxInfo({
      parentLabel: "自然",
      checkBoxItems: categoryCheckBoxItemsPartialChecked,
    });
    const countryInfo = result.current.handleGetCheckBoxInfo({
      parentLabel: "北米",
      checkBoxItems: countryCheckBoxItemsPartialChecked,
    });
    const monthInfo = result.current.handleGetCheckBoxInfo({
      parentLabel: "春",
      checkBoxItems: monthCheckBoxItemsPartialChecked,
    });
    expect(categoryInfo.isIndeterminate).toBe(true);
    expect(countryInfo.isIndeterminate).toBe(true);
    expect(monthInfo.isIndeterminate).toBe(true);
  });

  test("引数のparentと同じ(classification or stateName or season)プロパティを持つ全てのcategoryCheckBoxItemsのcheckedがtrueである場合、isIndeterminateはfalseであること", () => {
    const { result } = renderHook(() => useGetCheckBoxInfo());
    const categoryInfo = result.current.handleGetCheckBoxInfo({
      parentLabel: "自然",
      checkBoxItems: categoryCheckBoxItemsAllChecked,
    });
    const countryInfo = result.current.handleGetCheckBoxInfo({
      parentLabel: "北米",
      checkBoxItems: countryCheckBoxItemsAllChecked,
    });
    const monthInfo = result.current.handleGetCheckBoxInfo({
      parentLabel: "春",
      checkBoxItems: monthCheckBoxItemsAllChecked,
    });
    expect(categoryInfo.isIndeterminate).toBe(false);
    expect(countryInfo.isIndeterminate).toBe(false);
    expect(monthInfo.isIndeterminate).toBe(false);
  });
});

describe("labelのテスト", () => {
  test("引数のparentと同じ値のlabelが返されること", () => {
    const { result } = renderHook(() => useGetCheckBoxInfo());
    const categoryInfo = result.current.handleGetCheckBoxInfo({
      parentLabel: "自然",
      checkBoxItems: categoryCheckBoxItemsNotChecked,
    });
    const countryInfo = result.current.handleGetCheckBoxInfo({
      parentLabel: "北米",
      checkBoxItems: countryCheckBoxItemsNotChecked,
    });
    const monthInfo = result.current.handleGetCheckBoxInfo({
      parentLabel: "春",
      checkBoxItems: monthCheckBoxItemsNotChecked,
    });
    expect(categoryInfo.parentLabel).toBe("自然");
    expect(countryInfo.parentLabel).toBe("北米");
    expect(monthInfo.parentLabel).toBe("春");
  });
});

describe("エラー時のテスト", () => {
  test("引数で受け取ったparentの値がcheckBoxItemsのプロパティに存在しなかった場合、エラーになること", () => {
    const { result } = renderHook(() => useGetCheckBoxInfo());
    const parentLabel = "南極";
    const checkBoxItems = countryCheckBoxItems;
    expect(() => result.current.handleGetCheckBoxInfo({ parentLabel, checkBoxItems })).toThrowError(
      `${parentLabel}プロパティは引数のcheckBoxItemsに存在しません`
    );
  });
});
