import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import BmiCheckBox from "features/worldView/components/ui-elements/BmiCheckBox";
import { useWorldViewListContext as useWorldViewListContextMock } from "providers/WorldViewListProvider";
import { act } from "react-dom/test-utils";

jest.mock("providers/WorldViewListProvider", () => ({
  ...jest.requireActual("providers/WorldViewListProvider"),
  useWorldViewListContext: jest.fn(),
}));

const mockDispatch = jest.fn();
const mockContextValue = {
  dispatch: mockDispatch,
  state: {
    bmiCheckBoxItems: [{ label: "0%〜10%", checked: false }],
    loadingSearchWorldViews: false,
  },
};

const mockContextValueChecked = {
  state: {
    bmiCheckBoxItems: [{ label: "0%〜10%", checked: true }],
    loadingSearchWorldViews: false,
  },
};

const mockContextValueLoading = {
  state: {
    bmiCheckBoxItems: [{ label: "0%〜10%", checked: false }],
    loadingSearchWorldViews: true,
  },
};

test("checkboxが表示されていること", () => {
  (useWorldViewListContextMock as jest.Mock).mockImplementation(() => mockContextValue);
  render(<BmiCheckBox />);
  expect(screen.getByRole("checkbox", { name: "0%〜10%" })).toBeInTheDocument();
});

test("bmiCheckBoxItemsのcheckedがtrueの場合、checkBoxがチェックされていること", () => {
  (useWorldViewListContextMock as jest.Mock).mockImplementation(() => mockContextValueChecked);
  render(<BmiCheckBox />);
  expect(screen.getByRole("checkbox", { name: "0%〜10%" })).toBeChecked();
});

test("loadingSearchWorldViewsがtrueの場合、checkBoxがdisabledになっていること", () => {
  (useWorldViewListContextMock as jest.Mock).mockImplementation(() => mockContextValueLoading);
  render(<BmiCheckBox />);
  expect(screen.getByRole("checkbox", { name: "0%〜10%" })).toBeDisabled();
});

test("checkbox押下でhandleChangeCheckBox関数内でdispatchが実行されること", async () => {
  (useWorldViewListContextMock as jest.Mock).mockImplementation(() => mockContextValue);
  const user = userEvent.setup();
  render(<BmiCheckBox />);
  await act(async () => {
    await user.click(screen.getByRole("checkbox", { name: "0%〜10%" }));
  });

  expect(mockDispatch).toHaveBeenCalledWith({
    type: "SET_BMI_CHECKBOX_ITEMS",
    payload: expect.any(Array),
  });

  expect(mockDispatch).toHaveBeenCalledWith({
    type: "SET_CHECKED_BMI_LABELS",
    payload: expect.any(Array),
  });
});

test("checkbox押下でhandleChangeCheckBox関数が実行されること", async () => {
  (useWorldViewListContextMock as jest.Mock).mockImplementation(() => mockContextValue);

  const spyOnUseHandleChangeCheckBox = jest.spyOn(
    jest.requireActual("features/worldView/hooks/useHandleChangeCheckBox"),
    "default"
  );
  const mockHandleChangeCheckBox = jest.fn();
  spyOnUseHandleChangeCheckBox.mockImplementation(() => ({
    handleChangeCheckBox: mockHandleChangeCheckBox,
  }));

  const user = userEvent.setup();
  render(<BmiCheckBox />);
  await act(async () => {
    await user.click(screen.getByRole("checkbox", { name: "0%〜10%" }));
  });

  expect(mockHandleChangeCheckBox).toHaveBeenCalledWith(
    expect.objectContaining({
      e: expect.objectContaining({ target: expect.objectContaining({ value: "0%〜10%" }) }),
      checkBoxItems: [{ label: "0%〜10%", checked: false }],
      checkBoxItemsDispatch: expect.any(Function),
      checkedLabelsDispatch: expect.any(Function),
    })
  );
});
