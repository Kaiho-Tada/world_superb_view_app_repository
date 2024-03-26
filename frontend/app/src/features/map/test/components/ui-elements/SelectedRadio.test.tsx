import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SelectedRadio from "features/map/components/ui-elements/SlectedRadio";
import { act } from "react-dom/test-utils";

const mockDisaptch = jest.fn();
jest.mock("providers/MapProvider", () => ({
  ...jest.requireActual("providers/MapProvider"),
  useMapContext: () => ({
    dispatch: mockDisaptch,
    state: { selectedValue: "selectedValue" },
  }),
}));

test("radiogroupが表示されていること", () => {
  render(<SelectedRadio />);
  expect(screen.getByRole("radiogroup", { name: "検索するコンテンツの選択" }));
});

test("worldViewのradioが表示されていること", () => {
  render(<SelectedRadio />);
  expect(screen.getByRole("radio", { name: "世界の舞台を探す" }));
});

test("worldViewのradio押下でselectedValueが'worldView'に更新されること", async () => {
  const user = userEvent.setup();
  render(<SelectedRadio />);
  await act(async () => {
    await user.click(screen.getByRole("radio", { name: "世界の舞台を探す" }));
  });
  expect(mockDisaptch).toHaveBeenCalledWith({ type: "SET_SELECTED_VALUE", payload: "worldView" });
  expect(mockDisaptch).toHaveBeenCalledTimes(1);
});

test("videoのradioが表示されていること", () => {
  render(<SelectedRadio />);
  expect(screen.getByRole("radio", { name: "TV・映画作品を探す" }));
});

test("videoのradio押下でselectedValueが'video'に更新されること", async () => {
  const user = userEvent.setup();
  render(<SelectedRadio />);
  await act(async () => {
    await user.click(screen.getByRole("radio", { name: "TV・映画作品を探す" }));
  });
  expect(mockDisaptch).toHaveBeenCalledWith({ type: "SET_SELECTED_VALUE", payload: "video" });
  expect(mockDisaptch).toHaveBeenCalledTimes(1);
});
