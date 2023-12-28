import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SortSelectBox from "components/atoms/SortSelectBox";
import { act } from "react-dom/test-utils";

const mockHandleSortChangeWorldView = jest.fn();
jest.mock("hooks/worldView/sort/useSortWordView", () => ({
  __esModule: true,
  default: () => ({
    handleSortChangeWorldView: mockHandleSortChangeWorldView,
  }),
}));

const spyOnUseWorldViewListContext = jest.spyOn(
  jest.requireActual("hooks/providers/WorldViewListProvider"),
  "useWorldViewListContext"
);

const mockContextValue = {
  state: {
    loadingSearchWorldViews: false,
  },
};

const mockContextValueLoading = {
  state: {
    loadingSearchWorldViews: true,
  },
};

test("selectBoxがアクティブな状態でレンダリングされていること", () => {
  spyOnUseWorldViewListContext.mockImplementation(() => mockContextValue);
  render(<SortSelectBox />);
  expect(screen.getByRole("combobox", { name: "並び替えオプションの選択" })).toBeInTheDocument();
  expect(screen.getByRole("combobox", { name: "並び替えオプションの選択" })).not.toBeDisabled();
});

test("loadingSearchWorldViewsがtrueの場合、selectBoxが非活性になっていること", () => {
  spyOnUseWorldViewListContext.mockImplementation(() => mockContextValueLoading);
  render(<SortSelectBox />);
  expect(screen.getByRole("combobox", { name: "並び替えオプションの選択" })).toBeDisabled();
});

test("selectBoxがレンダリングされていること", () => {
  spyOnUseWorldViewListContext.mockImplementation(() => mockContextValue);
  render(<SortSelectBox />);
  expect(screen.getByRole("combobox", { name: "並び替えオプションの選択" })).toBeInTheDocument();
});

test("optionが表示されていること", () => {
  spyOnUseWorldViewListContext.mockImplementation(() => mockContextValue);
  render(<SortSelectBox />);
  expect(screen.getByRole("option", { name: "BMI値が低い順" })).toBeInTheDocument();
  expect(screen.getByRole("option", { name: "新しい順" })).toBeInTheDocument();
  expect(screen.getByRole("option", { name: "いいね順" })).toBeInTheDocument();
  expect(screen.getByRole("option", { name: "RISKLEVELが低い順" })).toBeInTheDocument();
});

test("selectBoxのoptionの選択でhandleSortChangeWorldView関数が実行されること", async () => {
  spyOnUseWorldViewListContext.mockImplementation(() => mockContextValue);
  const user = userEvent.setup();
  render(<SortSelectBox />);
  const selectBox = screen.getByRole("combobox", { name: "並び替えオプションの選択" });
  await act(async () => {
    await user.selectOptions(selectBox, "BMI値が低い順");
  });
  expect(mockHandleSortChangeWorldView).toHaveBeenCalledTimes(1);
});
