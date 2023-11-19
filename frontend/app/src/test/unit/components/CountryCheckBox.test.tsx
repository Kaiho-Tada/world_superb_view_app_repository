import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CountryCheckBox from "components/molecules/CountryCheckBox";
import { act } from "react-dom/test-utils";

jest.mock("hooks/providers/SuperbViewListProvider", () => ({
  ...jest.requireActual("hooks/providers/SuperbViewListProvider"),
  useSuperbViewListContext: () => ({
    loadingSearchSuperbViews: false,
    getAllCountriesWithCheckBoxData: jest.fn(),
    loadingCountriesWithCheckBoxData: false,
    countriesWithCheckBoxData: [
      {
        label: "アメリカ",
        stateName: "北アメリカ",
        superbViewNames: ["superbView1", "superbView2"],
        checked: false,
      },
    ],
  }),
}));
const mockHandleChange = jest.fn();
jest.mock("hooks/api/country/useCountryCheckBoxHandleChange", () => ({
  __esModule: true,
  default: () => ({ handleChange: mockHandleChange }),
}));

test("CheckBoxがレンダリングされていること", () => {
  render(<CountryCheckBox countryState="北アメリカ" />);
  expect(screen.getByRole("checkbox", { name: "アメリカ" })).toBeInTheDocument();
});

test("countriesWithCheckBoxDataのstateNameとpropsで渡されたcountryStateの値が異なる場合、レンダリングされないこと", () => {
  render(<CountryCheckBox countryState="アジア" />);
  expect(screen.queryByRole("checkbox", { name: "アメリカ" })).not.toBeInTheDocument();
});

test("CheckBox押下でhandleChange関数が実行されること", async () => {
  const user = userEvent.setup();
  render(<CountryCheckBox countryState="北アメリカ" />);
  const CheckBox = screen.getByRole("checkbox", { name: "アメリカ" });
  await act(async () => {
    await user.click(CheckBox);
  });
  expect(mockHandleChange).toHaveBeenCalledTimes(1);
});
