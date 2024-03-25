import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import DestinationInput from "features/map/components/ui-elements/DestinationInput";
import { act } from "react-dom/test-utils";

const mockDispatch = jest.fn();
jest.mock("providers/MapProvider", () => ({
  useMapContext: () => ({
    dispatch: mockDispatch,
    state: {
      destination: "",
    },
  }),
}));

test("テキストボックスがレンダリングされていること", () => {
  render(<DestinationInput />);
  expect(screen.getByRole("textbox", { name: "目的地を入力" })).toBeInTheDocument();
});

test("テキストボックスの入力をトリガーにdestinationが更新されること", async () => {
  const user = userEvent.setup();
  render(<DestinationInput />);

  await act(async () => {
    await user.type(screen.getByRole("textbox", { name: "目的地を入力" }), "九份");
  });
  expect(mockDispatch).toHaveBeenNthCalledWith(1, { type: "SET_DESTINATION", payload: "九" });
  expect(mockDispatch).toHaveBeenNthCalledWith(2, { type: "SET_DESTINATION", payload: "份" });
  expect(mockDispatch).toHaveBeenCalledTimes(2);
});

test("クリアボタンがレンダリングされていること", () => {
  render(<DestinationInput />);
  expect(screen.getByRole("img", { name: "クリアボタン" })).toBeInTheDocument();
});

test("クリアボタン押下でテキストボックスの文字がリセットされること", async () => {
  const user = userEvent.setup();
  render(<DestinationInput />);
  await act(async () => {
    await user.click(screen.getByRole("img", { name: "クリアボタン" }));
  });
  expect(mockDispatch).toHaveBeenCalledWith({ type: "SET_DESTINATION", payload: "" });
  expect(mockDispatch).toHaveBeenCalledWith({ type: "SET_DESTINATION_LATLONG", payload: [] });
  expect(mockDispatch).toHaveBeenCalledTimes(2);
});
