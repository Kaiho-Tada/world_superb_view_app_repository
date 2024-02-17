import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ClearButton from "components/ui-elements/ClearButton";
import mockUseClear from "features/video/hooks/useClear";

const mockHandleClear = jest.fn();
jest.mock("features/video/hooks/useClear", () => ({
  __esModule: true,
  default: jest.fn(),
}));

test("ClearButtonがレンダリングされていること", () => {
  (mockUseClear as jest.Mock).mockReturnValue({ handleClear: mockHandleClear });
  render(<ClearButton loadingSearchModels={false} />);
  expect(screen.getByRole("button", { name: "クリア" })).toBeInTheDocument();
});

test("loadingSearchModelsがtrueの場合、ClearButtonが非活性であること", () => {
  (mockUseClear as jest.Mock).mockReturnValue({ handleClear: mockHandleClear });
  render(<ClearButton loadingSearchModels />);
  expect(screen.getByRole("button", { name: "クリア" })).toBeDisabled();
});

test("ClearButton押下でhandleClear関数が呼び出されること", async () => {
  (mockUseClear as jest.Mock).mockReturnValue({ handleClear: mockHandleClear });
  const user = userEvent.setup();
  render(<ClearButton loadingSearchModels={false} />);
  await user.click(screen.getByRole("button", { name: "クリア" }));
  expect(mockHandleClear).toHaveBeenCalledTimes(1);
});
