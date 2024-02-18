import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import FilterDrawer from "components/ui-parts/FilterDrawer";
import { act } from "react-dom/test-utils";

const mockOnClose = jest.fn();
test("FilterDrawerがレンダリングされていること", () => {
  render(
    <FilterDrawer onClose={mockOnClose} isOpen>
      <div>children</div>
    </FilterDrawer>
  );
  expect(screen.getByRole("dialog")).toBeInTheDocument();
});

test("isOpenがfalseの場合、FilterDrawerが非表示であること", () => {
  render(
    <FilterDrawer onClose={mockOnClose} isOpen={false}>
      <div>children</div>
    </FilterDrawer>
  );
  expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
});

test("CloseButtonがレンダリングされていること", () => {
  render(
    <FilterDrawer onClose={mockOnClose} isOpen>
      <div>children</div>
    </FilterDrawer>
  );
  expect(screen.getByRole("button", { name: "Close" })).toBeInTheDocument();
});

test("CloseButton押下でonClose関数が呼び出されること", async () => {
  const user = userEvent.setup();
  render(
    <FilterDrawer onClose={mockOnClose} isOpen>
      <div>children</div>
    </FilterDrawer>
  );
  await act(async () => {
    await user.click(screen.getByRole("button", { name: "Close" }));
  });
  expect(mockOnClose).toHaveBeenCalledTimes(1);
});

test("子要素がレンダリングされていること", () => {
  render(
    <FilterDrawer onClose={mockOnClose} isOpen>
      <div>children</div>
    </FilterDrawer>
  );
  expect(screen.getByText("children")).toBeInTheDocument();
});
