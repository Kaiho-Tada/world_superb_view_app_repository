import { render, screen } from "@testing-library/react";
import MapControlPanel from "features/map/components/ui-parts/MapControlPanel";

const mockMapDispatch = jest.fn();
jest.mock("providers/MapProvider", () => ({
  useMapContext: () => ({
    dispatch: mockMapDispatch,
    state: {
      visibleValue: "marker",
      selectedValue: "worldView",
    },
  }),
}));

test("VisibleRadioが表示されていること", () => {
  render(<MapControlPanel />);
  expect(screen.getByRole("radiogroup", { name: "表示するコンテンツの選択" }));
});

test("SelectedRadioが表示されていること", () => {
  render(<MapControlPanel />);
  expect(screen.getByRole("radiogroup", { name: "検索するコンテンツの選択" }));
});

test("DepartureAirportSelectが表示されていること", () => {
  render(<MapControlPanel />);
  expect(screen.getByRole("combobox", { name: "出発する空港を選択" })).toBeInTheDocument();
});

test("テキストボックスがレンダリングされていること", () => {
  render(<MapControlPanel />);
  expect(screen.getByRole("textbox", { name: "目的地を入力" })).toBeInTheDocument();
});

test("DirectionButtonが表示されていること", () => {
  render(<MapControlPanel />);
  expect(screen.getByRole("button", { name: "経路を表示" }));
});
