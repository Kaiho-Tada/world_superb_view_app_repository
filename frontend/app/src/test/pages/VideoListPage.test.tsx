import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import mockGetAllGenresApi from "features/video/api/genreApi";
import VideoListPage from "pages/VideoListPage";
import { VideoListProvider } from "providers/VideoListProvider";
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
  ...jest.requireActual("providers/VideoListProvider"),
  useVideoListContext: () => ({
    dispatch: mockDispatch,
    state: {
      ...jest.requireActual("providers/VideoListProvider").useVideoListContext().state,
      videos: mockVideos,
    },
  }),
}));

const mockSearchVideoApi = jest.fn();
jest.mock("features/video/api/videoApi", () => ({
  __esModule: true,
  default: () => ({
    searchVideoApi: mockSearchVideoApi,
  }),
}));

jest.mock("features/video/api/genreApi", () => ({
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
    render(
      <VideoListProvider>
        <VideoListPage />
      </VideoListProvider>
    );
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
    render(
      <VideoListProvider>
        <VideoListPage />
      </VideoListProvider>
    );
  });
  expect(mockDispatch).toHaveBeenCalledWith({
    type: "SET_VIDEOS",
    payload: { id: 1, title: "タイトル" },
  });
});

test("初回レンダリング時にhandleSearchModel関数内でSET_LOADING_SEARCH_VIDEOSアクションのdispatch関数が実行されること", async () => {
  await act(async () => {
    render(
      <VideoListProvider>
        <VideoListPage />
      </VideoListProvider>
    );
  });
  expect(mockDispatch).toHaveBeenCalledWith({ type: "SET_LOADING_SEARCH_VIDEOS", payload: true });
  expect(mockDispatch).toHaveBeenCalledWith({ type: "SET_LOADING_SEARCH_VIDEOS", payload: false });
});

test("初回レンダリング時にhandleGetCheckItems関数が実行されること", async () => {
  const spyOnUseGetCheckItems = jest.spyOn(
    jest.requireActual("hooks/api/useGetCheckItems"),
    "default"
  );
  const mockHandleGetCheckItems = jest.fn();
  spyOnUseGetCheckItems.mockReturnValue({ handleGetCheckItems: mockHandleGetCheckItems });
  await act(async () => {
    render(
      <VideoListProvider>
        <VideoListPage />
      </VideoListProvider>
    );
  });
  expect(mockHandleGetCheckItems).toHaveBeenCalledWith({
    checkItemsDispatch: expect.any(Function),
    loadingModelDispatch: expect.any(Function),
    fetchModelApi: mockGetAllGenresApi,
  });

  spyOnUseGetCheckItems.mockRestore();
});

test("初回レンダリング時にhandleGetCheckItems関数内でSET_GENRE_CHECK_ITEMSアクションのdispatch関数が実行されること", async () => {
  (mockGetAllGenresApi as jest.Mock).mockReturnValue({
    data: [
      { id: 1, name: "ラベルA" },
      { id: 2, name: "ラベルB" },
    ],
  });
  // (mockSearchVideoApi as jest.Mock).mockReturnValue({ data: { id: 1, title: "タイトル" } });

  await act(async () => {
    render(
      <VideoListProvider>
        <VideoListPage />
      </VideoListProvider>
    );
  });
  expect(mockDispatch).toHaveBeenCalledWith({
    type: "SET_GENRE_CHECK_ITEMS",
    payload: [
      { label: "ラベルA", checked: false },
      { label: "ラベルB", checked: false },
    ],
  });
});

test("初回レンダリング時にhandleGetCheckItems関数内でSET_LOADING_GET_GENRESアクションのdispatch関数が実行されること", async () => {
  await act(async () => {
    render(
      <VideoListProvider>
        <VideoListPage />
      </VideoListProvider>
    );
  });
  expect(mockDispatch).toHaveBeenCalledWith({ type: "SET_LOADING_GET_GENRES", payload: true });
  expect(mockDispatch).toHaveBeenCalledWith({ type: "SET_LOADING_GET_GENRES", payload: false });
});

test("並び替えのアコーディオンが表示されていること", () => {
  render(
    <VideoListProvider>
      <VideoListPage />
    </VideoListProvider>
  );
  expect(screen.getByRole("region", { name: "並び替えのアコーディオン" })).toBeInTheDocument();
});

test("絞り込みのアコーディオンが表示されていること", () => {
  render(
    <VideoListProvider>
      <VideoListPage />
    </VideoListProvider>
  );
  expect(screen.getByRole("region", { name: "絞り込みのアコーディオン" })).toBeInTheDocument();
});

test("映画一覧が表示されていること", () => {
  render(
    <VideoListProvider>
      <VideoListPage />
    </VideoListProvider>
  );
  expect(screen.getByRole("list", { name: "ビデオ一覧" })).toBeInTheDocument();
});

describe("ページネーションのテスト", () => {
  test("ページネーションが表示されていること", () => {
    render(
      <VideoListProvider>
        <VideoListPage />
      </VideoListProvider>
    );
    expect(screen.getByRole("navigation", { name: "ページネーション" })).toBeInTheDocument();
  });

  test("movieの1ページ目が表示されていること", () => {
    render(
      <VideoListProvider>
        <VideoListPage />
      </VideoListProvider>
    );

    for (let i = 1; i <= 30; i += 1) {
      const movieElement = screen.getByText(`title${i}`);
      expect(movieElement).toBeInTheDocument();
    }
  });

  test("nextボタン押下で、worldViewsの次のページに遷移し、priviousボタンで前のページに戻ること", async () => {
    const user = userEvent.setup();
    render(
      <VideoListProvider>
        <VideoListPage />
      </VideoListProvider>
    );

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
    render(
      <VideoListProvider>
        <VideoListPage />
      </VideoListProvider>
    );
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
    render(
      <VideoListProvider>
        <VideoListPage />
      </VideoListProvider>
    );

    await act(async () => {
      await user.click(screen.getByRole("button", { name: `ページ3に移動` }));
    });
    const movieElement = screen.getByText(`title61`);
    expect(movieElement).toBeInTheDocument();
  });
});
