import { render, screen } from "@testing-library/react";
import VideoList from "features/video/components/ui-parts/VideoList";

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

const mockVideos = Array.from({ length: 10 }, (_, index) => {
  const id = index + 1;
  return {
    id,
    title: `title${id}`,
    posterPath: `posterPath${id}`,
    budget: 100000000,
    revenue: 300000000,
    popularity: 7.6,
    voteAverage: 8.3,
    releaseDate: `releaseDate${id}`,
    status: true,
    overview: `overview${id}`,
    isMovie: false,
    worldViews: [
      {
        id: 1,
        name: "name",
        imgUrl: "",
        countries: [{ id: 1, name: "name" }],
        latitude: 0,
        longitude: 0,
      },
    ],
    genres: [{ id, name: `genre${id}` }],
  };
});

test("映画一覧が表示されていること", () => {
  render(<VideoList currentVideos={mockVideos} />);
  expect(screen.getByRole("list", { name: "ビデオ一覧" }));
});

test("リスト内にmovieのlistitemが表示されていること", async () => {
  render(<VideoList currentVideos={mockVideos} />);
  const listItem = screen.getAllByRole("listitem");
  expect(listItem.length).toBe(10);
});
