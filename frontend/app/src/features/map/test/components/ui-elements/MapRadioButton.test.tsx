import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import MapRadioButton from "features/map/components/ui-elements/MapRadioButton";
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
  render(<MapRadioButton />);
  expect(screen.getByRole("radiogroup"));
});

test("worldViewのradioが表示されていること", () => {
  render(<MapRadioButton />);
  expect(screen.getByRole("radio", { name: "世界の舞台を表示" }));
});

test("worldViewのradio押下でvisibleValueが'worldView'に更新されること", async () => {
  const user = userEvent.setup();
  render(<MapRadioButton />);
  await act(async () => {
    await user.click(screen.getByRole("radio", { name: "世界の舞台を表示" }));
  });
  expect(mockDisaptch).toHaveBeenCalledWith({ type: "SET_VISIBLE_VALUE", payload: "worldView" });
  expect(mockDisaptch).toHaveBeenCalledTimes(1);
});

test("videoのradioが表示されていること", () => {
  render(<MapRadioButton />);
  expect(screen.getByRole("radio", { name: "TV・映画作品を表示" }));
});

test("videoのradio押下でvisibleValueが'video'に更新されること", async () => {
  const user = userEvent.setup();
  render(<MapRadioButton />);
  await act(async () => {
    await user.click(screen.getByRole("radio", { name: "TV・映画作品を表示" }));
  });
  expect(mockDisaptch).toHaveBeenCalledWith({ type: "SET_VISIBLE_VALUE", payload: "video" });
  expect(mockDisaptch).toHaveBeenCalledTimes(1);
});
