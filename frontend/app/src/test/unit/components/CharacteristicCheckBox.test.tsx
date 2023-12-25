import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CharacteristicCheckBox from "components/molecules/CharacteristicCheckBox";
import { act } from "react-dom/test-utils";

const spyOnUseWorldViewListContext = jest.spyOn(
  jest.requireActual("hooks/providers/WorldViewListProvider"),
  "useWorldViewListContext"
);

const mockContextValue = {
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

const mockHandleChangeCharacteristic = jest.fn();
jest.mock("hooks/characteristic/useCharacteristicHandleChange", () => ({
  __esModule: true,
  default: () => ({ handleChangeCharacteristic: mockHandleChangeCharacteristic }),
}));

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

test("CheckBox押下でhandleChangeCharacteristic関数が実行されること", async () => {
  spyOnUseWorldViewListContext.mockImplementation(() => mockContextValue);
  const user = userEvent.setup();
  render(<CharacteristicCheckBox />);
  const CheckBox = screen.getByRole("checkbox", { name: "雄大" });
  await act(async () => {
    await user.click(CheckBox);
  });
  expect(mockHandleChangeCharacteristic).toHaveBeenCalledTimes(1);
});
