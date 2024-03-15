import { render, screen } from "@testing-library/react";
import VideoFilterDrawer from "features/map/components/ui-parts/VideoFilterDrawer";
import mockGetAllGenresApi from "features/video/api/genreApi";
import { useVideoListContext as mockUseVideoListContext } from "providers/VideoListProvider";
import { act } from "react-dom/test-utils";

global.ResizeObserver = require("resize-observer-polyfill");

const mockDispatch = jest.fn();
jest.mock("providers/VideoListProvider", () => ({
  ...jest.requireActual("providers/VideoListProvider"),
  useVideoListContext: jest.fn(),
}));

const mockContextValue = {
  dispatch: mockDispatch,
  state: {
    genreCheckItems: [
      { label: "ラベルA", checked: false },
      { label: "ラベルB", checked: false },
    ],
    keyword: "",
    voteAverageRange: [0, 10],
    isSkipGetCheckItems: false,
    isVisitedDetailPage: false,
  },
};

const mockContextValueSkipGetCheckItems = {
  ...mockContextValue,
  state: {
    ...mockContextValue.state,
    isSkipGetCheckItems: true,
  },
};

const mockContextValueVisitedDetailPage = {
  ...mockContextValue,
  state: {
    ...mockContextValue.state,
    isVisitedDetailPage: true,
  },
};

jest.mock("features/video/api/genreApi", () => ({
  __esModule: true,
  default: jest.fn(),
}));

test("FilterDrawerがレンダリングされていること", () => {
  (mockUseVideoListContext as jest.Mock).mockReturnValue(mockContextValue);
  render(<VideoFilterDrawer isOpen onClose={jest.fn()} />);
  expect(screen.getByRole("dialog")).toBeInTheDocument();
});

test("isOpenがfalseの場合、FilterDrawerが非表示であること", () => {
  (mockUseVideoListContext as jest.Mock).mockReturnValue(mockContextValue);
  render(<VideoFilterDrawer isOpen={false} onClose={jest.fn()} />);
  expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
});

describe("初回レンダリング時のテスト", () => {
  test("isSkipGetCheckItmesがtrueの場合、falseに更新され、handleGetCheckItemsが呼び出されないこと", async () => {
    (mockUseVideoListContext as jest.Mock).mockReturnValue(mockContextValueSkipGetCheckItems);

    // handleGetCheckItems関数をモック化
    const spyOnUseGetCheckItems = jest.spyOn(
      jest.requireActual("hooks/api/useGetCheckItems"),
      "default"
    );
    const mockHandleGetCheckItems = jest.fn();
    spyOnUseGetCheckItems.mockReturnValue({
      handleGetCheckItems: mockHandleGetCheckItems,
    });

    await act(async () => {
      render(<VideoFilterDrawer isOpen onClose={jest.fn()} />);
    });
    expect(mockHandleGetCheckItems).not.toHaveBeenCalled();
    expect(mockDispatch).toHaveBeenCalledWith({
      type: "SET_IS_SKIP_GET_CHECK_ITEMS",
      payload: false,
    });
    spyOnUseGetCheckItems.mockRestore();
  });

  test("isVisitedDetailPageがtrueの場合、falseに更新され、handleGetCheckItemsとが呼び出されないこと", async () => {
    (mockUseVideoListContext as jest.Mock).mockReturnValue(mockContextValueVisitedDetailPage);

    // handleGetCheckItems関数をモック化
    const spyOnUseGetCheckItems = jest.spyOn(
      jest.requireActual("hooks/api/useGetCheckItems"),
      "default"
    );
    const mockHandleGetCheckItems = jest.fn();
    spyOnUseGetCheckItems.mockReturnValue({
      handleGetCheckItems: mockHandleGetCheckItems,
    });

    // handleGetNestedCheckItems関数をモック化
    const spyOnUseGetNestedCheckItems = jest.spyOn(
      jest.requireActual("hooks/api/useGetNestedCheckItems"),
      "default"
    );
    const mockHandleGetNestedCheckItems = jest.fn();
    spyOnUseGetNestedCheckItems.mockReturnValue({
      handleGetNestedCheckItems: mockHandleGetNestedCheckItems,
    });

    await act(async () => {
      render(<VideoFilterDrawer isOpen onClose={jest.fn()} />);
    });
    expect(mockHandleGetCheckItems).not.toHaveBeenCalled();
    expect(mockHandleGetNestedCheckItems).not.toHaveBeenCalled();
    expect(mockDispatch).toHaveBeenCalledWith({
      type: "SET_IS_VISIT_DETAIL_PAGE",
      payload: false,
    });
    spyOnUseGetCheckItems.mockRestore();
    spyOnUseGetNestedCheckItems.mockRestore();
  });

  describe("handleGetCheckItems関数のテスト", () => {
    test("handleGetCheckItems関数が実行されること", async () => {
      (mockUseVideoListContext as jest.Mock).mockReturnValue(mockContextValue);

      // handleGetCheckItems関数をモック化
      const spyOnUseGetCheckItems = jest.spyOn(
        jest.requireActual("hooks/api/useGetCheckItems"),
        "default"
      );
      const mockHandleGetCheckItems = jest.fn();
      spyOnUseGetCheckItems.mockReturnValue({
        handleGetCheckItems: mockHandleGetCheckItems,
      });

      await act(async () => {
        render(<VideoFilterDrawer isOpen onClose={jest.fn()} />);
      });
      expect(mockHandleGetCheckItems).toHaveBeenCalledWith({
        loadingGetModelDispatch: expect.any(Function),
        checkItemsDispatch: expect.any(Function),
        getModelApi: mockGetAllGenresApi,
      });
      spyOnUseGetCheckItems.mockRestore();
    });

    test("handleGetCheckItems関数内でloadingGetGenresDispatch関数が呼び出されること", async () => {
      (mockUseVideoListContext as jest.Mock).mockReturnValue(mockContextValue);

      await act(async () => {
        render(<VideoFilterDrawer isOpen onClose={jest.fn()} />);
      });
      expect(mockDispatch).toHaveBeenCalledWith({
        type: "SET_LOADING_GET_GENRES",
        payload: true,
      });
      expect(mockDispatch).toHaveBeenCalledWith({
        type: "SET_LOADING_GET_GENRES",
        payload: false,
      });
    });

    test("handleGetCheckItems関数内でgenreCheckItemsDispatch関数が呼び出されること", async () => {
      (mockUseVideoListContext as jest.Mock).mockReturnValue(mockContextValue);
      (mockGetAllGenresApi as jest.Mock).mockReturnValue({
        data: [{ id: 1, name: "name" }],
      });

      await act(async () => {
        render(<VideoFilterDrawer isOpen onClose={jest.fn()} />);
      });
      expect(mockDispatch).toHaveBeenCalledWith({
        type: "SET_GENRE_CHECK_ITEMS",
        payload: [
          {
            label: "name",
            checked: false,
          },
        ],
      });
    });
  });
});
