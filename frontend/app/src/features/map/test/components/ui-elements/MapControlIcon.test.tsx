import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import MapControlIcon from "features/map/components/ui-elements/MapControlIcon";
import { act } from "react-dom/test-utils";

const mockDispatch = jest.fn();
jest.mock("providers/MapProvider", () => ({
  useMapContext: () => ({
    dispatch: mockDispatch,
  }),
}));

test("マップ操作アイコンが表示されていること", () => {
  render(<MapControlIcon />);
  expect(screen.getByRole("img", { name: "マップ操作アイコン" })).toBeInTheDocument();
});

test("マップ操作アイコンのホバー時にisHoveredMapControlIconがtrueに更新されること", async () => {
  const user = userEvent.setup();
  render(<MapControlIcon />);
  await act(async () => {
    await user.hover(screen.getByRole("img", { name: "マップ操作アイコン" }));
  });
  expect(mockDispatch).toHaveBeenCalledWith({
    type: "SET_IS_HOVERED_MAP_CONTROL_ICON",
    payload: true,
  });
  expect(mockDispatch).toHaveBeenCalledTimes(1);
});
