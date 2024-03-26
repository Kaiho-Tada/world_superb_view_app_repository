import { render, screen } from "@testing-library/react";
import WorldViewImageOverlays from "features/map/components/ui-elements/WorldViewImageOverlays";
import { MapContainer } from "react-leaflet";

// ZoomDependentImageOverlayで使用する関数をモック化
jest.mock("react-leaflet", () => ({
  ...jest.requireActual("react-leaflet"),
  useMapEvents: jest.fn(),
  useMap: () => ({
    getZoom: () => 2,
  }),
}));

const mockWorldViews = Array.from({ length: 10 }, (_, index) => ({
  id: index + 1,
  imgUrl: "画像URL",
  latitude: 0,
  longitude: 0,
}));

jest.mock("providers/WorldViewListProvider", () => ({
  useWorldViewListContext: () => ({
    state: {
      worldViews: mockWorldViews,
    },
  }),
}));

test("worldViewのImageOverlayが正しい数だけ表示されていること", () => {
  render(
    <MapContainer
      center={[0, 0]}
      zoom={2}
      scrollWheelZoom={false}
      style={{ height: "65vh", width: "100%" }}
    >
      <WorldViewImageOverlays />
    </MapContainer>
  );
  expect(screen.getAllByRole("img").length).toBe(10);
});
