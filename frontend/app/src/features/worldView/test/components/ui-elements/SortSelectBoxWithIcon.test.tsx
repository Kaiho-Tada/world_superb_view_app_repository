import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SortSelectBox from "features/worldView/components/ui-elements/SortSelectBoxWithIcon";
import { useWorldViewListContext as mockUseWorldViewListContext } from "providers/WorldViewListProvider";
import { act } from "react-dom/test-utils";

jest.mock("providers/WorldViewListProvider", () => ({
  useWorldViewListContext: jest.fn(),
}));

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
  (mockUseWorldViewListContext as jest.Mock).mockReturnValue(mockContextValue);
  render(<SortSelectBox />);
  expect(screen.getByRole("combobox", { name: "並び替えオプションの選択" })).toBeInTheDocument();
  expect(screen.getByRole("combobox", { name: "並び替えオプションの選択" })).not.toBeDisabled();
});

test("loadingSearchWorldViewsがtrueの場合、selectBoxが非活性になっていること", () => {
  (mockUseWorldViewListContext as jest.Mock).mockReturnValue(mockContextValueLoading);
  render(<SortSelectBox />);
  expect(screen.getByRole("combobox", { name: "並び替えオプションの選択" })).toBeDisabled();
});

test("selectBoxがレンダリングされていること", () => {
  (mockUseWorldViewListContext as jest.Mock).mockReturnValue(mockContextValue);

  render(<SortSelectBox />);
  expect(screen.getByRole("combobox", { name: "並び替えオプションの選択" })).toBeInTheDocument();
});

test("optionが表示されていること", () => {
  (mockUseWorldViewListContext as jest.Mock).mockReturnValue(mockContextValue);
  render(<SortSelectBox />);
  expect(screen.getByRole("option", { name: "BMI値が低い順" })).toBeInTheDocument();
  expect(screen.getByRole("option", { name: "新しい順" })).toBeInTheDocument();
  expect(screen.getByRole("option", { name: "いいね順" })).toBeInTheDocument();
  expect(screen.getByRole("option", { name: "RISKLEVELが低い順" })).toBeInTheDocument();
});

test("selectBoxのoptionの選択でhandleSortChangeWorldView関数が実行されること", async () => {
  (mockUseWorldViewListContext as jest.Mock).mockReturnValue(mockContextValue);
  const spyOnUseSortChange = jest.spyOn(
    jest.requireActual("features/worldView/hooks/useSortChange"),
    "default"
  );
  const mockHandleChangeSort = jest.fn();
  spyOnUseSortChange.mockReturnValue({
    handleChangeSort: mockHandleChangeSort,
  });

  const user = userEvent.setup();
  render(<SortSelectBox />);
  const selectBox = screen.getByRole("combobox", { name: "並び替えオプションの選択" });
  await act(async () => {
    await user.selectOptions(selectBox, "BMI値が低い順");
  });
  expect(mockHandleChangeSort).toHaveBeenCalledTimes(1);
});
