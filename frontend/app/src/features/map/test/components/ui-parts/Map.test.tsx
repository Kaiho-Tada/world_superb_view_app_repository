import { render, screen } from "@testing-library/react";
import Map from "features/map/components/ui-parts/Map";
import { useWorldViewListContext as mockUseWorldViewListContext } from "providers/WorldViewListProvider";
import { act } from "react-dom/test-utils";

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
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
    isSkipSearchApi: false,
    shouldDebounce: false,
  },
};

const mockContextValueIsSkipSearchApi = {
  ...mockContextValue,
  state: {
    ...mockContextValue.state,
    isSkipSearchApi: true,
  },
};

const mockContextValueShouldDebounce = {
  ...mockContextValue,
  state: {
    ...mockContextValue.state,
    shouldDebounce: true,
  },
};

const mockSearchWorldViewApi = jest.fn();
jest.mock("features/worldView/api/useWorldViewApi", () => ({
  __esModule: true,
  default: () => ({ searchWorldViewApi: mockSearchWorldViewApi }),
}));

test("isSkipSearchApiがtrueの場合、falseに更新されること", () => {
  (mockUseWorldViewListContext as jest.Mock).mockReturnValue(mockContextValueIsSkipSearchApi);
  render(<Map />);
  expect(mockDispatch).toHaveBeenCalledWith({ type: "SET_IS_SKIP_SEARCH_API", payload: false });
});

test("shouldDebounceがtrueの場合、flaseに更新されること", () => {
  (mockUseWorldViewListContext as jest.Mock).mockReturnValue(mockContextValueShouldDebounce);
  render(<Map />);
  expect(mockDispatch).toHaveBeenCalledWith({ type: "SET_SHOULD_DEBOUNCE", payload: false });
});

describe("handleGetModel関数のテスト", () => {
  test("初回レンダリング時にhandleGetModel関数が実行されること", async () => {
    (mockUseWorldViewListContext as jest.Mock).mockReturnValue(mockContextValue);

    // handleGetModel関数のモック化
    const spyOnUseHandleGetModel = jest.spyOn(
      jest.requireActual("hooks/api/useGetModel"),
      "default"
    );
    const mockHandleGetModel = jest.fn();
    spyOnUseHandleGetModel.mockReturnValue({ handleGetModel: mockHandleGetModel });

    await act(async () => {
      render(<Map />);
    });
    expect(mockHandleGetModel).toHaveBeenCalledWith({
      loadingGetModelDispatch: expect.any(Function),
      modelDispatch: expect.any(Function),
      getModelApi: mockSearchWorldViewApi,
    });
    spyOnUseHandleGetModel.mockRestore();
  });

  test("初回レンダリング時にhandleGetModel関数内でworldViewDispatch関数が呼び出されること", async () => {
    (mockUseWorldViewListContext as jest.Mock).mockReturnValue(mockContextValue);
    mockSearchWorldViewApi.mockReturnValue({ data: [{ id: 1, name: "name" }] });

    await act(async () => {
      render(<Map />);
    });
    expect(mockDispatch).toHaveBeenCalledWith({
      type: "SET_WORLD_VIEWS",
      payload: [{ id: 1, name: "name" }],
    });
  });

  test("初回レンダリング時にhandleGetModel関数内でloadingSearchWorldViewDispatch関数が呼び出されること", async () => {
    (mockUseWorldViewListContext as jest.Mock).mockReturnValue(mockContextValue);

    await act(async () => {
      render(<Map />);
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

test("ズームボタンが表示されていること", () => {
  (mockUseWorldViewListContext as jest.Mock).mockReturnValue(mockContextValue);
  render(<Map />);
  expect(screen.getByRole("button", { name: "Zoom in" }));
});

test("ズームアウトボタンが表示されていること", () => {
  (mockUseWorldViewListContext as jest.Mock).mockReturnValue(mockContextValue);
  render(<Map />);
  expect(screen.getByRole("button", { name: "Zoom out" }));
});

test("絶景画像が地図上に表示されていること", () => {
  (mockUseWorldViewListContext as jest.Mock).mockReturnValue(mockContextValue);
  render(<Map />);
  const WorldViewImgs = screen.getAllByRole("img", { name: "絶景画像" });
  expect(WorldViewImgs.length).toBe(3);
});
