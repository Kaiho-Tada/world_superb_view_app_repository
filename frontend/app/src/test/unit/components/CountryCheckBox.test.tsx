import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CountryCheckBox from "components/molecules/CountryCheckBox";
import { act } from "react-dom/test-utils";

const spyOnUseSuperbViewListContext = jest.spyOn(
  jest.requireActual("hooks/providers/SuperbViewListProvider"),
  "useSuperbViewListContext"
);

const mockContextValue = {
  loadingSearchSuperbViews: false,
  loadingCountryCheckBoxItems: false,
  countryCheckBoxItems: [
    {
      label: "アメリカ",
      stateName: "北アメリカ",
      superbViewNames: ["superbView1", "superbView2"],
      checked: false,
    },
  ],
};

const mockContextValueCheckedTrue = {
  ...mockContextValue,
  countryCheckBoxItems: [
    {
      label: "アメリカ",
      stateName: "北アメリカ",
      superbViewNames: ["superbView1", "superbView2"],
      checked: true,
    },
  ],
};

const mockContextValueLoadingSearchSuperbViews = {
  ...mockContextValue,
  loadingSearchSuperbViews: true,
};

const mockContextValueLoadingCountryCheckBoxItems = {
  ...mockContextValue,
  loadingCountryCheckBoxItems: true,
};

const mockHandleChangeCountry = jest.fn();
jest.mock("hooks/api/country/useCountryHandleChange", () => ({
  __esModule: true,
  default: () => ({ handleChangeCountry: mockHandleChangeCountry }),
}));

test("CheckBoxがレンダリングされていること", () => {
  spyOnUseSuperbViewListContext.mockImplementation(() => mockContextValue);
  render(<CountryCheckBox countryState="北アメリカ" />);
  expect(screen.getByRole("checkbox", { name: "アメリカ" })).toBeInTheDocument();
  expect(screen.getByRole("checkbox", { name: "アメリカ" })).not.toBeChecked();
  expect(screen.getByRole("checkbox", { name: "アメリカ" })).not.toBeDisabled();
});

test("categoriesWithCheckBoxDataのcheckedがtrueの場合、CheckBoxがチェックされていること", () => {
  spyOnUseSuperbViewListContext.mockImplementation(() => mockContextValueCheckedTrue);
  render(<CountryCheckBox countryState="北アメリカ" />);
  expect(screen.getByRole("checkbox", { name: "アメリカ" })).toBeChecked();
});

test("loadingSearchSuperbViewsがtureの場合、CheckBoxがdisabledになっていること", () => {
  spyOnUseSuperbViewListContext.mockImplementation(() => mockContextValueLoadingSearchSuperbViews);
  render(<CountryCheckBox countryState="北アメリカ" />);
  expect(screen.getByRole("checkbox", { name: "アメリカ" })).toBeDisabled();
});

test("loadingCategoriesWithCheckBoxDataがtrueの場合、スピナーが表示されていること", () => {
  spyOnUseSuperbViewListContext.mockImplementation(
    () => mockContextValueLoadingCountryCheckBoxItems
  );
  render(<CountryCheckBox countryState="北アメリカ" />);
  expect(screen.getByRole("status", { name: "読み込み中" })).toBeInTheDocument();
});

test("countriesWithCheckBoxDataのstateNameとpropsで渡されたcountryStateの値が異なる場合、レンダリングされないこと", () => {
  spyOnUseSuperbViewListContext.mockImplementation(() => mockContextValue);
  render(<CountryCheckBox countryState="アジア" />);
  expect(screen.queryByRole("checkbox", { name: "アメリカ" })).not.toBeInTheDocument();
});

test("CheckBox押下でhandleChangeCountry関数が実行されること", async () => {
  spyOnUseSuperbViewListContext.mockImplementation(() => mockContextValue);
  const user = userEvent.setup();
  render(<CountryCheckBox countryState="北アメリカ" />);
  const CheckBox = screen.getByRole("checkbox", { name: "アメリカ" });
  await act(async () => {
    await user.click(CheckBox);
  });
  expect(mockHandleChangeCountry).toHaveBeenCalledTimes(1);
});
