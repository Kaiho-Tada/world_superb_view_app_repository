import handleGetNestedCheckBoxInfo from "utils/handleGetNestedCheckBoxInfo";

const checkBoxItemsNotChecked = [
  { label: "ラベル1", parentLabel: "親ラベル", checked: false },
  { label: "ラベル2", parentLabel: "親ラベル", checked: false },
];

const checkBoxItemsPartialChecked = [
  { label: "ラベル1", parentLabel: "親ラベル", checked: true },
  { label: "ラベル2", parentLabel: "親ラベル", checked: false },
];

const checkBoxItemsAllChecked = [
  { label: "ラベル1", parentLabel: "親ラベル", checked: true },
  { label: "ラベル2", parentLabel: "親ラベル", checked: true },
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

describe("parentLabelのテスト", () => {
  test("checkBoxItemsのparentLabelの値がparentLabelプロパティで取得できること", () => {
    const checkBoxInfo = handleGetNestedCheckBoxInfo({
      checkBoxItems: [
        { label: "ラベルA", parentLabel: "親ラベルA", checked: false },
        { label: "ラベルB", parentLabel: "親ラベルB", checked: false },
      ],
    });
    expect(checkBoxInfo[0].parentLabel).toBe("親ラベルA");
    expect(checkBoxInfo[1].parentLabel).toBe("親ラベルB");
  });
});
