import handleGetNestedCheckItemInfo from "utils/handleGetNestedCheckItemInfo";

const checkItemsNotChecked = [
  { label: "ラベル1", parentLabel: "親ラベル", checked: false, isVisible: false },
  { label: "ラベル2", parentLabel: "親ラベル", checked: false, isVisible: false },
];

const checkItemsPartialChecked = [
  { label: "ラベル1", parentLabel: "親ラベル", checked: true, isVisible: false },
  { label: "ラベル2", parentLabel: "親ラベル", checked: false, isVisible: false },
];

const checkItemsAllChecked = [
  { label: "ラベル1", parentLabel: "親ラベル", checked: true, isVisible: false },
  { label: "ラベル2", parentLabel: "親ラベル", checked: true, isVisible: false },
];

describe("allCheckedのテスト", () => {
  test("同じparentLabelプロパティを持つ全てのcheckItemsのcheckedがfalseである場合、allCheckedはfalseであること", () => {
    const checkInfo = handleGetNestedCheckItemInfo({
      checkItems: checkItemsNotChecked,
    });
    expect(checkInfo[0].allChecked).toBe(false);
  });

  test("同じparentLabelプロパティを持つ一部のcheckItemsのcheckedがtrueである場合、allCheckedはfalseであること", () => {
    const checkInfo = handleGetNestedCheckItemInfo({
      checkItems: checkItemsPartialChecked,
    });
    expect(checkInfo[0].allChecked).toBe(false);
  });

  test("同じparentLabelプロパティを持つ全てのcheckItemsのcheckedがtrueである場合、allCheckedはtrueであること", () => {
    const checkInfo = handleGetNestedCheckItemInfo({
      checkItems: checkItemsAllChecked,
    });
    expect(checkInfo[0].allChecked).toBe(true);
  });
});

describe("isIndeterminateのテスト", () => {
  test("同じparentLabelプロパティを持つ全てのcheckItemsのcheckedがfalseである場合、isIndeterminateはfalseであること", () => {
    const checkInfo = handleGetNestedCheckItemInfo({
      checkItems: checkItemsNotChecked,
    });
    expect(checkInfo[0].isIndeterminate).toBe(false);
  });

  test("同じparentLabelプロパティを持つcheckItemsの一部のcheckedがtrueである場合、isIndeterminateはtrueであること", () => {
    const checkInfo = handleGetNestedCheckItemInfo({
      checkItems: checkItemsPartialChecked,
    });
    expect(checkInfo[0].isIndeterminate).toBe(true);
  });

  test("同じparentLabelプロパティを持つ全てのcheckItemsのcheckedがtrueである場合、isIndeterminateはfalseであること", () => {
    const checkInfo = handleGetNestedCheckItemInfo({
      checkItems: checkItemsAllChecked,
    });
    expect(checkInfo[0].isIndeterminate).toBe(false);
  });
});

describe("allVisibledのテスト", () => {
  const checkItemsAllVisibed = [
    { label: "ラベル1", parentLabel: "親ラベル", checked: false, isVisible: true },
    { label: "ラベル2", parentLabel: "親ラベル", checked: false, isVisible: true },
  ];
  const checkItemsNotAllVisibed = [
    { label: "ラベル1", parentLabel: "親ラベル", checked: false, isVisible: false },
    { label: "ラベル2", parentLabel: "親ラベル", checked: false, isVisible: false },
  ];
  test("同じparentLabelプロパティを持つ全てのcheckItemsのisVisibleがtrueである場合、allVisibledはtrueであること", () => {
    const checkInfo = handleGetNestedCheckItemInfo({
      checkItems: checkItemsAllVisibed,
    });
    expect(checkInfo[0].allVisible).toBe(true);
  });

  test("同じparentLabelプロパティを持つ全てのcheckItemsのisVisibleがtrueでない場合、allVisibledはfalseであること", () => {
    const checkInfo = handleGetNestedCheckItemInfo({
      checkItems: checkItemsNotAllVisibed,
    });
    expect(checkInfo[0].allVisible).toBe(false);
  });
});

describe("parentLabelのテスト", () => {
  test("checkItemsのparentLabelの値がparentLabelプロパティで取得できること", () => {
    const checkInfo = handleGetNestedCheckItemInfo({
      checkItems: [
        { label: "ラベルA", parentLabel: "親ラベルA", checked: false, isVisible: false },
        { label: "ラベルB", parentLabel: "親ラベルB", checked: false, isVisible: false },
      ],
    });
    expect(checkInfo[0].parentLabel).toBe("親ラベルA");
    expect(checkInfo[1].parentLabel).toBe("親ラベルB");
  });
});
