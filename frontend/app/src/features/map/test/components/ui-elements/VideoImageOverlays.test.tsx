import { render, screen } from "@testing-library/react";
import VideoImageOverlays from "features/map/components/ui-elements/VideoImageOverlays";
import { MapContainer } from "react-leaflet";

// ZoomDependentImageOverlayで使用する関数をモック化
jest.mock("react-leaflet", () => ({
  ...jest.requireActual("react-leaflet"),
  useMapEvents: jest.fn(),
  useMap: () => ({
    getZoom: () => 2,
  }),
}));

const mockVideos = Array.from({ length: 10 }, (_, index) => {
  const id = index + 1;
  return {
    id,
    posterPath: `posterPath${id}`,
    worldViews: [
      {
        id: 1,
        latitude: 0,
        longitude: 0,
      },
    ],
    genres: [{ id, name: `genre${id}` }],
  };
});
jest.mock("providers/VideoListProvider", () => ({
  ...jest.requireActual("providers/VideoListProvider"),
  useVideoListContext: () => ({
    state: { videos: mockVideos },
  }),
}));

test("videoのImageOverlayが正しい数だけ表示されていること", () => {
  render(
    <MapContainer
      center={[0, 0]}
      zoom={2}
      scrollWheelZoom={false}
      style={{ height: "65vh", width: "100%" }}
    >
      <VideoImageOverlays />
    </MapContainer>
  );
  expect(screen.getAllByRole("img").length).toBe(10);
});
