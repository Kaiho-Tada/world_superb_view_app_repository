import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SortSelectBox from "features/worldView/components/ui-elements/SortSelectBox";
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
  expect(screen.getByRole("combobox", { name: "並び替えのセレクトボックス" })).toBeInTheDocument();
  expect(screen.getByRole("combobox", { name: "並び替えのセレクトボックス" })).toBeEnabled();
});

test("loadingSearchVideosがtrueの場合、selectBoxが非活性になっていること", () => {
  (mockUseWorldViewListContext as jest.Mock).mockReturnValue(mockContextValueLoading);
  render(<SortSelectBox />);
  expect(screen.getByRole("combobox", { name: "並び替えのセレクトボックス" })).toBeDisabled();
});

test("optionが表示されていること", () => {
  (mockUseWorldViewListContext as jest.Mock).mockReturnValue(mockContextValue);
  render(<SortSelectBox />);
  expect(screen.getByRole("option", { name: "BMI値が低い順" })).toBeInTheDocument();
  expect(screen.getByRole("option", { name: "新しい順" })).toBeInTheDocument();
  expect(screen.getByRole("option", { name: "いいね順" })).toBeInTheDocument();
  expect(screen.getByRole("option", { name: "RISKLEVELが低い順" })).toBeInTheDocument();
});

test("optionの選択でhandleChangeSort関数が呼び出されること", async () => {
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
  await act(async () => {
    await user.selectOptions(
      screen.getByRole("combobox", { name: "並び替えのセレクトボックス" }),
      "BMI値が低い順"
    );
  });
  expect(mockHandleChangeSort).toHaveBeenCalledTimes(1);
});
