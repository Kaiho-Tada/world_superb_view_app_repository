import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import MovieCard from "features/video/components/ui-parts/VideoCard";
import { act } from "react-dom/test-utils";

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

const id = 1;
const title = "タイトル";
const posterPath = "posterPath";
const releaseDate = "公開日";

test("videoカードが表示されていること", () => {
  render(<MovieCard id={id} title={title} posterPath={posterPath} releaseDate={releaseDate} />);
  expect(screen.getByRole("listitem", { name: "ビデオ一覧: タイトル" })).toBeInTheDocument();
});

test("ポスター画像が表示されていること", () => {
  render(<MovieCard id={id} title={title} posterPath={posterPath} releaseDate={releaseDate} />);
  expect(screen.getByRole("img", { name: "ポスター画像: タイトル" })).toBeInTheDocument();
});

test("movieのタイトルが表示されていること", () => {
  render(<MovieCard id={id} title={title} posterPath={posterPath} releaseDate={releaseDate} />);
  expect(screen.getByRole("heading", { name: "タイトル" })).toBeInTheDocument();
});

test("movieの公開日が表示されていること", () => {
  render(<MovieCard id={id} title={title} posterPath={posterPath} releaseDate={releaseDate} />);
  expect(screen.getByText("公開日")).toBeInTheDocument();
});

test("videoカード押下でビデオ詳細ページに遷移すること", async () => {
  const user = userEvent.setup();
  render(<MovieCard id={id} title={title} posterPath={posterPath} releaseDate={releaseDate} />);
  await act(async () => {
    await user.click(screen.getByRole("listitem", { name: "ビデオ一覧: タイトル" }));
  });
  expect(mockNavigate).toHaveBeenCalledWith(`/videos/${id}`);
  expect(mockNavigate).toHaveBeenCalledTimes(1);
});
