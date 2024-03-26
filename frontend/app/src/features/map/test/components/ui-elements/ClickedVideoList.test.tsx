import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ClickedVideoList from "features/map/components/ui-parts/ClickedVideoList";
import { act } from "react-dom/test-utils";

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

const mockClickedVideos = Array.from({ length: 3 }, (_, index) => {
  const id = index + 1;
  return {
    id,
    title: `title${id}`,
    posterPath: `posterPath${id}`,
    releaseDate: `releaseDate${id}`,
  };
});

jest.mock("providers/MapProvider", () => ({
  useMapContext: () => ({
    state: {
      clickedVideos: mockClickedVideos,
    },
  }),
}));

test("ビデオ一覧が表示されていること", () => {
  render(<ClickedVideoList />);
  expect(screen.getByRole("list", { name: "ビデオ一覧" }));
});

test("リストアイテムが表示されていること", () => {
  render(<ClickedVideoList />);

  const listItem = screen.getAllByRole("listitem");
  expect(listItem.length).toBe(3);
});

test("レコードのtitleが表示されていること", () => {
  render(<ClickedVideoList />);

  for (let i = 1; i <= 3; i += 1) {
    expect(screen.getByText(`title${i}`)).toBeInTheDocument();
  }
});

test("レコードのreleaseDateが表示されていること", () => {
  render(<ClickedVideoList />);

  for (let i = 1; i <= 3; i += 1) {
    expect(screen.getByText(`releaseDate${i}`)).toBeInTheDocument();
  }
});

test("リストアイテム押下で詳細ページに遷移すること", async () => {
  const user = userEvent.setup();
  render(<ClickedVideoList />);

  const listItem = screen.getAllByRole("listitem");
  await act(async () => {
    await user.click(listItem[0]);
  });
  expect(mockNavigate).toHaveBeenCalledWith("/videos/1");
});
