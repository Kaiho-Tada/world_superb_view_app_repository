import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import VisibleRadio from "features/map/components/ui-elements/VisibleRadio";
import { act } from "react-dom/test-utils";

const mockDisaptch = jest.fn();
jest.mock("providers/MapProvider", () => ({
  ...jest.requireActual("providers/MapProvider"),
  useMapContext: () => ({
    dispatch: mockDisaptch,
    state: { visibleValue: "visibleValue" },
  }),
}));

test("radiogroupが表示されていること", () => {
  render(<VisibleRadio />);
  expect(screen.getByRole("radiogroup", { name: "表示するコンテンツの選択" }));
});

test("markerのradioが表示されていること", () => {
  render(<VisibleRadio />);
  expect(screen.getByRole("radio", { name: "マーカーを表示" }));
});

test("markerのradio押下でvisibleValueが'marker'に更新されること", async () => {
  const user = userEvent.setup();
  render(<VisibleRadio />);
  await act(async () => {
    await user.click(screen.getByRole("radio", { name: "マーカーを表示" }));
  });
  expect(mockDisaptch).toHaveBeenCalledWith({ type: "SET_VISIBLE_VALUE", payload: "marker" });
  expect(mockDisaptch).toHaveBeenCalledTimes(1);
});

test("imageのradioが表示されていること", () => {
  render(<VisibleRadio />);
  expect(screen.getByRole("radio", { name: "画像を表示" }));
});

test("imageのradio押下でvisibleValueが'image'に更新されること", async () => {
  const user = userEvent.setup();
  render(<VisibleRadio />);
  await act(async () => {
    await user.click(screen.getByRole("radio", { name: "画像を表示" }));
  });
  expect(mockDisaptch).toHaveBeenCalledWith({ type: "SET_VISIBLE_VALUE", payload: "image" });
  expect(mockDisaptch).toHaveBeenCalledTimes(1);
});
