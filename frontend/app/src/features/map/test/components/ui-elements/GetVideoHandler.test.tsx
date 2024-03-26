import { render } from "@testing-library/react";
import GetVideoHandler from "features/map/components/ui-parts/GetVideoHandler";
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
  },
};

const mockContextValueSkipSearchVideo = {
  ...mockContextValue,
  state: {
    ...mockContextValue.state,
    isSkipSearchVideo: true,
  },
};

const mockContextValueShouldDebounce = {
  ...mockContextValue,
  state: {
    ...mockContextValue.state,
    shouldDebounce: true,
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

  test("shouldDebounceがtrueの場合、falseに更新され、handleGetModel関数が実行されないこと", async () => {
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
    expect(mockHandleGetModel).not.toHaveBeenCalled();
    expect(mockDispatch).toHaveBeenCalledWith({
      type: "SET_SHOULD_DEBOUNCE",
      payload: false,
    });
    spyOnUseHandleGetModel.mockRestore();
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
