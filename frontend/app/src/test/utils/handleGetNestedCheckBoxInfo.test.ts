import handleGetNestedCheckBoxInfo from "utils/handleGetNestedCheckBoxInfo";

const checkBoxItemsNotChecked = [
  { label: "ラベル1", parentLabel: "親ラベル", checked: false, isVisible: false },
  { label: "ラベル2", parentLabel: "親ラベル", checked: false, isVisible: false },
];

const checkBoxItemsPartialChecked = [
  { label: "ラベル1", parentLabel: "親ラベル", checked: true, isVisible: false },
  { label: "ラベル2", parentLabel: "親ラベル", checked: false, isVisible: false },
];

const checkBoxItemsAllChecked = [
  { label: "ラベル1", parentLabel: "親ラベル", checked: true, isVisible: false },
  { label: "ラベル2", parentLabel: "親ラベル", checked: true, isVisible: false },
];

describe("allCheckedのテスト", () => {
  test("同じparentLabelプロパティを持つ全てのcheckBoxItemsのcheckedがfalseである場合、allCheckedはfalseであること", () => {
    const checkBoxInfo = handleGetNestedCheckBoxInfo({
      checkBoxItems: checkBoxItemsNotChecked,
    });
    expect(checkBoxInfo[0].allChecked).toBe(false);
  });

  test("同じparentLabelプロパティを持つ一部のcheckBoxItemsのcheckedがtrueである場合、allCheckedはfalseであること", () => {
    const checkBoxInfo = handleGetNestedCheckBoxInfo({
      checkBoxItems: checkBoxItemsPartialChecked,
    });
    expect(checkBoxInfo[0].allChecked).toBe(false);
  });

  test("同じparentLabelプロパティを持つ全てのcheckBoxItemsのcheckedがtrueである場合、allCheckedはtrueであること", () => {
    const checkBoxInfo = handleGetNestedCheckBoxInfo({
      checkBoxItems: checkBoxItemsAllChecked,
    });
    expect(checkBoxInfo[0].allChecked).toBe(true);
  });
});

describe("isIndeterminateのテスト", () => {
  test("同じparentLabelプロパティを持つ全てのcheckBoxItemsのcheckedがfalseである場合、isIndeterminateはfalseであること", () => {
    const checkBoxInfo = handleGetNestedCheckBoxInfo({
      checkBoxItems: checkBoxItemsNotChecked,
    });
    expect(checkBoxInfo[0].isIndeterminate).toBe(false);
  });

  test("同じparentLabelプロパティを持つcheckBoxItemsの一部のcheckedがtrueである場合、isIndeterminateはtrueであること", () => {
    const checkBoxInfo = handleGetNestedCheckBoxInfo({
      checkBoxItems: checkBoxItemsPartialChecked,
    });
    expect(checkBoxInfo[0].isIndeterminate).toBe(true);
  });

  test("同じparentLabelプロパティを持つ全てのcheckBoxItemsのcheckedがtrueである場合、isIndeterminateはfalseであること", () => {
    const checkBoxInfo = handleGetNestedCheckBoxInfo({
      checkBoxItems: checkBoxItemsAllChecked,
    });
    expect(checkBoxInfo[0].isIndeterminate).toBe(false);
  });
});

describe("allVisibledのテスト", () => {
  const checkBoxItemsAllVisibed = [
    { label: "ラベル1", parentLabel: "親ラベル", checked: false, isVisible: true },
    { label: "ラベル2", parentLabel: "親ラベル", checked: false, isVisible: true },
  ];
  const checkBoxItemsNotAllVisibed = [
    { label: "ラベル1", parentLabel: "親ラベル", checked: false, isVisible: false },
    { label: "ラベル2", parentLabel: "親ラベル", checked: false, isVisible: false },
  ];
  test("同じparentLabelプロパティを持つ全てのcheckBoxItemsのisVisibleがtrueである場合、allVisibledはtrueであること", () => {
    const checkBoxInfo = handleGetNestedCheckBoxInfo({
      checkBoxItems: checkBoxItemsAllVisibed,
    });
    expect(checkBoxInfo[0].allVisible).toBe(true);
  });

  test("同じparentLabelプロパティを持つ全てのcheckBoxItemsのisVisibleがtrueでない場合、allVisibledはfalseであること", () => {
    const checkBoxInfo = handleGetNestedCheckBoxInfo({
      checkBoxItems: checkBoxItemsNotAllVisibed,
    });
    expect(checkBoxInfo[0].allVisible).toBe(false);
  });
});

describe("parentLabelのテスト", () => {
  test("checkBoxItemsのparentLabelの値がparentLabelプロパティで取得できること", () => {
    const checkBoxInfo = handleGetNestedCheckBoxInfo({
      checkBoxItems: [
        { label: "ラベルA", parentLabel: "親ラベルA", checked: false, isVisible: false },
        { label: "ラベルB", parentLabel: "親ラベルB", checked: false, isVisible: false },
      ],
    });
    expect(checkBoxInfo[0].parentLabel).toBe("親ラベルA");
    expect(checkBoxInfo[1].parentLabel).toBe("親ラベルB");
  });
});
