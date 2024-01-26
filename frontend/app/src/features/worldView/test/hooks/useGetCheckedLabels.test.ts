import useGetCheckedLabels from "features/worldView/hooks/useGetCheckedLabels";

jest.mock("providers/WorldViewListProvider", () => ({
  useWorldViewListContext: () => ({
    state: {
      categoryCheckBoxItems: [{ label: "遺跡", checked: true }],
      countryCheckBoxItems: [{ label: "中国", checked: true }],
      characteristicCheckBoxItems: [{ label: "歴史・文化的", checked: true }],
      riskLevelCheckBoxItems: [{ label: "1", checked: true }],
      monthCheckBoxItems: [{ label: "9月", checked: true }],
      bmiCheckBoxItems: [{ label: "4.0", checked: true }],
    },
  }),
}));

test("checkがついているcheckBoxItemsのラベルが取得できること", () => {
  const { checkedLabelObject } = useGetCheckedLabels();
  expect(checkedLabelObject).toEqual({
    categoryLabels: ["遺跡"],
    countryLabels: ["中国"],
    characteristicLabels: ["歴史・文化的"],
    riskLevelLabels: ["1"],
    monthLabels: ["9月"],
    bmiLabels: ["4.0"],
  });
});
