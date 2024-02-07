import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import mockSearchVideoApi from "features/video/api/videoApi";
import VideoListPage from "pages/VideoListPage";
import { act } from "react-dom/test-utils";

const mockVideos = Array.from({ length: 61 }, (_, index) => ({
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

const mockDispatch = jest.fn();
jest.mock("providers/VideoListProvider", () => ({
  useVideoListContext: () => ({
    dispatch: mockDispatch,
    state: {
      videos: mockVideos,
    },
  }),
}));

jest.mock("features/video/api/videoApi", () => ({
  __esModule: true,
  default: jest.fn(),
}));

test("初回レンダリング時にhandleSearchModel関数が実行されること", async () => {
  const spyOnUseSearchModel = jest.spyOn(jest.requireActual("hooks/api/useSearchModel"), "default");
  const mockHandleSearchModel = jest.fn();
  spyOnUseSearchModel.mockReturnValue({
    handleSearchModel: mockHandleSearchModel,
  });
  await act(async () => {
    render(<VideoListPage />);
  });
  expect(mockHandleSearchModel).toHaveBeenCalledWith({
    modelDispatch: expect.any(Function),
    loadingSearchModelDispatch: expect.any(Function),
    searchModelApi: mockSearchVideoApi,
  });

  spyOnUseSearchModel.mockRestore();
});

test("初回レンダリング時にhandleSearchModel関数内でSET_VIDEOSアクションのdispatch関数が実行されること", async () => {
  (mockSearchVideoApi as jest.Mock).mockReturnValue({ data: { id: 1, title: "タイトル" } });
  await act(async () => {
    render(<VideoListPage />);
  });
  expect(mockDispatch).toHaveBeenCalledWith({
    type: "SET_VIDEOS",
    payload: { id: 1, title: "タイトル" },
  });
});

test("初回レンダリング時にhandleSearchModel関数内でSET_LOADING_SEARCH_VIDEOSアクションのdispatch関数が実行されること", async () => {
  await act(async () => {
    render(<VideoListPage />);
  });
  expect(mockDispatch).toHaveBeenCalledWith({ type: "SET_LOADING_SEARCH_VIDEOS", payload: true });
  expect(mockDispatch).toHaveBeenCalledWith({ type: "SET_LOADING_SEARCH_VIDEOS", payload: false });
});

test("映画一覧が表示されていること", () => {
  render(<VideoListPage />);
  expect(screen.getByRole("list", { name: "ビデオ一覧" })).toBeInTheDocument();
});

describe("ページネーションのテスト", () => {
  test("ページネーションが表示されていること", () => {
    render(<VideoListPage />);
    expect(screen.getByRole("navigation", { name: "ページネーション" })).toBeInTheDocument();
  });

  test("movieの1ページ目が表示されていること", () => {
    render(<VideoListPage />);

    for (let i = 1; i <= 30; i += 1) {
      const movieElement = screen.getByText(`title${i}`);
      expect(movieElement).toBeInTheDocument();
    }
  });

  test("nextボタン押下で、worldViewsの次のページに遷移し、priviousボタンで前のページに戻ること", async () => {
    const user = userEvent.setup();
    render(<VideoListPage />);

    await act(async () => {
      await user.click(screen.getByRole("button", { name: "次のページに移動" }));
    });
    for (let i = 31; i <= 60; i += 1) {
      const movieElement = screen.getByText(`title${i}`);
      expect(movieElement).toBeInTheDocument();
    }
    await act(async () => {
      await user.click(screen.getByRole("button", { name: "前のページに移動" }));
    });
    for (let i = 1; i <= 30; i += 1) {
      const movieElement = screen.getByText(`title${i}`);
      expect(movieElement).toBeInTheDocument();
    }
  });

  test("2ページ目への遷移ボタン押下で2ページ目に遷移すること", async () => {
    const user = userEvent.setup();
    render(<VideoListPage />);
    await act(async () => {
      await user.click(screen.getByRole("button", { name: `ページ2に移動` }));
    });
    for (let i = 31; i <= 60; i += 1) {
      const movieElement = screen.getByText(`title${i}`);
      expect(movieElement).toBeInTheDocument();
    }
  });

  test("3ページ目への遷移ボタン押下で3ページ目に遷移すること", async () => {
    const user = userEvent.setup();
    render(<VideoListPage />);

    await act(async () => {
      await user.click(screen.getByRole("button", { name: `ページ3に移動` }));
    });
    const movieElement = screen.getByText(`title61`);
    expect(movieElement).toBeInTheDocument();
  });
});
