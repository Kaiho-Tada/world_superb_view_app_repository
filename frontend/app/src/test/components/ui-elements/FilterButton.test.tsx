import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import FilterButton from "components/ui-elements/FilterButton";

const mockOnOpen = jest.fn();
test("FilterButtonがレンダリングされていること", () => {
  render(<FilterButton onOpen={mockOnOpen} />);
  expect(screen.getByRole("button", { name: "フィルターアイコン フィルター" })).toBeInTheDocument();
});

test("FilterButtonが押下でonOpen関数が呼び出されること", async () => {
  const user = userEvent.setup();
  render(<FilterButton onOpen={mockOnOpen} />);
  await user.click(screen.getByRole("button", { name: "フィルターアイコン フィルター" }));
  expect(mockOnOpen).toHaveBeenCalledTimes(1);
});
