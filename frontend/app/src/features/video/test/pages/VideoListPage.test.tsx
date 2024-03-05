import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import mockGetAllGenresApi from "features/video/api/genreApi";
import VideoListPage from "features/video/pages/VideoListPage";
import { useVideoListContext as mockUseVideoListContext } from "providers/VideoListProvider";
import { act } from "react-dom/test-utils";

global.ResizeObserver = require("resize-observer-polyfill");

jest.mock("@chakra-ui/react", () => ({
  ...jest.requireActual("@chakra-ui/react"),
  useBreakpointValue: () => "sm",
}));

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

jest.mock("providers/VideoListProvider", () => ({
  useVideoListContext: jest.fn(),
}));

const mockVideos = Array.from({ length: 61 }, (_, index) => {
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
    worldViews: [
      {
        id,
        name: `worldView${id}`,
        imageUrl: "imageUrl",
        countries: [{ id, name: `country${id}` }],
      },
    ],
    genres: [{ id, name: `genre${id}` }],
  };
});

const mockDispatch = jest.fn();
const mockContextValue = {
  dispatch: mockDispatch,
  state: {
    videos: mockVideos,
    genreCheckItems: [{ label: "ラベルA", checked: true }],
    sortCriteria: "",
    keyword: "",
    shouldDebounce: false,
    loadingSearchVideos: false,
    voteAverageRange: [0, 10],
    currentPage: 1,
    itemsOffset: 0,
  },
};

const mockContextValueCurrentPage2 = {
  ...mockContextValue,
  state: {
    ...mockContextValue.state,
    currentPage: 2,
    itemsOffset: 30,
  },
};

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

test("Videoレコードの絞り込み時に、ページネーションが1ページ目ではない場合はcurrentPageが1にitemsOffsetが0に更新されること", () => {
  (mockUseVideoListContext as jest.Mock).mockReturnValue(mockContextValueCurrentPage2);
  render(<VideoListPage />);
  expect(mockDispatch).toHaveBeenCalledWith({ type: "SET_CURRENT_PAGE", payload: 1 });
  expect(mockDispatch).toHaveBeenCalledWith({ type: "SET_ITEMS_OFFSET", payload: 0 });
});

test("初回レンダリング時にhandleGetModel関数が実行されること", async () => {
  (mockUseVideoListContext as jest.Mock).mockReturnValue(mockContextValue);
  const spyOnUseGetModel = jest.spyOn(jest.requireActual("hooks/api/useGetModel"), "default");
  const mockHandleGetModel = jest.fn();
  spyOnUseGetModel.mockReturnValue({
    handleGetModel: mockHandleGetModel,
  });
  await act(async () => {
    render(<VideoListPage />);
  });
  expect(mockHandleGetModel).toHaveBeenCalledWith({
    modelDispatch: expect.any(Function),
    loadingSearchModelDispatch: expect.any(Function),
    searchModelApi: mockSearchVideoApi,
  });

  spyOnUseGetModel.mockRestore();
});

test("初回レンダリング時にhandleGetModel関数内でSET_VIDEOSアクションのdispatch関数が実行されること", async () => {
  (mockUseVideoListContext as jest.Mock).mockReturnValue(mockContextValue);
  (mockSearchVideoApi as jest.Mock).mockReturnValue({ data: { id: 1, title: "タイトル" } });
  await act(async () => {
    render(<VideoListPage />);
  });
  expect(mockDispatch).toHaveBeenCalledWith({
    type: "SET_VIDEOS",
    payload: { id: 1, title: "タイトル" },
  });
});

test("初回レンダリング時にhandleGetModel関数内でSET_LOADING_SEARCH_VIDEOSアクションのdispatch関数が実行されること", async () => {
  (mockUseVideoListContext as jest.Mock).mockReturnValue(mockContextValue);
  await act(async () => {
    render(<VideoListPage />);
  });
  expect(mockDispatch).toHaveBeenCalledWith({ type: "SET_LOADING_SEARCH_VIDEOS", payload: true });
  expect(mockDispatch).toHaveBeenCalledWith({ type: "SET_LOADING_SEARCH_VIDEOS", payload: false });
});

test("初回レンダリング時にhandleGetCheckItems関数が実行されること", async () => {
  (mockUseVideoListContext as jest.Mock).mockReturnValue(mockContextValue);
  const spyOnUseGetCheckItems = jest.spyOn(
    jest.requireActual("hooks/api/useGetCheckItems"),
    "default"
  );
  const mockHandleGetCheckItems = jest.fn();
  spyOnUseGetCheckItems.mockReturnValue({ handleGetCheckItems: mockHandleGetCheckItems });
  await act(async () => {
    render(<VideoListPage />);
  });
  expect(mockHandleGetCheckItems).toHaveBeenCalledWith({
    checkItemsDispatch: expect.any(Function),
    loadingModelDispatch: expect.any(Function),
    fetchModelApi: mockGetAllGenresApi,
  });

  spyOnUseGetCheckItems.mockRestore();
});

test("初回レンダリング時にhandleGetCheckItems関数内でSET_GENRE_CHECK_ITEMSアクションのdispatch関数が実行されること", async () => {
  (mockUseVideoListContext as jest.Mock).mockReturnValue(mockContextValue);
  (mockGetAllGenresApi as jest.Mock).mockReturnValue({
    data: [
      { id: 1, name: "ラベルA" },
      { id: 2, name: "ラベルB" },
    ],
  });

  await act(async () => {
    render(<VideoListPage />);
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
  (mockUseVideoListContext as jest.Mock).mockReturnValue(mockContextValue);
  await act(async () => {
    render(<VideoListPage />);
  });
  expect(mockDispatch).toHaveBeenCalledWith({ type: "SET_LOADING_GET_GENRES", payload: true });
  expect(mockDispatch).toHaveBeenCalledWith({ type: "SET_LOADING_GET_GENRES", payload: false });
});

test("FilterButtonが表示されていること", () => {
  (mockUseVideoListContext as jest.Mock).mockReturnValue(mockContextValue);
  render(<VideoListPage />);
  expect(screen.getByRole("button", { name: "フィルター" })).toBeInTheDocument();
});

test("SelectBoxWithIconが表示されていること", () => {
  (mockUseVideoListContext as jest.Mock).mockReturnValue(mockContextValue);
  render(<VideoListPage />);
  expect(screen.getByRole("combobox", { name: "並び替えのセレクトボックス" })).toBeInTheDocument();
});

test("Videoモデルのフィルターの値が初期値でない場合はクリアボタンがレンダリングされていること", async () => {
  (mockUseVideoListContext as jest.Mock).mockReturnValue(mockContextValue);
  render(<VideoListPage />);
  expect(screen.getByRole("button", { name: "クリア" })).toBeInTheDocument();
});

test("クリアボタン押下でhandleClear関数が呼び出されること", async () => {
  (mockUseVideoListContext as jest.Mock).mockReturnValue(mockContextValue);
  const spyOnUseClear = jest.spyOn(jest.requireActual("features/video/hooks/useClear"), "default");
  const mockHandleClear = jest.fn();
  spyOnUseClear.mockReturnValue({ handleClear: mockHandleClear });
  const user = userEvent.setup();
  render(<VideoListPage />);
  await act(async () => {
    await user.click(screen.getByRole("button", { name: "クリア" }));
  });
  expect(mockHandleClear).toHaveBeenCalledTimes(1);
  spyOnUseClear.mockRestore();
});

test("並び替えのアコーディオンが表示されていること", () => {
  (mockUseVideoListContext as jest.Mock).mockReturnValue(mockContextValue);
  render(<VideoListPage />);
  expect(screen.getByRole("region", { name: "並び替えのアコーディオン" })).toBeInTheDocument();
});

test("絞り込みのアコーディオンが表示されていること", () => {
  (mockUseVideoListContext as jest.Mock).mockReturnValue(mockContextValue);
  render(<VideoListPage />);
  expect(screen.getByRole("region", { name: "絞り込みのアコーディオン" })).toBeInTheDocument();
});

test("映画一覧が表示されていること", () => {
  (mockUseVideoListContext as jest.Mock).mockReturnValue(mockContextValue);
  render(<VideoListPage />);
  expect(screen.getByRole("list", { name: "ビデオ一覧" })).toBeInTheDocument();
});

describe("ページネーションのテスト", () => {
  test("ページネーションが表示されていること", () => {
    (mockUseVideoListContext as jest.Mock).mockReturnValue(mockContextValue);
    render(<VideoListPage />);
    expect(screen.getByRole("navigation", { name: "ページネーション" })).toBeInTheDocument();
  });

  test("movieの1ページ目が表示されていること", () => {
    (mockUseVideoListContext as jest.Mock).mockReturnValue(mockContextValue);
    render(<VideoListPage />);
    expect(screen.getByText(`title1`)).toBeInTheDocument();
  });

  test("nextボタン押下で、次のページに遷移すること", async () => {
    (mockUseVideoListContext as jest.Mock).mockReturnValue(mockContextValue);
    const user = userEvent.setup();
    render(<VideoListPage />);
    await act(async () => {
      await user.click(screen.getByRole("button", { name: "次のページに移動" }));
    });
    expect(mockDispatch).toHaveBeenCalledWith({ type: "SET_CURRENT_PAGE", payload: 2 });
    expect(mockDispatch).toHaveBeenCalledWith({ type: "SET_ITEMS_OFFSET", payload: 30 });
  });

  test("priviousボタンで前のページに遷移すること", async () => {
    (mockUseVideoListContext as jest.Mock).mockReturnValue(mockContextValueCurrentPage2);
    const user = userEvent.setup();
    render(<VideoListPage />);
    await act(async () => {
      await user.click(screen.getByRole("button", { name: "前のページに移動" }));
    });
    expect(mockDispatch).toHaveBeenCalledWith({ type: "SET_CURRENT_PAGE", payload: 1 });
    expect(mockDispatch).toHaveBeenCalledWith({ type: "SET_ITEMS_OFFSET", payload: 0 });
  });

  test("2ページ目への遷移ボタン押下で2ページ目に遷移すること", async () => {
    (mockUseVideoListContext as jest.Mock).mockReturnValue(mockContextValue);
    const user = userEvent.setup();
    render(<VideoListPage />);
    await act(async () => {
      await user.click(screen.getByRole("button", { name: `ページ2に移動` }));
    });
    expect(mockDispatch).toHaveBeenCalledWith({ type: "SET_CURRENT_PAGE", payload: 2 });
    expect(mockDispatch).toHaveBeenCalledWith({ type: "SET_ITEMS_OFFSET", payload: 30 });
  });

  test("3ページ目への遷移ボタン押下で3ページ目に遷移すること", async () => {
    (mockUseVideoListContext as jest.Mock).mockReturnValue(mockContextValue);
    const user = userEvent.setup();
    render(<VideoListPage />);
    await act(async () => {
      await user.click(screen.getByRole("button", { name: `ページ3に移動` }));
    });
    expect(mockDispatch).toHaveBeenCalledWith({ type: "SET_CURRENT_PAGE", payload: 3 });
    expect(mockDispatch).toHaveBeenCalledWith({ type: "SET_ITEMS_OFFSET", payload: 60 });
  });
});
