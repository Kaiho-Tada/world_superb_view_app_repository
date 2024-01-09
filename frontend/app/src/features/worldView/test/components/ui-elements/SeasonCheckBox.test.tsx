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
    ],
    loadingSearchWorldViews: false,
  },
};

const mockContextValueChecked = {
  state: {
    ...mockContextValue.state,
    monthCheckBoxItems: [
      { label: "1月", season: "冬", checked: true },
      { label: "2月", season: "冬", checked: true },
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
  expect(screen.getByRole("checkbox", { name: "冬" })).toBeInTheDocument();
  expect(screen.getByRole("checkbox", { name: "1月" })).toBeInTheDocument();
  expect(screen.getByRole("checkbox", { name: "2月" })).toBeInTheDocument();
});

test("monthCheckBoxItemsのcheckedがfalseの場合、CheckBoxがチェックされていないこと", () => {
  spyOnUseWorldViewListContext.mockImplementation(() => mockContextValue);
  render(<SeasonCheckBox />);
  expect(screen.getByRole("checkbox", { name: "冬" })).not.toBeChecked();
  expect(screen.getByRole("checkbox", { name: "1月" })).not.toBeChecked();
  expect(screen.getByRole("checkbox", { name: "2月" })).not.toBeChecked();
});

test("monthCheckBoxItemsのcheckedがtrueの場合、CheckBoxがチェックされていること", () => {
  spyOnUseWorldViewListContext.mockImplementation(() => mockContextValueChecked);
  render(<SeasonCheckBox />);
  expect(screen.getByRole("checkbox", { name: "1月" })).toBeChecked();
  expect(screen.getByRole("checkbox", { name: "2月" })).toBeChecked();
});

test("月のCheckboxが全てチェックされている場合、季節のCheckboxがチェックされていること", () => {
  spyOnUseWorldViewListContext.mockImplementation(() => mockContextValueChecked);
  render(<SeasonCheckBox />);
  expect(screen.getByRole("checkbox", { name: "冬" })).toBeChecked();
});

test("loadingSearchWorldViewsがtrueの場合、CheckBoxがdisabledになっていること", () => {
  spyOnUseWorldViewListContext.mockImplementation(() => mockContextValueLoadingSearchWorldViews);
  render(<SeasonCheckBox />);
  expect(screen.getByRole("checkbox", { name: "冬" })).toBeDisabled();
  expect(screen.getByRole("checkbox", { name: "1月" })).toBeDisabled();
});

test("季節のCheckbox押下でhandleChangeSeason関数が実行されること", async () => {
  spyOnUseWorldViewListContext.mockImplementation(() => mockContextValue);
  const user = userEvent.setup();
  render(<SeasonCheckBox />);
  await act(async () => {
    await user.click(screen.getByRole("checkbox", { name: "冬" }));
  });
  expect(mockHandleChangeSeason).toHaveBeenCalledTimes(1);
});

test("月のCheckbox押下でhandleChangeMonth関数が実行されること", async () => {
  spyOnUseWorldViewListContext.mockImplementation(() => mockContextValue);
  const user = userEvent.setup();
  render(<SeasonCheckBox />);
  await act(async () => {
    await user.click(screen.getByRole("checkbox", { name: "1月" }));
  });
  expect(mockHandleChangeMonth).toHaveBeenCalledTimes(1);
});
