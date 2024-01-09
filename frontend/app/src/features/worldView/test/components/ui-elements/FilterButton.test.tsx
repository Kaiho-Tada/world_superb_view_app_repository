import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import FilterButton from "features/worldView/components/ui-elements/FilterButton";
import { act } from "react-dom/test-utils";

const mockHandleClickFilterButton = jest.fn();
jest.mock("features/worldView/hooks/useClickFilterButton", () => ({
  __esModule: true,
  default: () => ({
    handleClickFilterButton: mockHandleClickFilterButton,
  }),
}));

test("絞り込みボタンがレンダリングされていること", () => {
  render(<FilterButton />);
  expect(screen.getByRole("button", { name: "フィルターアイコン 絞り込み" })).toBeInTheDocument();
  expect(screen.getByRole("img", { name: "フィルターアイコン" })).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: "絞り込み" })).toBeInTheDocument();
});

test("絞り込みボタン押下でonOpenFilterDrawer関数が実行されること", async () => {
  const user = userEvent.setup();
  render(<FilterButton />);
  const filterButton = screen.getByRole("button", { name: "フィルターアイコン 絞り込み" });
  await act(async () => {
    await user.click(filterButton);
  });
  expect(mockHandleClickFilterButton).toHaveBeenCalledTimes(1);
});
