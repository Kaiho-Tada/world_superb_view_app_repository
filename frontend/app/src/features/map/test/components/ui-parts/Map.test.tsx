import { render, screen } from "@testing-library/react";
import Map from "features/map/components/ui-parts/Map";

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

const mockDispatch = jest.fn();
const mockWorldViews = Array.from({ length: 3 }, (_, index) => ({
  id: index + 1,
  name: `worldView${index + 1}`,
  imageUrl: "imageUrl",
  bestSeason: "bestSeason",
  countries: [],
  categories: [],
  characteristics: [],
  worldViewFavorites: [],
  videos: [],
  latitude: index + 1,
  longitude: index + 1,
}));

jest.mock("providers/WorldViewListProvider", () => ({
  useWorldViewListContext: () => ({
    dispatch: mockDispatch,
    state: { worldViews: mockWorldViews },
  }),
}));

test("ズームボタンが表示されていること", () => {
  render(<Map />);
  expect(screen.getByRole("button", { name: "Zoom in" }));
});

test("ズームアウトボタンが表示されていること", () => {
  render(<Map />);
  expect(screen.getByRole("button", { name: "Zoom out" }));
});

test("絶景画像が地図上に表示されていること", () => {
  render(<Map />);
  const WorldViewImgs = screen.getAllByRole("img", { name: "絶景画像" });
  expect(WorldViewImgs.length).toBe(3);
});
