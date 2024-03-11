import { render, screen } from "@testing-library/react";
import defaultImg from "assets/default.png";
import ZoomDependentImageOverlay from "features/map/components/ui-elements/ZoomDependentImageOverlay";
import { MapContainer } from "react-leaflet";

jest.mock("react-leaflet", () => ({
  ...jest.requireActual("react-leaflet"),
  useMapEvents: jest.fn(),
  useMap: () => ({
    getZoom: () => 2,
  }),
}));

test("ImageOverlayが表示されていること", () => {
  const latlong = [0, 0];
  render(
    <MapContainer
      center={[0, 0]}
      zoom={2}
      scrollWheelZoom={false}
      style={{ height: "65vh", width: "100%" }}
    >
      <ZoomDependentImageOverlay latlong={latlong} url={defaultImg} />
    </MapContainer>
  );
  expect(screen.getByRole("img", { name: "絶景画像" })).toBeInTheDocument();
});
