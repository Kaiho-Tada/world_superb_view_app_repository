import { render, screen } from "@testing-library/react";
import MovieList from "features/movie/components/ui-parts/MovieList";

const mockMovies = Array.from({ length: 10 }, (_, index) => ({
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
  render(<MovieList currentMovies={mockMovies} />);
  expect(screen.getByRole("list", { name: "映画一覧" }));
});

test("リスト内にmovieのlistitemが表示されていること", async () => {
  render(<MovieList currentMovies={mockMovies} />);
  const listItem = screen.getAllByRole("listitem");
  expect(listItem.length).toBe(10);
});
