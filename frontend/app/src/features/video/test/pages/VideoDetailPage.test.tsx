import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import VideoDetailPage from "features/video/pages/VideoDetailPage";
import { useVideoListContext as mockUseVideoListContext } from "providers/VideoListProvider";
import { act } from "react-dom/test-utils";
import { useParams as mockUseParams } from "react-router-dom";

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
  useParams: jest.fn(),
}));

jest.mock("providers/VideoListProvider", () => ({
  useVideoListContext: jest.fn(),
}));

const mockVideos = Array.from({ length: 3 }, (_, index) => ({
  id: index + 1,
  title: `title${index + 1}`,
  posterPath: `posterPath${index + 1}`,
  popularity: 7.6,
  voteAverage: 8.3,
  releaseDate: `2019-04-24`,
  overview: `overview${index + 1}`,
  worldViews: [
    {
      id: index + 1,
      name: `worldView${index + 1}`,
      imgUrl: "imgUrl",
      countries: [{ id: index + 1, name: `country${index + 1}` }],
    },
  ],
  genres: [{ id: index + 1, name: `genre${index + 1}` }],
}));

const mockDispatch = jest.fn();
const mockContextValue = {
  dispatch: mockDispatch,
  state: {
    videos: mockVideos,
    loadingSearchVideos: false,
  },
};

const mockContextValueLoadingVideo = {
  ...mockContextValue,
  state: {
    ...mockContextValue.state,
    loadingSearchVideos: true,
  },
};

// searchWorldViewApi関数のモック化
const mockSearchVideoApi = jest.fn();
jest.mock("features/video/api/videoApi", () => ({
  __esModule: true,
  default: () => ({
    searchVideoApi: mockSearchVideoApi,
  }),
}));

describe("コンポーネントのテスト", () => {
  test("loadingSearchVideosがtrueの場合はloadingのspinnerが表示されていること", () => {
    (mockUseVideoListContext as jest.Mock).mockReturnValue(mockContextValueLoadingVideo);
    (mockUseParams as jest.Mock).mockReturnValue({ id: "1" });

    render(<VideoDetailPage />);
    expect(screen.getByRole("img", { name: "loadingアイコン" })).toBeInTheDocument();
  });

  test("currentDetailVideoが見つからない場合はloadingのspinnerが表示されていること", () => {
    (mockUseVideoListContext as jest.Mock).mockReturnValue(mockContextValue);
    (mockUseParams as jest.Mock).mockReturnValue({ id: "4" });

    render(<VideoDetailPage />);
    expect(screen.getByRole("img", { name: "loadingアイコン" })).toBeInTheDocument();
  });

  describe("params.idが1の場合", () => {
    test("idが1のレコードの画像が表示されていること", () => {
      (mockUseVideoListContext as jest.Mock).mockReturnValue(mockContextValue);
      (mockUseParams as jest.Mock).mockReturnValue({ id: "1" });

      render(<VideoDetailPage />);
      expect(
        screen.getByRole("img", { name: `ポスター画像: ${mockVideos[0].title}` })
      ).toBeInTheDocument();
    });

    test("idが1のレコードのタイトルと公開年が表示されること", () => {
      (mockUseVideoListContext as jest.Mock).mockReturnValue(mockContextValue);
      (mockUseParams as jest.Mock).mockReturnValue({ id: "1" });

      render(<VideoDetailPage />);
      expect(
        screen.getByRole("heading", {
          name: `${mockVideos[0].title} (${new Date(mockVideos[0].releaseDate).getFullYear()})`,
        })
      );
    });

    test("idが1のレコードの概要が表示されていること", () => {
      (mockUseVideoListContext as jest.Mock).mockReturnValue(mockContextValue);
      (mockUseParams as jest.Mock).mockReturnValue({ id: "1" });

      render(<VideoDetailPage />);
      expect(screen.getByText(mockVideos[0].overview)).toBeInTheDocument();
    });

    test("idが1のレコードのジャンルが表示されていること", () => {
      (mockUseVideoListContext as jest.Mock).mockReturnValue(mockContextValue);
      (mockUseParams as jest.Mock).mockReturnValue({ id: "1" });

      render(<VideoDetailPage />);
      expect(screen.getByText("genre1")).toBeInTheDocument();
    });

    test("idが1のレコードの公開日が表示されていること", () => {
      (mockUseVideoListContext as jest.Mock).mockReturnValue(mockContextValue);
      (mockUseParams as jest.Mock).mockReturnValue({ id: "1" });

      render(<VideoDetailPage />);
      expect(screen.getByText(mockVideos[0].releaseDate)).toBeInTheDocument();
    });

    test("idが1のレコードのユーザー評価が表示されていること", () => {
      (mockUseVideoListContext as jest.Mock).mockReturnValue(mockContextValue);
      (mockUseParams as jest.Mock).mockReturnValue({ id: "1" });

      render(<VideoDetailPage />);
      expect(screen.getByText(mockVideos[0].voteAverage)).toBeInTheDocument();
    });

    test("idが1のレコードのポピュラリティが表示されていること", () => {
      (mockUseVideoListContext as jest.Mock).mockReturnValue(mockContextValue);
      (mockUseParams as jest.Mock).mockReturnValue({ id: "1" });

      render(<VideoDetailPage />);
      expect(screen.getByText(mockVideos[0].popularity)).toBeInTheDocument();
    });

    test("idが1のレコードの舞台となった場所のリストカードが表示されていること", () => {
      (mockUseVideoListContext as jest.Mock).mockReturnValue(mockContextValue);
      (mockUseParams as jest.Mock).mockReturnValue({ id: "1" });

      render(<VideoDetailPage />);
      expect(screen.getByRole("listitem", { name: "絶景一覧: worldView1" })).toBeInTheDocument();
    });

    test("リストカード押下で詳細ページに遷移すること", async () => {
      (mockUseVideoListContext as jest.Mock).mockReturnValue(mockContextValue);
      (mockUseParams as jest.Mock).mockReturnValue({ id: "1" });

      const user = userEvent.setup();
      render(<VideoDetailPage />);
      await act(async () => {
        await user.click(screen.getByRole("listitem", { name: "絶景一覧: worldView1" }));
      });
      expect(mockNavigate).toHaveBeenCalledWith("/world_views/1");
      expect(mockNavigate).toHaveBeenCalledTimes(1);
    });
  });

  describe("params.idが2の場合", () => {
    test("idが2のレコードの画像が表示されていること", () => {
      (mockUseVideoListContext as jest.Mock).mockReturnValue(mockContextValue);
      (mockUseParams as jest.Mock).mockReturnValue({ id: "2" });

      render(<VideoDetailPage />);
      expect(
        screen.getByRole("img", { name: `ポスター画像: ${mockVideos[1].title}` })
      ).toBeInTheDocument();
    });

    test("idが2のレコードのタイトルと公開年が表示されること", () => {
      (mockUseVideoListContext as jest.Mock).mockReturnValue(mockContextValue);
      (mockUseParams as jest.Mock).mockReturnValue({ id: "2" });

      render(<VideoDetailPage />);
      expect(
        screen.getByRole("heading", {
          name: `${mockVideos[1].title} (${new Date(mockVideos[1].releaseDate).getFullYear()})`,
        })
      );
    });

    test("idが2のレコードの概要が表示されていること", () => {
      (mockUseVideoListContext as jest.Mock).mockReturnValue(mockContextValue);
      (mockUseParams as jest.Mock).mockReturnValue({ id: "2" });

      render(<VideoDetailPage />);
      expect(screen.getByText(mockVideos[1].overview)).toBeInTheDocument();
    });

    test("idが2のレコードのジャンルが表示されていること", () => {
      (mockUseVideoListContext as jest.Mock).mockReturnValue(mockContextValue);
      (mockUseParams as jest.Mock).mockReturnValue({ id: "2" });

      render(<VideoDetailPage />);
      expect(screen.getByText("genre2")).toBeInTheDocument();
    });

    test("idが2のレコードの公開日が表示されていること", () => {
      (mockUseVideoListContext as jest.Mock).mockReturnValue(mockContextValue);
      (mockUseParams as jest.Mock).mockReturnValue({ id: "2" });

      render(<VideoDetailPage />);
      expect(screen.getByText(mockVideos[1].releaseDate)).toBeInTheDocument();
    });

    test("idが2のレコードのユーザー評価が表示されていること", () => {
      (mockUseVideoListContext as jest.Mock).mockReturnValue(mockContextValue);
      (mockUseParams as jest.Mock).mockReturnValue({ id: "2" });

      render(<VideoDetailPage />);
      expect(screen.getByText(mockVideos[1].voteAverage)).toBeInTheDocument();
    });

    test("idが2のレコードのポピュラリティが表示されていること", () => {
      (mockUseVideoListContext as jest.Mock).mockReturnValue(mockContextValue);
      (mockUseParams as jest.Mock).mockReturnValue({ id: "2" });

      render(<VideoDetailPage />);
      expect(screen.getByText(mockVideos[1].popularity)).toBeInTheDocument();
    });

    test("idが2のレコードの舞台となった場所のリストカードが表示されていること", () => {
      (mockUseVideoListContext as jest.Mock).mockReturnValue(mockContextValue);
      (mockUseParams as jest.Mock).mockReturnValue({ id: "2" });

      render(<VideoDetailPage />);
      expect(screen.getByRole("listitem", { name: "絶景一覧: worldView2" })).toBeInTheDocument();
    });

    test("リストカード押下で詳細ページに遷移すること", async () => {
      (mockUseVideoListContext as jest.Mock).mockReturnValue(mockContextValue);
      (mockUseParams as jest.Mock).mockReturnValue({ id: "2" });

      const user = userEvent.setup();
      render(<VideoDetailPage />);
      await act(async () => {
        await user.click(screen.getByRole("listitem", { name: "絶景一覧: worldView2" }));
      });
      expect(mockNavigate).toHaveBeenCalledWith("/world_views/2");
      expect(mockNavigate).toHaveBeenCalledTimes(1);
    });
  });
});

describe("初回レンダリング時のテスト", () => {
  test("初回レンダリング時にhandleGetModel関数が実行されること", async () => {
    (mockUseVideoListContext as jest.Mock).mockReturnValue(mockContextValue);
    (mockUseParams as jest.Mock).mockReturnValue({ id: "1" });

    // handleGetModel関数のモック化
    const spyOnUseGetModel = jest.spyOn(jest.requireActual("hooks/api/useGetModel"), "default");
    const mockHandleGetModel = jest.fn();
    spyOnUseGetModel.mockReturnValue({ handleGetModel: mockHandleGetModel });

    await act(async () => {
      render(<VideoDetailPage />);
    });
    expect(mockHandleGetModel).toHaveBeenCalledWith({
      loadingSearchModelDispatch: expect.any(Function),
      modelDispatch: expect.any(Function),
      searchModelApi: mockSearchVideoApi,
    });
    spyOnUseGetModel.mockRestore();
  });

  test("初回レンダリング時にhandleGetModel関数内でSET_LOADING_SEARCH_VIDEOSアクションがディスパッチされること", async () => {
    (mockUseVideoListContext as jest.Mock).mockReturnValue(mockContextValue);
    (mockUseParams as jest.Mock).mockReturnValue({ id: "1" });

    await act(async () => {
      render(<VideoDetailPage />);
    });
    expect(mockDispatch).toHaveBeenCalledWith({
      type: "SET_LOADING_SEARCH_VIDEOS",
      payload: true,
    });
    expect(mockDispatch).toHaveBeenCalledWith({
      type: "SET_LOADING_SEARCH_VIDEOS",
      payload: false,
    });
  });

  test("初回レンダリング時にhandleGetModel関数内でSET_VIDEOSアクションがディスパッチされること", async () => {
    (mockUseVideoListContext as jest.Mock).mockReturnValue(mockContextValue);
    (mockUseParams as jest.Mock).mockReturnValue({ id: "1" });
    mockSearchVideoApi.mockReturnValue({ data: [{ id: 1, title: "タイトル" }] });

    await act(async () => {
      render(<VideoDetailPage />);
    });

    expect(mockDispatch).toHaveBeenCalledWith({
      type: "SET_VIDEOS",
      payload: [{ id: 1, title: "タイトル" }],
    });
  });
});
