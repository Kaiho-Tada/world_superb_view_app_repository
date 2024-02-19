import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SortSelectBox from "features/video/components/ui-element/SortSelectBox";
import { useVideoListContext as mockUseVideoListContext } from "providers/VideoListProvider";
import { act } from "react-dom/test-utils";

jest.mock("providers/VideoListProvider", () => ({
  useVideoListContext: jest.fn(),
}));
const mockContextValue = {
  state: {
    loadingSearchVideos: false,
  },
};
const mockContextValueLoading = {
  state: {
    loadingSearchVideos: true,
  },
};

test("selectBoxがアクティブな状態でレンダリングされていること", () => {
  (mockUseVideoListContext as jest.Mock).mockReturnValue(mockContextValue);
  render(<SortSelectBox />);
  expect(screen.getByRole("combobox", { name: "並び替えのセレクトボックス" })).toBeInTheDocument();
  expect(screen.getByRole("combobox", { name: "並び替えのセレクトボックス" })).toBeEnabled();
});

test("loadingSearchVideosがtrueの場合、selectBoxが非活性になっていること", () => {
  (mockUseVideoListContext as jest.Mock).mockReturnValue(mockContextValueLoading);
  render(<SortSelectBox />);
  expect(screen.getByRole("combobox", { name: "並び替えのセレクトボックス" })).toBeDisabled();
});

test("optionが表示されていること", () => {
  (mockUseVideoListContext as jest.Mock).mockReturnValue(mockContextValue);
  render(<SortSelectBox />);
  expect(screen.getByRole("option", { name: "人気が高い順" })).toBeInTheDocument();
  expect(screen.getByRole("option", { name: "評価が高い順" })).toBeInTheDocument();
  expect(screen.getByRole("option", { name: "公開日が早い順" })).toBeInTheDocument();
});

test("optionの選択でhandleChangeSort関数が呼び出されること", async () => {
  (mockUseVideoListContext as jest.Mock).mockReturnValue(mockContextValue);
  const spyOnUseSortChange = jest.spyOn(
    jest.requireActual("features/video/hooks/useSortChange"),
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
      "人気が高い順"
    );
  });
  expect(mockHandleChangeSort).toHaveBeenCalledTimes(1);
});
