import { render } from "@testing-library/react";
import ClickWorldViewHandler from "features/map/components/ui-elements/ClickWorldViewHandler";
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
const mockWorldViews = Array.from({ length: 3 }, (_, index) => ({
  id: index + 1,
  name: `worldView${index + 1}`,
  imageUrl: "imageUrl",
  bestSeason: "bestSeason",
  countries: [],
  categories: [],
  characteristics: [],
  worldViewFavorites: [],
  videos: [],
  latitude: index + 1,
  longitude: index + 1,
}));

const mockContextValue = {
  dispatch: mockDispatch,
  state: {
    worldViews: mockWorldViews,
    categoryCheckItems: [],
    countryCheckItems: [],
    characteristicCheckItems: [],
    keyword: "",
    riskLevel: 0,
    sortCriteria: "",
    isSkipSearchWorldViews: false,
    shouldDebounce: false,
  },
};

const mockContextValueIsSkipSearchWorldViews = {
  ...mockContextValue,
  state: {
    ...mockContextValue.state,
    isSkipSearchWorldViews: true,
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

const mockSearchWorldViewApi = jest.fn();
jest.mock("features/worldView/api/useWorldViewApi", () => ({
  __esModule: true,
  default: () => ({ searchWorldViewApi: mockSearchWorldViewApi }),
}));

describe("初回レンダリング時の挙動のテスト", () => {
  test("isSkipSearchWorldViewsがtrueの場合、falseに更新され、handleGetModel関数が実行されないこと", () => {
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

    render(<ClickWorldViewHandler />);
    expect(mockHandleGetModel).not.toHaveBeenCalled();
    expect(mockDispatch).toHaveBeenCalledWith({
      type: "SET_IS_SKIP_SEARCH_WORLD_VIEWS",
      payload: false,
    });
    spyOnUseHandleGetModel.mockRestore();
  });

  test("shouldDebounceがtrueの場合、falseに更新され、handleGetModel関数が実行されないこと", () => {
    (mockUseWorldViewListContext as jest.Mock).mockReturnValue(mockContextValueShouldDebounce);

    // handleGetModel関数のモック化
    const spyOnUseHandleGetModel = jest.spyOn(
      jest.requireActual("hooks/api/useGetModel"),
      "default"
    );
    const mockHandleGetModel = jest.fn();
    spyOnUseHandleGetModel.mockReturnValue({ handleGetModel: mockHandleGetModel });

    render(<ClickWorldViewHandler />);
    expect(mockHandleGetModel).not.toHaveBeenCalled();
    expect(mockDispatch).toHaveBeenCalledWith({
      type: "SET_SHOULD_DEBOUNCE",
      payload: false,
    });
    spyOnUseHandleGetModel.mockRestore();
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
        render(<ClickWorldViewHandler />);
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
        render(<ClickWorldViewHandler />);
      });
      expect(mockDispatch).toHaveBeenCalledWith({
        type: "SET_WORLD_VIEWS",
        payload: [{ id: 1, name: "name" }],
      });
    });

    test("handleGetModel関数内でloadingSearchWorldViewDispatch関数が呼び出されること", async () => {
      (mockUseWorldViewListContext as jest.Mock).mockReturnValue(mockContextValue);

      await act(async () => {
        render(<ClickWorldViewHandler />);
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
