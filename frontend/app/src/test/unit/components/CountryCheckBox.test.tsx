import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CountryCheckBox from "components/molecules/CountryCheckBox";
import { act } from "react-dom/test-utils";

const spyOnUseWorldViewListContext = jest.spyOn(
  jest.requireActual("hooks/providers/WorldViewListProvider"),
  "useWorldViewListContext"
);

const mockContextValue = {
  loadingSearchWorldViews: false,
  loadingCountryCheckBoxItems: false,
  countryCheckBoxItems: [
    {
      label: "アメリカ",
      stateName: "北米",
      checked: false,
    },
    {
      label: "カナダ",
      stateName: "北米",
      checked: false,
    },
  ],
};

const mockContextValueCheckedTrue = {
  ...mockContextValue,
  countryCheckBoxItems: [
    {
      label: "アメリカ",
      stateName: "北米",
      checked: true,
    },
    {
      label: "カナダ",
      stateName: "北米",
      checked: true,
    },
  ],
};

const mockContextValueLoadingSearchWorldViews = {
  ...mockContextValue,
  loadingSearchWorldViews: true,
};

const mockContextValueLoadingCountryCheckBoxItems = {
  ...mockContextValue,
  loadingCountryCheckBoxItems: true,
};

const mockHandleChangeState = jest.fn();
const mockHandleChangeCountry = jest.fn();
jest.mock("hooks/api/country/useCountryHandleChange", () => ({
  __esModule: true,
  default: () => ({
    handleChangeState: mockHandleChangeState,
    handleChangeCountry: mockHandleChangeCountry,
  }),
}));

test("CheckBoxがレンダリングされていること", () => {
  spyOnUseWorldViewListContext.mockImplementation(() => mockContextValue);
  render(<CountryCheckBox />);
  expect(screen.getByRole("checkbox", { name: "北米" })).toBeInTheDocument();
  expect(screen.getByRole("checkbox", { name: "アメリカ" })).toBeInTheDocument();
  expect(screen.getByRole("checkbox", { name: "カナダ" })).toBeInTheDocument();
});

test("countryCheckBoxItemsのcheckedがfalseの場合、CheckBoxがチェックされていないこと", () => {
  spyOnUseWorldViewListContext.mockImplementation(() => mockContextValue);
  render(<CountryCheckBox />);
  expect(screen.getByRole("checkbox", { name: "北米" })).not.toBeChecked();
  expect(screen.getByRole("checkbox", { name: "アメリカ" })).not.toBeChecked();
  expect(screen.getByRole("checkbox", { name: "カナダ" })).not.toBeChecked();
});

test("countryCheckBoxItemsのcheckedがtrueの場合、CheckBoxがチェックされていること", () => {
  spyOnUseWorldViewListContext.mockImplementation(() => mockContextValueCheckedTrue);
  render(<CountryCheckBox />);
  expect(screen.getByRole("checkbox", { name: "アメリカ" })).toBeChecked();
  expect(screen.getByRole("checkbox", { name: "カナダ" })).toBeChecked();
});

test("国のCheckboxが全てチェックされている場合、州のCheckboxがチェックされていること", () => {
  spyOnUseWorldViewListContext.mockImplementation(() => mockContextValueCheckedTrue);
  render(<CountryCheckBox />);
  expect(screen.getByRole("checkbox", { name: "北米" })).toBeChecked();
});

test("loadingSearchWorldViewsがfalseの場合、CheckBoxが有効になっていること", () => {
  spyOnUseWorldViewListContext.mockImplementation(() => mockContextValue);
  render(<CountryCheckBox />);
  expect(screen.getByRole("checkbox", { name: "北米" })).not.toBeDisabled();
  expect(screen.getByRole("checkbox", { name: "アメリカ" })).not.toBeDisabled();
  expect(screen.getByRole("checkbox", { name: "カナダ" })).not.toBeDisabled();
});

test("loadingSearchWorldViewsがtrueの場合、CheckBoxがdisabledになっていること", () => {
  spyOnUseWorldViewListContext.mockImplementation(() => mockContextValueLoadingSearchWorldViews);
  render(<CountryCheckBox />);
  expect(screen.getByRole("checkbox", { name: "アメリカ" })).toBeDisabled();
});

test("loadingCountryCheckBoxItemsがtrueの場合、スピナーが表示されていること", () => {
  spyOnUseWorldViewListContext.mockImplementation(
    () => mockContextValueLoadingCountryCheckBoxItems
  );
  render(<CountryCheckBox />);
  expect(screen.getByRole("status", { name: "読み込み中" })).toBeInTheDocument();
});

test("州のCheckBox押下でhandleChangeState関数が実行されること", async () => {
  spyOnUseWorldViewListContext.mockImplementation(() => mockContextValue);
  const user = userEvent.setup();
  render(<CountryCheckBox />);
  const CheckBox = screen.getByRole("checkbox", { name: "北米" });
  await act(async () => {
    await user.click(CheckBox);
  });
  expect(mockHandleChangeState).toHaveBeenCalledTimes(1);
});

test("国のCheckBox押下でhandleChangeCountry関数が実行されること", async () => {
  spyOnUseWorldViewListContext.mockImplementation(() => mockContextValue);
  const user = userEvent.setup();
  render(<CountryCheckBox />);
  const CheckBox = screen.getByRole("checkbox", { name: "アメリカ" });
  await act(async () => {
    await user.click(CheckBox);
  });
  expect(mockHandleChangeCountry).toHaveBeenCalledTimes(1);
});
