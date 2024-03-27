import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
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
  };
});

const mockDispatch = jest.fn();
const mockContextValue = {
  dispatch: mockDispatch,
  state: {
    videos: mockVideos,
    genreCheckItems: [{ label: "ラベルA", checked: true }],
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
