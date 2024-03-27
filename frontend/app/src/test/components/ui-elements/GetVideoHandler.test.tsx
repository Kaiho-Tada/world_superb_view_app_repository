import { render } from "@testing-library/react";
import GetVideoHandler from "components/ui-elements/GetVideoHandler";
import { useVideoListContext as mockUseVideoListContext } from "providers/VideoListProvider";
import { act } from "react-dom/test-utils";

jest.mock("lib/client", () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock("react-leaflet", () => ({
  ...jest.requireActual("react-leaflet"),
  useMapEvents: jest.fn(),
}));

jest.mock("providers/VideoListProvider", () => ({
  useVideoListContext: jest.fn(),
}));

const mockDispatch = jest.fn();
const mockContextValue = {
  dispatch: mockDispatch,
  state: {
    videos: [],
    isSkipSearchVideo: false,
    keyword: "",
    genreCheckItems: [],
    shouldDebounce: false,
    sortCriteria: "",
    currentPage: 1,
    itemsOffset: 0,
    isVisitedDetailPage: false,
  },
};

const mockContextValueSkipSearchVideo = {
  ...mockContextValue,
  state: {
    ...mockContextValue.state,
    isSkipSearchVideo: true,
  },
};

const mockContextValueVisitedDetailPage = {
  ...mockContextValue,
  state: {
    ...mockContextValue.state,
    isVisitedDetailPage: true,
  },
};

const mockContextValueShouldDebounce = {
  ...mockContextValue,
  state: {
    ...mockContextValue.state,
    shouldDebounce: true,
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

const mockHandleDebounce = jest.fn();
jest.mock("hooks/useDebounce", () => ({
  __esModule: true,
  default: () => ({
    handleDebounce: mockHandleDebounce,
  }),
}));

const mockSearchVideoApi = jest.fn();
jest.mock("features/video/api/videoApi", () => ({
  __esModule: true,
  default: () => ({ searchVideoApi: mockSearchVideoApi }),
}));

describe("初回レンダリング時のテスト", () => {
  test("isSkipSearchVideoがtrueの場合、falseに更新され、handleGetModel関数が実行されないこと", async () => {
    (mockUseVideoListContext as jest.Mock).mockReturnValue(mockContextValueSkipSearchVideo);

    // handleGetModel関数のモック化
    const spyOnUseHandleGetModel = jest.spyOn(
      jest.requireActual("hooks/api/useGetModel"),
      "default"
    );
    const mockHandleGetModel = jest.fn();
    spyOnUseHandleGetModel.mockReturnValue({ handleGetModel: mockHandleGetModel });

    await act(async () => {
      render(<GetVideoHandler />);
    });
    expect(mockHandleGetModel).not.toHaveBeenCalled();
    expect(mockDispatch).toHaveBeenCalledWith({
      type: "SET_IS_SKIP_SEARCH_VIDEO",
      payload: false,
    });
    spyOnUseHandleGetModel.mockRestore();
  });

  test("isVisitedDetailPageがtrueの場合、falseに更新され、handleGetModel関数が実行されないこと", async () => {
    (mockUseVideoListContext as jest.Mock).mockReturnValue(mockContextValueVisitedDetailPage);

    // handleGetModel関数のモック化
    const spyOnUseHandleGetModel = jest.spyOn(
      jest.requireActual("hooks/api/useGetModel"),
      "default"
    );
    const mockHandleGetModel = jest.fn();
    spyOnUseHandleGetModel.mockReturnValue({ handleGetModel: mockHandleGetModel });

    await act(async () => {
      render(<GetVideoHandler />);
    });
    expect(mockHandleGetModel).not.toHaveBeenCalled();
    expect(mockDispatch).toHaveBeenCalledWith({ type: "SET_IS_VISIT_DETAIL_PAGE", payload: false });
    spyOnUseHandleGetModel.mockRestore();
  });

  test("shouldDebounceがtrueの場合、falseに更新され、handleDebounce関数が実行されること", async () => {
    (mockUseVideoListContext as jest.Mock).mockReturnValue(mockContextValueShouldDebounce);

    // handleGetModel関数のモック化
    const spyOnUseHandleGetModel = jest.spyOn(
      jest.requireActual("hooks/api/useGetModel"),
      "default"
    );
    const mockHandleGetModel = jest.fn();
    spyOnUseHandleGetModel.mockReturnValue({ handleGetModel: mockHandleGetModel });

    await act(async () => {
      render(<GetVideoHandler />);
    });
    expect(mockHandleDebounce).toHaveBeenCalledWith(expect.any(Function));
    expect(mockHandleDebounce).toHaveBeenCalledTimes(1);
    expect(mockDispatch).toHaveBeenCalledWith({
      type: "SET_SHOULD_DEBOUNCE",
      payload: false,
    });
    spyOnUseHandleGetModel.mockRestore();
  });

  test("ページネーションが1ページ目ではない場合はcurrentPageが1にitemsOffsetが0に更新されること", async () => {
    (mockUseVideoListContext as jest.Mock).mockReturnValue(mockContextValueCurrentPage2);

    await act(async () => {
      render(<GetVideoHandler />);
    });
    expect(mockDispatch).toHaveBeenCalledWith({ type: "SET_CURRENT_PAGE", payload: 1 });
    expect(mockDispatch).toHaveBeenCalledWith({ type: "SET_ITEMS_OFFSET", payload: 0 });
  });

  describe("handleGetModel関数のテスト", () => {
    test("handleGetModel関数が実行されること", async () => {
      (mockUseVideoListContext as jest.Mock).mockReturnValue(mockContextValue);

      // handleGetModel関数のモック化
      const spyOnUseHandleGetModel = jest.spyOn(
        jest.requireActual("hooks/api/useGetModel"),
        "default"
      );
      const mockHandleGetModel = jest.fn();
      spyOnUseHandleGetModel.mockReturnValue({ handleGetModel: mockHandleGetModel });

      await act(async () => {
        render(<GetVideoHandler />);
      });
      expect(mockHandleGetModel).toHaveBeenCalledWith({
        loadingGetModelDispatch: expect.any(Function),
        modelDispatch: expect.any(Function),
        getModelApi: mockSearchVideoApi,
      });
      spyOnUseHandleGetModel.mockRestore();
    });

    test("handleGetModel関数内でsetVideoDispatch関数が呼び出されること", async () => {
      (mockUseVideoListContext as jest.Mock).mockReturnValue(mockContextValue);

      mockSearchVideoApi.mockReturnValue({ data: [{ id: 1, name: "name" }] });

      await act(async () => {
        render(<GetVideoHandler />);
      });
      expect(mockDispatch).toHaveBeenCalledWith({
        type: "SET_VIDEOS",
        payload: [{ id: 1, name: "name" }],
      });
    });

    test("handleGetModel関数内でsetLoadingSearchVideoDispatch関数が呼び出されること", async () => {
      (mockUseVideoListContext as jest.Mock).mockReturnValue(mockContextValue);

      await act(async () => {
        render(<GetVideoHandler />);
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
  });
});
