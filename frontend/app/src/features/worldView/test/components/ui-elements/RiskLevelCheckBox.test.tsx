import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import RiskLevelCheckBox from "features/worldView/components/ui-elements/RiskLevelCheckBox";
import { act } from "react-dom/test-utils";

const spyOnUseWorldViewListContext = jest.spyOn(
  jest.requireActual("providers/WorldViewListProvider"),
  "useWorldViewListContext"
);

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

test("checkbox押下でhandleChangeCheckBox関数内でdispatchが実行されること", async () => {
  spyOnUseWorldViewListContext.mockImplementation(() => mockContextValue);
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

  expect(mockDispatch).toHaveBeenCalledWith({
    type: "SET_CHECKED_RISK_LEVEL_LABELS",
    payload: expect.any(Array),
  });
});

test("checkbox押下でhandleChangeCheckBox関数が実行されること", async () => {
  spyOnUseWorldViewListContext.mockImplementation(() => mockContextValue);

  const spyOnUseHandleChangeCheckBox = jest.spyOn(
    jest.requireActual("features/worldView/hooks/useHandleChangeCheckBox"),
    "default"
  );
  const mockHandleChangeCheckBox = jest.fn();
  spyOnUseHandleChangeCheckBox.mockImplementation(() => ({
    handleChangeCheckBox: mockHandleChangeCheckBox,
  }));

  const user = userEvent.setup();
  render(<RiskLevelCheckBox />);
  const checkbox = screen.getByRole("checkbox", { name: "リスクレベル4" });
  await act(async () => {
    await user.click(checkbox);
  });

  expect(mockHandleChangeCheckBox).toHaveBeenCalledWith(
    expect.objectContaining({
      e: expect.objectContaining({ target: expect.objectContaining({ value: "4" }) }),
      checkBoxItems: [{ label: "4", checked: false }],
      checkBoxItemsDispatch: expect.any(Function),
      checkedLabelsDispatch: expect.any(Function),
    })
  );
});
