import { render } from "@testing-library/react";
import GetWorldViewHandler from "components/ui-elements/GetWorldViewHandler";
import { useWorldViewListContext as mockUseWorldViewListContext } from "providers/WorldViewListProvider";
import { act } from "react-dom/test-utils";

jest.mock("lib/client", () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock("react-leaflet", () => ({
  ...jest.requireActual("react-leaflet"),
  useMapEvents: jest.fn(),
}));

jest.mock("providers/WorldViewListProvider", () => ({
  useWorldViewListContext: jest.fn(),
}));

const mockDispatch = jest.fn();
const mockContextValue = {
  dispatch: mockDispatch,
  state: {
    isSkipSearchWorldViews: false,
    isVisitedDetailPage: false,
    shouldDebounce: false,
    currentPage: 1,
    itemsOffset: 0,
  },
};

const mockContextValueIsSkipSearchWorldViews = {
  ...mockContextValue,
  state: {
    ...mockContextValue.state,
    isSkipSearchWorldViews: true,
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
    itemsOffset: 40,
  },
};

const mockHandleDebounce = jest.fn();
jest.mock("hooks/useDebounce", () => ({
  __esModule: true,
  default: () => ({
    handleDebounce: mockHandleDebounce,
  }),
}));

const mockSearchWorldViewApi = jest.fn();
jest.mock("features/worldView/api/useWorldViewApi", () => ({
  __esModule: true,
  default: () => ({ searchWorldViewApi: mockSearchWorldViewApi }),
}));

describe("初回レンダリング時の挙動のテスト", () => {
  test("isSkipSearchWorldViewsがtrueの場合、falseに更新され、handleGetModel関数が実行されないこと", async () => {
    (mockUseWorldViewListContext as jest.Mock).mockReturnValue(
      mockContextValueIsSkipSearchWorldViews
    );

    // handleGetModel関数のモック化
    const spyOnUseHandleGetModel = jest.spyOn(
      jest.requireActual("hooks/api/useGetModel"),
      "default"
    );
    const mockHandleGetModel = jest.fn();
    spyOnUseHandleGetModel.mockReturnValue({ handleGetModel: mockHandleGetModel });

    await act(async () => {
      render(<GetWorldViewHandler />);
    });
    expect(mockHandleGetModel).not.toHaveBeenCalled();
    expect(mockDispatch).toHaveBeenCalledWith({
      type: "SET_IS_SKIP_SEARCH_WORLD_VIEWS",
      payload: false,
    });
    spyOnUseHandleGetModel.mockRestore();
  });

  test("isVisitedDetailPageがtrueの場合、falseに更新され、handleGetModel関数が実行されないこと", async () => {
    (mockUseWorldViewListContext as jest.Mock).mockReturnValue(mockContextValueVisitedDetailPage);

    // handleGetModel関数のモック化
    const spyOnUseHandleGetModel = jest.spyOn(
      jest.requireActual("hooks/api/useGetModel"),
      "default"
    );
    const mockHandleGetModel = jest.fn();
    spyOnUseHandleGetModel.mockReturnValue({ handleGetModel: mockHandleGetModel });

    await act(async () => {
      render(<GetWorldViewHandler />);
    });
    expect(mockHandleGetModel).not.toHaveBeenCalled();
    expect(mockDispatch).toHaveBeenCalledWith({ type: "SET_IS_VISIT_DETAIL_PAGE", payload: false });
    spyOnUseHandleGetModel.mockRestore();
  });

  test("shouldDebounceがtrueの場合、falseに更新され、handleGetModel関数が実行されないこと", async () => {
    (mockUseWorldViewListContext as jest.Mock).mockReturnValue(mockContextValueShouldDebounce);

    // handleGetModel関数のモック化
    const spyOnUseHandleGetModel = jest.spyOn(
      jest.requireActual("hooks/api/useGetModel"),
      "default"
    );
    const mockHandleGetModel = jest.fn();
    spyOnUseHandleGetModel.mockReturnValue({ handleGetModel: mockHandleGetModel });

    await act(async () => {
      render(<GetWorldViewHandler />);
    });
    expect(mockHandleGetModel).not.toHaveBeenCalled();
    expect(mockDispatch).toHaveBeenCalledWith({
      type: "SET_SHOULD_DEBOUNCE",
      payload: false,
    });
    spyOnUseHandleGetModel.mockRestore();
  });

  test("ページネーションが1ページ目ではない場合はcurrentPageが1にitemsOffsetが0に更新されること", async () => {
    (mockUseWorldViewListContext as jest.Mock).mockReturnValue(mockContextValueCurrentPage2);

    await act(async () => {
      render(<GetWorldViewHandler />);
    });
    expect(mockDispatch).toHaveBeenCalledWith({ type: "SET_CURRENT_PAGE", payload: 1 });
    expect(mockDispatch).toHaveBeenCalledWith({ type: "SET_ITEMS_OFFSET", payload: 0 });
  });

  describe("handleGetModel関数のテスト", () => {
    test("handleGetModel関数が実行されること", async () => {
      (mockUseWorldViewListContext as jest.Mock).mockReturnValue(mockContextValue);

      // handleGetModel関数のモック化
      const spyOnUseHandleGetModel = jest.spyOn(
        jest.requireActual("hooks/api/useGetModel"),
        "default"
      );
      const mockHandleGetModel = jest.fn();
      spyOnUseHandleGetModel.mockReturnValue({ handleGetModel: mockHandleGetModel });

      await act(async () => {
        render(<GetWorldViewHandler />);
      });
      expect(mockHandleGetModel).toHaveBeenCalledWith({
        loadingGetModelDispatch: expect.any(Function),
        modelDispatch: expect.any(Function),
        getModelApi: mockSearchWorldViewApi,
      });
      spyOnUseHandleGetModel.mockRestore();
    });

    test("handleGetModel関数内でworldViewDispatch関数が呼び出されること", async () => {
      (mockUseWorldViewListContext as jest.Mock).mockReturnValue(mockContextValue);
      mockSearchWorldViewApi.mockReturnValue({ data: [{ id: 1, name: "name" }] });

      await act(async () => {
        render(<GetWorldViewHandler />);
      });
      expect(mockDispatch).toHaveBeenCalledWith({
        type: "SET_WORLD_VIEWS",
        payload: [{ id: 1, name: "name" }],
      });
    });

    test("handleGetModel関数内でloadingSearchWorldViewDispatch関数が呼び出されること", async () => {
      (mockUseWorldViewListContext as jest.Mock).mockReturnValue(mockContextValue);

      await act(async () => {
        render(<GetWorldViewHandler />);
      });
      expect(mockDispatch).toHaveBeenCalledWith({
        type: "SET_LOADING_SEARCH_WORLDVIEWS",
        payload: true,
      });
      expect(mockDispatch).toHaveBeenCalledWith({
        type: "SET_LOADING_SEARCH_WORLDVIEWS",
        payload: false,
      });
    });
  });
});
