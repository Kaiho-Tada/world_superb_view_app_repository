import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import DirectionButton from "features/map/components/ui-elements/DirectionButton";
import { useMapContext as mockUseMapContext } from "providers/MapProvider";
import { act } from "react-dom/test-utils";

const mockDispatch = jest.fn();
jest.mock("providers/MapProvider", () => ({
  useMapContext: jest.fn(),
}));

const InitialMockContextValue = {
  dispatch: mockDispatch,
  state: { departureAirport: undefined, destination: "" },
};

const mockContextValue = {
  ...InitialMockContextValue,
  state: { departureAirport: "羽田空港", destination: "モン・サン・ミシェル" },
};

test("DirectionButtonが表示されていること", () => {
  (mockUseMapContext as jest.Mock).mockReturnValue(InitialMockContextValue);
  render(<DirectionButton />);
  expect(screen.getByRole("button", { name: "経路を表示" }));
});

test("departureAirportとdestination画初期値の場合はDirectionButtonが非活性になっていること", () => {
  (mockUseMapContext as jest.Mock).mockReturnValue(InitialMockContextValue);
  render(<DirectionButton />);
  expect(screen.getByRole("button", { name: "経路を表示" })).toHaveStyle({
    opacity: 0.8,
    pointerEvents: "none",
  });
});

test("DirectionButton押下でisDirectionMapがtrueにisHoveredMapControlIconがfalseに更新されること", async () => {
  (mockUseMapContext as jest.Mock).mockReturnValue(mockContextValue);
  const user = userEvent.setup();
  render(<DirectionButton />);
  await act(async () => {
    await user.click(screen.getByRole("button", { name: "経路を表示" }));
  });
  expect(mockDispatch).toHaveBeenCalledWith({ type: "SET_IS_DIRECTION_MAP", payload: true });
  expect(mockDispatch).toHaveBeenCalledWith({
    type: "SET_IS_HOVERED_MAP_CONTROL_ICON",
    payload: false,
  });
  expect(mockDispatch).toHaveBeenCalledTimes(2);
});
