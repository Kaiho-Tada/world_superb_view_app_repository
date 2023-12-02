import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import RiskLevelCheckBox from "components/molecules/RiskLevelCheckBox";
import { act } from "react-dom/test-utils";

jest.mock("hooks/providers/SuperbViewListProvider", () => ({
  ...jest.requireActual("hooks/providers/SuperbViewListProvider"),
  useSuperbViewListContext: () => ({
    riskLevels: [
      {
        label: "4",
        checked: false,
      },
    ],
  }),
}));
const mockHandleChangeRiskLevel = jest.fn();
jest.mock("hooks/api/riskLevel/useRiskLevelHandleChange", () => ({
  __esModule: true,
  default: () => ({ handleChangeRiskLevel: mockHandleChangeRiskLevel }),
}));

test("checkboxがレンダリングされていること", () => {
  render(<RiskLevelCheckBox />);
  expect(screen.getByRole("checkbox")).toBeInTheDocument();
  const riskLevelImg = screen.getAllByRole("img", { name: "リスクレベル" });
  expect(riskLevelImg.length).toBe(4);
});

test("CheckBox押下でhandleChange関数が実行されること", async () => {
  const user = userEvent.setup();
  render(<RiskLevelCheckBox />);
  const checkbox = screen.getByRole("checkbox");
  await act(async () => {
    await user.click(checkbox);
  });
  expect(mockHandleChangeRiskLevel).toHaveBeenCalledTimes(1);
});
