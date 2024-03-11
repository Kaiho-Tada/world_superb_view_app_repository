import { render, screen } from "@testing-library/react";
import WorldViewList from "features/worldView/components/ui-parts/WorldViewList";

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

const mockWorldViews = Array.from({ length: 10 }, (_, index) => ({
  id: index + 1,
  name: `worldView${index + 1}`,
  imgUrl: "画像URL",
  bestSeason: "1月",
  countries: [],
  categories: [],
  characteristics: [],
  worldViewFavorites: [],
  gifUrl: "gifUrl",
  gifSite: "gifSite",
  videos: [],
  latitude: 10,
  longitude: 10,
}));

test("絶景一覧が表示されていること", () => {
  render(<WorldViewList currentViews={mockWorldViews} />);
  expect(screen.getByRole("list", { name: "絶景一覧" }));
});

test("リスト内にitemが表示されていること", () => {
  render(<WorldViewList currentViews={mockWorldViews} />);
  const listItem = screen.getAllByRole("listitem");
  expect(listItem.length).toBe(10);
});
