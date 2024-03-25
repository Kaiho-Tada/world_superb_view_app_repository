import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import WorldViewMarker from "features/map/components/ui-elements/marker/WorldViewMarker";
import { act } from "react-dom/test-utils";
import { MapContainer } from "react-leaflet";

window.scrollTo = jest.fn();

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

const id = 1;
const latitude = 25.1097;
const longitude = 121.846;
const mockWorldViews = [
  {
    id,
    name: `worldView${id}`,
    imgUrl: "画像URL",
    countries: [{ id, name: `country${id}`, riskLevel: 1, bmi: 1 }],
    latitude,
    longitude,
  },
];

jest.mock("providers/WorldViewListProvider", () => ({
  useWorldViewListContext: () => ({
    state: {
      worldViews: mockWorldViews,
    },
  }),
}));

const mockMapDispatch = jest.fn();
jest.mock("providers/MapProvider", () => ({
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
      <WorldViewMarker />
    </MapContainer>
  );
  expect(screen.getByRole("button", { name: "Marker" })).toBeInTheDocument();
});

test("マーカー押下でMapの中心座標がクリック地点の座標に更新され、clickedWorldViewがマーカーが参照しているWorldViewに更新されること", async () => {
  const user = userEvent.setup();
  render(
    <MapContainer
      center={[0, 0]}
      zoom={2}
      scrollWheelZoom={false}
      style={{ height: "65vh", width: "100%" }}
    >
      <WorldViewMarker />
    </MapContainer>
  );
  await act(async () => {
    await user.click(screen.getByRole("button", { name: "Marker" }));
  });
  expect(mockMapDispatch).toHaveBeenCalledWith({
    type: "SET_MAP_CENTER",
    payload: { lat: latitude, lng: longitude },
  });
  expect(mockMapDispatch).toHaveBeenCalledWith({
    type: "SET_CLICKED_WORLD_VIEW",
    payload: mockWorldViews[0],
  });
});

test("マーカー押下でdestinationがマーカーが参照しているWorldViewの名前にdestinationLatlongが緯度経度に更新されること", async () => {
  const user = userEvent.setup();
  render(
    <MapContainer
      center={[0, 0]}
      zoom={2}
      scrollWheelZoom={false}
      style={{ height: "65vh", width: "100%" }}
    >
      <WorldViewMarker />
    </MapContainer>
  );
  await act(async () => {
    await user.click(screen.getByRole("button", { name: "Marker" }));
  });
  expect(mockMapDispatch).toHaveBeenCalledWith({
    type: "SET_DESTINATION",
    payload: mockWorldViews[0].name,
  });
  expect(mockMapDispatch).toHaveBeenCalledWith({
    type: "SET_DESTINATION_LATLONG",
    payload: [mockWorldViews[0].latitude, mockWorldViews[0].longitude],
  });
});

test("マーカー押下でpopupにWorldViewカードが表示されること", async () => {
  const user = userEvent.setup();
  render(
    <MapContainer
      center={[0, 0]}
      zoom={2}
      scrollWheelZoom={false}
      style={{ height: "65vh", width: "100%" }}
    >
      <WorldViewMarker />
    </MapContainer>
  );
  await act(async () => {
    await user.click(screen.getByRole("button", { name: "Marker" }));
  });
  expect(screen.getByText(mockWorldViews[0].name)).toBeInTheDocument();
  expect(screen.getByText(mockWorldViews[0].countries[0].name)).toBeInTheDocument();
});

test("WorldViewカード押下で詳細ページに遷移すること", async () => {
  const user = userEvent.setup();
  render(
    <MapContainer
      center={[0, 0]}
      zoom={2}
      scrollWheelZoom={false}
      style={{ height: "65vh", width: "100%" }}
    >
      <WorldViewMarker />
    </MapContainer>
  );
  await act(async () => {
    await user.click(screen.getByRole("button", { name: "Marker" }));
  });
  await act(async () => {
    await user.click(screen.getByText(mockWorldViews[0].name));
  });
  expect(mockNavigate).toHaveBeenCalledWith(`/world_views/${mockWorldViews[0].id}`);
  expect(mockNavigate).toHaveBeenCalledTimes(1);
});
