import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import MenuIconButton from "features/map/components/ui-elements/MenuButton";
import { act } from "react-dom/test-utils";

const mockOnOpen = jest.fn();
test("MenuButtonが表示されていること", () => {
  render(<MenuIconButton onOpen={mockOnOpen} />);
  expect(screen.getByRole("button", { name: "メニューボタン" })).toBeInTheDocument();
});

test("MenuButton押下でonOpen関数が呼び出されること", async () => {
  const user = userEvent.setup();
  render(<MenuIconButton onOpen={mockOnOpen} />);
  await act(async () => {
    await user.click(screen.getByRole("button", { name: "メニューボタン" }));
  });
  expect(mockOnOpen).toHaveBeenCalledTimes(1);
});
