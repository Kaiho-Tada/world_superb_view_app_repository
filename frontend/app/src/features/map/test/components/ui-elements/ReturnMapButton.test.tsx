import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ReturnMapButton from "features/map/components/ui-elements/ReturnMapButton";
import { act } from "react-dom/test-utils";

const mockDispatch = jest.fn();
jest.mock("providers/MapProvider", () => ({
  useMapContext: () => ({
    dispatch: mockDispatch,
  }),
}));

test("ReturnMapButtonが表示されていること", () => {
  render(<ReturnMapButton />);
  expect(screen.getByRole("button", { name: "マップに戻る" })).toBeInTheDocument();
});

test("ReturnMapButton押下でisDirectionMapがfalseに更新されること", async () => {
  const user = userEvent.setup();
  render(<ReturnMapButton />);
  await act(async () => {
    await user.click(screen.getByRole("button", { name: "マップに戻る" }));
  });
  expect(mockDispatch).toHaveBeenCalledWith({ type: "SET_IS_DIRECTION_MAP", payload: false });
  expect(mockDispatch).toHaveBeenCalledTimes(1);
});
