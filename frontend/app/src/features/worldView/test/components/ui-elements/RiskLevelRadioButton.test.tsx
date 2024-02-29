import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import RiskLevelRadioButton from "features/worldView/components/ui-elements/RiskLevelRadioButton";
import { useWorldViewListContext as mockUseWorldViewListContext } from "providers/WorldViewListProvider";
import { act } from "react-dom/test-utils";

jest.mock("providers/WorldViewListProvider", () => ({
  useWorldViewListContext: jest.fn(),
}));

const mockDispatch = jest.fn();
const mockContextValue = {
  dispatch: mockDispatch,
  state: {
    riskLevel: "4",
    loadingSearchWorldViews: false,
  },
};

const mockContextValueLoadingWorldView = {
  state: {
    ...mockContextValue.state,
    loadingSearchWorldViews: true,
  },
};

test("ラジオボタンがレンダリングされていること", () => {
  (mockUseWorldViewListContext as jest.Mock).mockReturnValue(mockContextValue);
  render(<RiskLevelRadioButton />);
  expect(screen.getAllByRole("radio").length).toBe(5);
});

test("ラジオボタンのvalueとriskLevelの値が一致する場合はラジオボタンがチェックされていること", () => {
  (mockUseWorldViewListContext as jest.Mock).mockReturnValue(mockContextValue);
  render(<RiskLevelRadioButton />);
  expect(screen.getByRole("radio", { name: "リスクレベル4のラジオボタン" })).toBeChecked();
  expect(screen.getByRole("radio", { name: "リスクレベル3のラジオボタン" })).not.toBeChecked();
  expect(screen.getByRole("radio", { name: "リスクレベル2のラジオボタン" })).not.toBeChecked();
  expect(screen.getByRole("radio", { name: "リスクレベル1のラジオボタン" })).not.toBeChecked();
  expect(screen.getByRole("radio", { name: "リスクレベル0のラジオボタン" })).not.toBeChecked();
});

test("loadingSearchWorldViewsがtrueの場合、ラジオボタンがdisabledになっていること", () => {
  (mockUseWorldViewListContext as jest.Mock).mockReturnValue(mockContextValueLoadingWorldView);
  render(<RiskLevelRadioButton />);
  expect(screen.getByRole("radio", { name: "リスクレベル4のラジオボタン" })).toBeDisabled();
  expect(screen.getByRole("radio", { name: "リスクレベル3のラジオボタン" })).toBeDisabled();
  expect(screen.getByRole("radio", { name: "リスクレベル2のラジオボタン" })).toBeDisabled();
  expect(screen.getByRole("radio", { name: "リスクレベル1のラジオボタン" })).toBeDisabled();
  expect(screen.getByRole("radio", { name: "リスクレベル0のラジオボタン" })).toBeDisabled();
});

test("ラジオボタン押下でriskLevelを更新するアクションがディスパッチされること", async () => {
  (mockUseWorldViewListContext as jest.Mock).mockReturnValue(mockContextValue);
  const user = userEvent.setup();
  render(<RiskLevelRadioButton />);
  await act(async () => {
    await user.click(screen.getByRole("radio", { name: "リスクレベル1のラジオボタン" }));
  });
  expect(mockDispatch).toHaveBeenCalledWith({ type: "SET_RISK_LEVEL", payload: "1" });
});
