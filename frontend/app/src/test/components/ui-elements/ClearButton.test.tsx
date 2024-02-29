import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ClearButton from "components/ui-elements/ClearButton";

const mockHandleClear = jest.fn();

test("ClearButtonがレンダリングされていること", () => {
  render(<ClearButton loadingSearchModels={false} handleClear={mockHandleClear} />);
  expect(screen.getByRole("button", { name: "クリア" })).toBeInTheDocument();
});

test("loadingSearchModelsがtrueの場合、ClearButtonが非活性であること", () => {
  render(<ClearButton loadingSearchModels handleClear={mockHandleClear} />);
  expect(screen.getByRole("button", { name: "クリア" })).toBeDisabled();
});

test("ClearButton押下でhandleClear関数が呼び出されること", async () => {
  const user = userEvent.setup();
  render(<ClearButton loadingSearchModels={false} handleClear={mockHandleClear} />);
  await user.click(screen.getByRole("button", { name: "クリア" }));
  expect(mockHandleClear).toHaveBeenCalledTimes(1);
});
