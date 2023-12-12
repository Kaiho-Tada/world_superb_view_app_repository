import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CharacteristicCheckBox from "components/molecules/CharacteristicCheckBox";
import { act } from "react-dom/test-utils";

const spyOnUseSuperbViewListContext = jest.spyOn(
  jest.requireActual("hooks/providers/SuperbViewListProvider"),
  "useSuperbViewListContext"
);

const mockContextValue = {
  loadingSearchSuperbViews: false,
  loadingCharacteristicCheckBoxItems: false,
  characteristicCheckBoxItems: [
    {
      label: "雄大",
      superbViewNames: ["superbView1", "superbView2"],
      checked: false,
    },
  ],
};

const mockContextValueCheckedTrue = {
  ...mockContextValue,
  characteristicCheckBoxItems: [
    {
      label: "雄大",
      superbViewNames: ["superbView1", "superbView2"],
      checked: true,
    },
  ],
};

const mockContextValueLoadingSearchSuperbViews = {
  ...mockContextValue,
  loadingSearchSuperbViews: true,
};

const mockContextValueLoadingCharacteristicCheckBoxItems = {
  ...mockContextValue,
  loadingCharacteristicCheckBoxItems: true,
};

const mockHandleChangeCharacteristic = jest.fn();
jest.mock("hooks/api/characteristic/useCharacteristicHandleChange", () => ({
  __esModule: true,
  default: () => ({ handleChangeCharacteristic: mockHandleChangeCharacteristic }),
}));

test("CheckBoxがレンダリングされていること", () => {
  spyOnUseSuperbViewListContext.mockImplementation(() => mockContextValue);
  render(<CharacteristicCheckBox />);
  expect(screen.getByRole("checkbox", { name: "雄大" })).toBeInTheDocument();
});

test("characteristicCheckBoxItemsのcheckedがtrueの場合、CheckBoxがチェックされていること", () => {
  spyOnUseSuperbViewListContext.mockImplementation(() => mockContextValueCheckedTrue);
  render(<CharacteristicCheckBox />);
  expect(screen.getByRole("checkbox", { name: "雄大" })).toBeChecked();
});

test("loadingSearchSuperbViewsがtrueの場合、CheckBoxがdisabledになっていること", () => {
  spyOnUseSuperbViewListContext.mockImplementation(() => mockContextValueLoadingSearchSuperbViews);
  render(<CharacteristicCheckBox />);
  expect(screen.getByRole("checkbox", { name: "雄大" })).toBeDisabled();
});

test("loadingCharacteristicCheckBoxItemsがtrueの場合、スピナーが表示されていること", () => {
  spyOnUseSuperbViewListContext.mockImplementation(
    () => mockContextValueLoadingCharacteristicCheckBoxItems
  );
  render(<CharacteristicCheckBox />);
  expect(screen.getByRole("status", { name: "読み込み中" })).toBeInTheDocument();
});

test("CheckBox押下でhandleChangeCharacteristic関数が実行されること", async () => {
  spyOnUseSuperbViewListContext.mockImplementation(() => mockContextValue);
  const user = userEvent.setup();
  render(<CharacteristicCheckBox />);
  const CheckBox = screen.getByRole("checkbox", { name: "雄大" });
  await act(async () => {
    await user.click(CheckBox);
  });
  expect(mockHandleChangeCharacteristic).toHaveBeenCalledTimes(1);
});
