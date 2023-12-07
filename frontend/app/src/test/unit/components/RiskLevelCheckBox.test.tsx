import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import RiskLevelCheckBox from "components/molecules/RiskLevelCheckBox";
import { act } from "react-dom/test-utils";

const spyOnUseSuperbViewListContext = jest.spyOn(
  jest.requireActual("hooks/providers/SuperbViewListProvider"),
  "useSuperbViewListContext"
);

const mockContextValue = {
  riskLevels: [
    {
      label: "4",
      checked: false,
    },
  ],
  loadingSearchSuperbViews: false,
};

const mockContextValueCheckedTrue = {
  ...mockContextValue,
  riskLevels: [
    {
      label: "4",
      checked: true,
    },
  ],
};

const mockContextValueLoadingSearchSuperbViews = {
  ...mockContextValue,
  loadingSearchSuperbViews: true,
};

const mockHandleChangeRiskLevel = jest.fn();
jest.mock("hooks/api/riskLevel/useRiskLevelHandleChange", () => ({
  __esModule: true,
  default: () => ({ handleChangeRiskLevel: mockHandleChangeRiskLevel }),
}));

test("checkboxがレンダリングされていること", () => {
  spyOnUseSuperbViewListContext.mockImplementation(() => mockContextValue);
  render(<RiskLevelCheckBox />);
  expect(screen.getByRole("checkbox", { name: "リスクレベル4" })).toBeInTheDocument();
  const riskLevelImg = screen.getAllByRole("img", { name: "リスクレベル" });
  expect(riskLevelImg.length).toBe(4);
  expect(screen.getByRole("checkbox", { name: "リスクレベル4" })).not.toBeChecked();
  expect(screen.getByRole("checkbox", { name: "リスクレベル4" })).not.toBeDisabled();
});

test("riskLevelsのcheckedがtrueの場合、CheckBoxがチェックされていること", () => {
  spyOnUseSuperbViewListContext.mockImplementation(() => mockContextValueCheckedTrue);
  render(<RiskLevelCheckBox />);
  expect(screen.getByRole("checkbox", { name: "リスクレベル4" })).toBeChecked();
});

test("loadingSearchSuperbViewsがtureの場合、CheckBoxがdisabledになっていること", () => {
  spyOnUseSuperbViewListContext.mockImplementation(() => mockContextValueLoadingSearchSuperbViews);
  render(<RiskLevelCheckBox />);
  expect(screen.getByRole("checkbox", { name: "リスクレベル4" })).toBeDisabled();
});

test("CheckBox押下でhandleChangeRiskLevel関数が実行されること", async () => {
  spyOnUseSuperbViewListContext.mockImplementation(() => mockContextValue);
  const user = userEvent.setup();
  render(<RiskLevelCheckBox />);
  const checkbox = screen.getByRole("checkbox", { name: "リスクレベル4" });
  await act(async () => {
    await user.click(checkbox);
  });
  expect(mockHandleChangeRiskLevel).toHaveBeenCalledTimes(1);
});
