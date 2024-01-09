import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import RiskLevelCheckBox from "features/worldView/components/ui-elements/RiskLevelCheckBox";
import { act } from "react-dom/test-utils";

const spyOnUseWorldViewListContext = jest.spyOn(
  jest.requireActual("providers/WorldViewListProvider"),
  "useWorldViewListContext"
);

const mockContextValue = {
  state: {
    riskLevelCheckBoxItems: [
      {
        label: "4",
        checked: false,
      },
    ],
    loadingSearchWorldViews: false,
  },
};

const mockContextValueChecked = {
  state: {
    ...mockContextValue.state,
    riskLevelCheckBoxItems: [
      {
        label: "4",
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

const mockHandleChangeRiskLevel = jest.fn();
jest.mock("features/worldView/hooks/filter/useRiskLevelHandleChange", () => ({
  __esModule: true,
  default: () => ({ handleChangeRiskLevel: mockHandleChangeRiskLevel }),
}));

test("checkboxがレンダリングされていること", () => {
  spyOnUseWorldViewListContext.mockImplementation(() => mockContextValue);
  render(<RiskLevelCheckBox />);
  expect(screen.getByRole("checkbox", { name: "リスクレベル4" })).toBeInTheDocument();
  const riskLevelImg = screen.getAllByRole("img", { name: "リスクレベル" });
  expect(riskLevelImg.length).toBe(4);
  expect(screen.getByRole("checkbox", { name: "リスクレベル4" })).not.toBeChecked();
  expect(screen.getByRole("checkbox", { name: "リスクレベル4" })).not.toBeDisabled();
});

test("riskLevelCheckBoxItemsのcheckedがtrueの場合、CheckBoxがチェックされていること", () => {
  spyOnUseWorldViewListContext.mockImplementation(() => mockContextValueChecked);
  render(<RiskLevelCheckBox />);
  expect(screen.getByRole("checkbox", { name: "リスクレベル4" })).toBeChecked();
});

test("loadingSearchWorldViewsがtrueの場合、CheckBoxがdisabledになっていること", () => {
  spyOnUseWorldViewListContext.mockImplementation(() => mockContextValueLoadingSearchWorldViews);
  render(<RiskLevelCheckBox />);
  expect(screen.getByRole("checkbox", { name: "リスクレベル4" })).toBeDisabled();
});

test("CheckBox押下でhandleChangeRiskLevel関数が実行されること", async () => {
  spyOnUseWorldViewListContext.mockImplementation(() => mockContextValue);
  const user = userEvent.setup();
  render(<RiskLevelCheckBox />);
  const checkbox = screen.getByRole("checkbox", { name: "リスクレベル4" });
  await act(async () => {
    await user.click(checkbox);
  });
  expect(mockHandleChangeRiskLevel).toHaveBeenCalledTimes(1);
});
