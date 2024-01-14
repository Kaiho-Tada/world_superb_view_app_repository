import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CharacteristicCheckBox from "features/worldView/components/ui-elements/CharacteristicCheckBox";
import { act } from "react-dom/test-utils";

const spyOnUseWorldViewListContext = jest.spyOn(
  jest.requireActual("providers/WorldViewListProvider"),
  "useWorldViewListContext"
);

const mockDispatch = jest.fn();
const mockContextValue = {
  dispatch: mockDispatch,
  state: {
    loadingSearchWorldViews: false,
    loadingCharacteristicCheckBoxItems: false,
    characteristicCheckBoxItems: [
      {
        label: "雄大",
        checked: false,
      },
    ],
  },
};

const mockContextValueChecked = {
  state: {
    ...mockContextValue.state,
    characteristicCheckBoxItems: [
      {
        label: "雄大",
        checked: true,
      },
    ],
  },
};

const mockContextValueLoadingSearchWorldViews = {
  state: {
    ...mockContextValue.state,
    loadingSearchWorldViews: true,
  },
};

const mockContextValueLoadingCharacteristicCheckBoxItems = {
  state: {
    ...mockContextValue.state,
    loadingCharacteristicCheckBoxItems: true,
  },
};

test("CheckBoxがレンダリングされていること", () => {
  spyOnUseWorldViewListContext.mockImplementation(() => mockContextValue);
  render(<CharacteristicCheckBox />);
  expect(screen.getByRole("checkbox", { name: "雄大" })).toBeInTheDocument();
});

test("characteristicCheckBoxItemsのcheckedがtrueの場合、CheckBoxがチェックされていること", () => {
  spyOnUseWorldViewListContext.mockImplementation(() => mockContextValueChecked);
  render(<CharacteristicCheckBox />);
  expect(screen.getByRole("checkbox", { name: "雄大" })).toBeChecked();
});

test("loadingSearchWorldViewsがtrueの場合、CheckBoxがdisabledになっていること", () => {
  spyOnUseWorldViewListContext.mockImplementation(() => mockContextValueLoadingSearchWorldViews);
  render(<CharacteristicCheckBox />);
  expect(screen.getByRole("checkbox", { name: "雄大" })).toBeDisabled();
});

test("loadingCharacteristicCheckBoxItemsがtrueの場合、スピナーが表示されていること", () => {
  spyOnUseWorldViewListContext.mockImplementation(
    () => mockContextValueLoadingCharacteristicCheckBoxItems
  );
  render(<CharacteristicCheckBox />);
  expect(screen.getByRole("status", { name: "読み込み中" })).toBeInTheDocument();
});

test("checkbox押下でhandleChangeCheckBox関数内でdispatchが実行されること", async () => {
  spyOnUseWorldViewListContext.mockImplementation(() => mockContextValue);
  const user = userEvent.setup();
  render(<CharacteristicCheckBox />);
  const CheckBox = screen.getByRole("checkbox", { name: "雄大" });
  await act(async () => {
    await user.click(CheckBox);
  });

  expect(mockDispatch).toHaveBeenCalledWith({
    type: "SET_CHARACTERISTIC_CHECKBOX_ITEMS",
    payload: expect.any(Array),
  });

  expect(mockDispatch).toHaveBeenCalledWith({
    type: "SET_CHECKED_CHARACTERISTIC_LABELS",
    payload: expect.any(Array),
  });
});

test("checkbox押下でhandleChangeCheckBox関数が実行されること", async () => {
  spyOnUseWorldViewListContext.mockImplementation(() => mockContextValue);

  const spyOnUseHandleChangeCheckBox = jest.spyOn(
    jest.requireActual("features/worldView/hooks/useHandleChangeCheckBox"),
    "default"
  );
  const mockHandleChangeCheckBox = jest.fn();
  spyOnUseHandleChangeCheckBox.mockImplementation(() => ({
    handleChangeCheckBox: mockHandleChangeCheckBox,
  }));

  const user = userEvent.setup();
  render(<CharacteristicCheckBox />);
  const CheckBox = screen.getByRole("checkbox", { name: "雄大" });
  await act(async () => {
    await user.click(CheckBox);
  });

  expect(mockHandleChangeCheckBox).toHaveBeenCalledWith(
    expect.objectContaining({
      e: expect.objectContaining({ target: expect.objectContaining({ value: "雄大" }) }),
      checkBoxItems: [{ label: "雄大", checked: false }],
      checkBoxItemsDispatch: expect.any(Function),
      checkedLabelsDispatch: expect.any(Function),
    })
  );
});
