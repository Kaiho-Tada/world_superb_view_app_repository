import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import BmiCheckBox from "components/molecules/BmiCheckBox";
import { useWorldViewListContext as useWorldViewListContextMock } from "hooks/providers/WorldViewListProvider";
import { act } from "react-dom/test-utils";

jest.mock("hooks/providers/WorldViewListProvider", () => ({
  ...jest.requireActual("hooks/providers/WorldViewListProvider"),
  useWorldViewListContext: jest.fn(),
}));

const mockContextValue = {
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

const mockHandleChangeBmi = jest.fn();

jest.mock("hooks/bmi/useBmiHandleChange", () => ({
  __esModule: true,
  default: () => ({ handleChangeBmi: mockHandleChangeBmi }),
}));

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

test("checkbox押下でhandleChangeBmi関数が実行されること", async () => {
  (useWorldViewListContextMock as jest.Mock).mockImplementation(() => mockContextValue);
  const user = userEvent.setup();
  render(<BmiCheckBox />);
  await act(async () => {
    await user.click(screen.getByRole("checkbox", { name: "0%〜10%" }));
  });
  expect(mockHandleChangeBmi).toHaveBeenCalledTimes(1);
});
