import { render, screen } from "@testing-library/react";
import MovieList from "features/video/components/ui-parts/VideoList";

const mockVideos = Array.from({ length: 10 }, (_, index) => ({
  id: index + 1,
  title: `title${index + 1}`,
  posterPath: `posterPath${index + 1}`,
  budget: 100000000,
  revenue: 300000000,
  popularity: 7.6,
  vote_average: 8.3,
  releaseDate: `releaseDate${index + 1}`,
  status: true,
  overview: `overview${index + 1}`,
}));

test("映画一覧が表示されていること", () => {
  render(<MovieList currentVideos={mockVideos} />);
  expect(screen.getByRole("list", { name: "ビデオ一覧" }));
});

test("リスト内にmovieのlistitemが表示されていること", async () => {
  render(<MovieList currentVideos={mockVideos} />);
  const listItem = screen.getAllByRole("listitem");
  expect(listItem.length).toBe(10);
});
