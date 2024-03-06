import handleClearCheckItem from "utils/handleClearCheckItem";

const mockCheckItemsDispatch = jest.fn();
test("引数のcheckItemsがクリアされること", () => {
  handleClearCheckItem({
    checkItems: [{ label: "ラベル", checked: true }],
    checkItemsDispatch: mockCheckItemsDispatch,
  });
  expect(mockCheckItemsDispatch).toHaveBeenCalledWith([{ label: "ラベル", checked: false }]);
});
