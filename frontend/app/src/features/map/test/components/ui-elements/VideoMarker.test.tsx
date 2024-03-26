import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import VideoMarker from "features/map/components/ui-elements/marker/VideoMarker";
import { act } from "react-dom/test-utils";
import { MapContainer } from "react-leaflet";

window.scrollTo = jest.fn();

const latitude = 25.1097;
const longitude = 121.846;
const mockUseMap = { getCenter: () => ({ lat: latitude, lng: longitude }) };
jest.mock("react-leaflet", () => ({
  ...jest.requireActual("react-leaflet"),
  useMap: () => mockUseMap,
}));

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

const id = 1;
const mockVideos = [
  {
    id,
    title: `title${id}`,
    posterPath: `posterPath${id}`,
    releaseDate: `releaseDate${id}`,
    worldViews: [{ id, latitude: 0, longitude: 0 }],
  },
];

jest.mock("providers/VideoListProvider", () => ({
  ...jest.requireActual("providers/VideoListProvider"),
  useVideoListContext: () => ({
    state: { videos: mockVideos },
  }),
}));

const mockMapDispatch = jest.fn();
jest.mock("providers/MapProvider", () => ({
  ...jest.requireActual("providers/MapProvider"),
  useMapContext: () => ({
    dispatch: mockMapDispatch,
  }),
}));

test("マーカーが表示されていること", () => {
  render(
    <MapContainer
      center={[0, 0]}
      zoom={2}
      scrollWheelZoom={false}
      style={{ height: "65vh", width: "100%" }}
    >
      <VideoMarker />
    </MapContainer>
  );
  expect(screen.getByRole("button", { name: "Marker" })).toBeInTheDocument();
});

test("マーカー押下でMapの中心座標が現在の地点の座標に更新されること", async () => {
  const user = userEvent.setup();
  render(
    <MapContainer
      center={[0, 0]}
      zoom={2}
      scrollWheelZoom={false}
      style={{ height: "65vh", width: "100%" }}
    >
      <VideoMarker />
    </MapContainer>
  );
  await act(async () => {
    await user.click(screen.getByRole("button", { name: "Marker" }));
  });
  expect(mockMapDispatch).toHaveBeenCalledWith({
    type: "SET_MAP_CENTER",
    payload: { lat: latitude, lng: longitude },
  });
  expect(mockMapDispatch).toHaveBeenCalledTimes(1);
});

test("マーカー押下でpopupにVideoカードが表示されること", async () => {
  const user = userEvent.setup();
  render(
    <MapContainer
      center={[0, 0]}
      zoom={2}
      scrollWheelZoom={false}
      style={{ height: "65vh", width: "100%" }}
    >
      <VideoMarker />
    </MapContainer>
  );
  await act(async () => {
    await user.click(screen.getByRole("button", { name: "Marker" }));
  });
  expect(screen.getByText(mockVideos[0].title)).toBeInTheDocument();
  expect(screen.getByText(mockVideos[0].releaseDate)).toBeInTheDocument();
});

test("Videoカード押下で詳細ページに遷移すること", async () => {
  const user = userEvent.setup();
  render(
    <MapContainer
      center={[0, 0]}
      zoom={2}
      scrollWheelZoom={false}
      style={{ height: "65vh", width: "100%" }}
    >
      <VideoMarker />
    </MapContainer>
  );
  await act(async () => {
    await user.click(screen.getByRole("button", { name: "Marker" }));
  });
  await act(async () => {
    await user.click(screen.getByText(mockVideos[0].title));
  });
  expect(mockNavigate).toHaveBeenCalledWith(`/videos/${mockVideos[0].id}`);
  expect(mockNavigate).toHaveBeenCalledTimes(1);
});
