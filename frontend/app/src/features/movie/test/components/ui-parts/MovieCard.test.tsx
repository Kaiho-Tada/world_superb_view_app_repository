import { render, screen } from "@testing-library/react";
import MovieCard from "features/movie/components/ui-parts/MovieCard";

const title = "タイトル";
const posterPath = "posterPath";
const releaseDate = "公開日";

test("movieカードが表示されていること", () => {
  render(<MovieCard title={title} posterPath={posterPath} releaseDate={releaseDate} />);
  expect(screen.getByRole("listitem", { name: "映画一覧: タイトル" })).toBeInTheDocument();
});

test("ポスター画像が表示されていること", () => {
  render(<MovieCard title={title} posterPath={posterPath} releaseDate={releaseDate} />);
  expect(screen.getByRole("img", { name: "ポスター画像: タイトル" })).toBeInTheDocument();
});

test("movieのタイトルが表示されていること", () => {
  render(<MovieCard title={title} posterPath={posterPath} releaseDate={releaseDate} />);
  expect(screen.getByRole("heading", { name: "タイトル" })).toBeInTheDocument();
});

test("movieの公開日が表示されていること", () => {
  render(<MovieCard title={title} posterPath={posterPath} releaseDate={releaseDate} />);
  expect(screen.getByText("公開日")).toBeInTheDocument();
});
