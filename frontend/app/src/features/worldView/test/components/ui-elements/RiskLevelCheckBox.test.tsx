import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import RiskLevelCheckBox from "features/worldView/components/ui-elements/RiskLevelCheckBox";
import { useWorldViewListContext as mockUseWorldViewListContext } from "providers/WorldViewListProvider";
import { act } from "react-dom/test-utils";

jest.mock("providers/WorldViewListProvider", () => ({
  useWorldViewListContext: jest.fn(),
}));

const mockDispatch = jest.fn();
const mockContextValue = {
  dispatch: mockDispatch,
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

test("checkboxがレンダリングされていること", () => {
  (mockUseWorldViewListContext as jest.Mock).mockReturnValue(mockContextValue);
  render(<RiskLevelCheckBox />);
  expect(screen.getByRole("checkbox", { name: "リスクレベル4" })).toBeInTheDocument();
  const riskLevelImg = screen.getAllByRole("img", { name: "リスクレベル" });
  expect(riskLevelImg.length).toBe(4);
  expect(screen.getByRole("checkbox", { name: "リスクレベル4" })).not.toBeChecked();
  expect(screen.getByRole("checkbox", { name: "リスクレベル4" })).not.toBeDisabled();
});

test("riskLevelCheckBoxItemsのcheckedがtrueの場合、CheckBoxがチェックされていること", () => {
  (mockUseWorldViewListContext as jest.Mock).mockReturnValue(mockContextValueChecked);
  render(<RiskLevelCheckBox />);
  expect(screen.getByRole("checkbox", { name: "リスクレベル4" })).toBeChecked();
});

test("loadingSearchWorldViewsがtrueの場合、CheckBoxがdisabledになっていること", () => {
  (mockUseWorldViewListContext as jest.Mock).mockReturnValue(
    mockContextValueLoadingSearchWorldViews
  );
  render(<RiskLevelCheckBox />);
  expect(screen.getByRole("checkbox", { name: "リスクレベル4" })).toBeDisabled();
});

test("checkbox押下でhandleChangeCheckBox関数内でdispatchが実行されること", async () => {
  (mockUseWorldViewListContext as jest.Mock).mockReturnValue(mockContextValue);
  const user = userEvent.setup();
  render(<RiskLevelCheckBox />);
  const checkbox = screen.getByRole("checkbox", { name: "リスクレベル4" });
  await act(async () => {
    await user.click(checkbox);
  });

  expect(mockDispatch).toHaveBeenCalledWith({
    type: "SET_RISK_LEVEL_CHECKBOX_ITEMS",
    payload: expect.any(Array),
  });
});

test("checkbox押下でhandleChangeCheckBox関数が実行されること", async () => {
  (mockUseWorldViewListContext as jest.Mock).mockReturnValue(mockContextValue);
  const spyOnHandleChangeCheckBox = jest.spyOn(
    jest.requireActual("utils/handleChangeCheckBox"),
    "default"
  );

  const user = userEvent.setup();
  render(<RiskLevelCheckBox />);
  const checkbox = screen.getByRole("checkbox", { name: "リスクレベル4" });
  await act(async () => {
    await user.click(checkbox);
  });

  expect(spyOnHandleChangeCheckBox).toHaveBeenCalledWith({
    e: expect.objectContaining({ target: expect.objectContaining({ value: "4" }) }),
    checkBoxItems: [{ label: "4", checked: false }],
    checkBoxItemsDispatch: expect.any(Function),
  });
});
