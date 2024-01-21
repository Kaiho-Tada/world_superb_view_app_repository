import handleClearCheckBox from "utils/handleClearCheckBox";

const mockCheckBoxItemsDispatch = jest.fn();
test("引数のcheckBoxItemsがクリアされること", () => {
  handleClearCheckBox({
    checkBoxItems: [{ label: "ラベル", checked: true }],
    checkBoxItemsDispatch: mockCheckBoxItemsDispatch,
  });
  expect(mockCheckBoxItemsDispatch).toHaveBeenCalledWith([{ label: "ラベル", checked: false }]);
});
