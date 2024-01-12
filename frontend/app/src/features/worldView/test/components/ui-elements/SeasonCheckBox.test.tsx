import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SeasonCheckBox from "features/worldView/components/ui-elements/SeasonCheckBox";
import { act } from "react-dom/test-utils";

const spyOnUseWorldViewListContext = jest.spyOn(
  jest.requireActual("providers/WorldViewListProvider"),
  "useWorldViewListContext"
);

const mockContextValue = {
  state: {
    monthCheckBoxItems: [
      { label: "1月", season: "冬", checked: false },
      { label: "2月", season: "冬", checked: false },
      { label: "3月", season: "春", checked: false },
      { label: "4月", season: "春", checked: false },
      { label: "5月", season: "春", checked: false },
      { label: "6月", season: "夏", checked: false },
      { label: "7月", season: "夏", checked: false },
      { label: "8月", season: "夏", checked: false },
      { label: "9月", season: "秋", checked: false },
      { label: "10月", season: "秋", checked: false },
      { label: "11月", season: "秋", checked: false },
      { label: "12月", season: "冬", checked: false },
    ],
    loadingSearchWorldViews: false,
  },
};

const mockContextValueChecked = {
  state: {
    ...mockContextValue.state,
    monthCheckBoxItems: [
      { label: "1月", season: "冬", checked: false },
      { label: "2月", season: "冬", checked: false },
      { label: "3月", season: "春", checked: true },
      { label: "4月", season: "春", checked: true },
      { label: "5月", season: "春", checked: true },
      { label: "6月", season: "夏", checked: false },
      { label: "7月", season: "夏", checked: false },
      { label: "8月", season: "夏", checked: false },
      { label: "9月", season: "秋", checked: false },
      { label: "10月", season: "秋", checked: false },
      { label: "11月", season: "秋", checked: false },
      { label: "12月", season: "冬", checked: false },
    ],
  },
};

const mockContextValueLoadingSearchWorldViews = {
  state: {
    ...mockContextValue.state,
    loadingSearchWorldViews: true,
  },
};

const mockHandleChangeSeason = jest.fn();
const mockHandleChangeMonth = jest.fn();
jest.mock("features/worldView/hooks/filter/useSeasonHandleChange", () => ({
  __esModule: true,
  default: () => ({
    handleChangeSeason: mockHandleChangeSeason,
    handleChangeMonth: mockHandleChangeMonth,
  }),
}));

test("CheckBoxがレンダリングされていること", () => {
  spyOnUseWorldViewListContext.mockImplementation(() => mockContextValue);
  render(<SeasonCheckBox />);
  expect(screen.getByRole("checkbox", { name: "春" })).toBeInTheDocument();
  expect(screen.getByRole("checkbox", { name: "3月" })).toBeInTheDocument();
  expect(screen.getByRole("checkbox", { name: "4月" })).toBeInTheDocument();
  expect(screen.getByRole("checkbox", { name: "5月" })).toBeInTheDocument();
});

test("monthCheckBoxItemsのcheckedがfalseの場合、CheckBoxがチェックされていないこと", () => {
  spyOnUseWorldViewListContext.mockImplementation(() => mockContextValue);
  render(<SeasonCheckBox />);
  expect(screen.getByRole("checkbox", { name: "春" })).not.toBeChecked();
  expect(screen.getByRole("checkbox", { name: "3月" })).not.toBeChecked();
  expect(screen.getByRole("checkbox", { name: "4月" })).not.toBeChecked();
  expect(screen.getByRole("checkbox", { name: "5月" })).not.toBeChecked();
});

test("monthCheckBoxItemsのcheckedがtrueの場合、CheckBoxがチェックされていること", () => {
  spyOnUseWorldViewListContext.mockImplementation(() => mockContextValueChecked);
  render(<SeasonCheckBox />);
  expect(screen.getByRole("checkbox", { name: "3月" })).toBeChecked();
  expect(screen.getByRole("checkbox", { name: "4月" })).toBeChecked();
  expect(screen.getByRole("checkbox", { name: "5月" })).toBeChecked();
});

test("月のCheckboxが全てチェックされている場合、季節のCheckboxがチェックされていること", () => {
  spyOnUseWorldViewListContext.mockImplementation(() => mockContextValueChecked);
  render(<SeasonCheckBox />);
  expect(screen.getByRole("checkbox", { name: "春" })).toBeChecked();
});

test("loadingSearchWorldViewsがfalseの場合、CheckBoxが有効になっていること", () => {
  spyOnUseWorldViewListContext.mockImplementation(() => mockContextValue);
  render(<SeasonCheckBox />);
  expect(screen.getByRole("checkbox", { name: "春" })).not.toBeDisabled();
  expect(screen.getByRole("checkbox", { name: "3月" })).not.toBeDisabled();
  expect(screen.getByRole("checkbox", { name: "4月" })).not.toBeDisabled();
  expect(screen.getByRole("checkbox", { name: "5月" })).not.toBeDisabled();
});

test("loadingSearchWorldViewsがtrueの場合、CheckBoxがdisabledになっていること", () => {
  spyOnUseWorldViewListContext.mockImplementation(() => mockContextValueLoadingSearchWorldViews);
  render(<SeasonCheckBox />);
  expect(screen.getByRole("checkbox", { name: "春" })).toBeDisabled();
  expect(screen.getByRole("checkbox", { name: "3月" })).toBeDisabled();
  expect(screen.getByRole("checkbox", { name: "4月" })).toBeDisabled();
  expect(screen.getByRole("checkbox", { name: "5月" })).toBeDisabled();
});

test("季節のCheckbox押下でhandleChangeSeason関数が実行されること", async () => {
  spyOnUseWorldViewListContext.mockImplementation(() => mockContextValue);
  const user = userEvent.setup();
  render(<SeasonCheckBox />);
  await act(async () => {
    await user.click(screen.getByRole("checkbox", { name: "春" }));
  });
  expect(mockHandleChangeSeason).toHaveBeenCalledTimes(1);
});

test("月のCheckbox押下でhandleChangeMonth関数が実行されること", async () => {
  spyOnUseWorldViewListContext.mockImplementation(() => mockContextValue);
  const user = userEvent.setup();
  render(<SeasonCheckBox />);
  await act(async () => {
    await user.click(screen.getByRole("checkbox", { name: "3月" }));
  });
  expect(mockHandleChangeMonth).toHaveBeenCalledTimes(1);
});
