import { render, screen } from "@testing-library/react";
import Map from "features/map/components/ui-parts/Map";
import mockGetAllCategoriesApi from "features/worldView/api/categoryApi";
import mockGetAllCharacteristicsApi from "features/worldView/api/characteristicApi";
import mockGetAllCountriesApi from "features/worldView/api/countryApi";
import { useWorldViewListContext as mockUseWorldViewListContext } from "providers/WorldViewListProvider";
import { act } from "react-dom/test-utils";

jest.mock("lib/client", () => ({
  __esModule: true,
  default: jest.fn(),
}));

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
    riskLevel: 0,
    sortCriteria: "",
    isSkipSearchWorldViews: false,
    shouldDebounce: false,
    isSkipGetCheckItmes: false,
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

const mockContextValueSkipGetCheckItems = {
  ...mockContextValue,
  state: {
    ...mockContextValue.state,
    isSkipGetCheckItmes: true,
  },
};

const mockSearchWorldViewApi = jest.fn();
jest.mock("features/worldView/api/useWorldViewApi", () => ({
  __esModule: true,
  default: () => ({ searchWorldViewApi: mockSearchWorldViewApi }),
}));

jest.mock("features/worldView/api/categoryApi", () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock("features/worldView/api/countryApi", () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock("features/worldView/api/characteristicApi", () => ({
  __esModule: true,
  default: jest.fn(),
}));

test("isSkipSearchWorldViewsがtrueの場合、falseに更新されること", () => {
  (mockUseWorldViewListContext as jest.Mock).mockReturnValue(
    mockContextValueIsSkipSearchWorldViews
  );
  render(<Map />);
  expect(mockDispatch).toHaveBeenCalledWith({
    type: "SET_IS_SKIP_SEARCH_WORLD_VIEWS",
    payload: false,
  });
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

describe("handleGetNestedCheckItems関数のテスト", () => {
  test("isSkipGetCheckItmesがtrueの場合、falseに更新されること", async () => {
    (mockUseWorldViewListContext as jest.Mock).mockReturnValue(mockContextValueSkipGetCheckItems);
    await act(async () => {
      render(<Map />);
    });
    expect(mockDispatch).toHaveBeenCalledWith({
      type: "SET_IS_SKIP_GET_CHECK_ITEMS",
      payload: false,
    });
  });

  test("初回レンダリング時にhandleGetNestedCheckItems関数が2回実行されること", async () => {
    (mockUseWorldViewListContext as jest.Mock).mockReturnValue(mockContextValue);

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
      render(<Map />);
    });
    expect(mockHandleGetNestedCheckItems).toHaveBeenCalledWith({
      loadingGetModelDispatch: expect.any(Function),
      checkItemsDispatch: expect.any(Function),
      getAllModelApi: mockGetAllCategoriesApi,
    });
    expect(mockHandleGetNestedCheckItems).toHaveBeenCalledWith({
      loadingGetModelDispatch: expect.any(Function),
      checkItemsDispatch: expect.any(Function),
      getAllModelApi: mockGetAllCountriesApi,
    });
    expect(mockHandleGetNestedCheckItems).toHaveBeenCalledTimes(2);
    spyOnUseGetNestedCheckItems.mockRestore();
  });

  test("初回レンダリング時にhandleGetNestedCheckItems関数内でloadingGetCategoryDispatchが呼び出されること", async () => {
    (mockUseWorldViewListContext as jest.Mock).mockReturnValue(mockContextValue);

    await act(async () => {
      render(<Map />);
    });
    expect(mockDispatch).toHaveBeenCalledWith({ type: "SET_LOADING_GET_CATEGORY", payload: true });
    expect(mockDispatch).toHaveBeenCalledWith({ type: "SET_LOADING_GET_CATEGORY", payload: false });
  });

  test("初回レンダリング時にhandleGetNestedCheckItems関数内でcategoryCheckItemsDispatchが呼び出されること", async () => {
    (mockUseWorldViewListContext as jest.Mock).mockReturnValue(mockContextValue);
    (mockGetAllCategoriesApi as jest.Mock).mockReturnValue({
      data: [{ id: 1, name: "name", parent: "parentName" }],
    });

    await act(async () => {
      render(<Map />);
    });
    expect(mockDispatch).toHaveBeenCalledWith({
      type: "SET_CATEGORY_CHECK_ITEMS",
      payload: [
        {
          label: "name",
          parentLabel: "parentName",
          checked: false,
          isVisible: false,
        },
      ],
    });
  });

  test("初回レンダリング時にhandleGetNestedCheckItems関数内でloadingGetCountryDispatchが呼び出されること", async () => {
    (mockUseWorldViewListContext as jest.Mock).mockReturnValue(mockContextValue);

    await act(async () => {
      render(<Map />);
    });
    expect(mockDispatch).toHaveBeenCalledWith({ type: "SET_LOADING_GET_COUNTRY", payload: true });
    expect(mockDispatch).toHaveBeenCalledWith({ type: "SET_LOADING_GET_COUNTRY", payload: false });
  });

  test("初回レンダリング時にhandleGetNestedCheckItems関数内でcountryCheckItemsDispatchが呼び出されること", async () => {
    (mockUseWorldViewListContext as jest.Mock).mockReturnValue(mockContextValue);
    (mockGetAllCountriesApi as jest.Mock).mockReturnValue({
      data: [{ id: 1, name: "name", parent: "parentName" }],
    });

    await act(async () => {
      render(<Map />);
    });
    expect(mockDispatch).toHaveBeenCalledWith({
      type: "SET_COUNTRY_CHECK_ITEMS",
      payload: [
        {
          label: "name",
          parentLabel: "parentName",
          checked: false,
          isVisible: false,
        },
      ],
    });
  });
});

describe("handleGetCheckItems関数のテスト", () => {
  test("初回レンダリング時にhandleGetCheckItems関数が実行されること", async () => {
    (mockUseWorldViewListContext as jest.Mock).mockReturnValue(mockContextValue);

    // handleGetCheckItems関数をモック化
    const spyOnUseGetNestedCheckItems = jest.spyOn(
      jest.requireActual("hooks/api/useGetCheckItems"),
      "default"
    );
    const mockHandleGetCheckItems = jest.fn();
    spyOnUseGetNestedCheckItems.mockReturnValue({
      handleGetCheckItems: mockHandleGetCheckItems,
    });

    await act(async () => {
      render(<Map />);
    });
    expect(mockHandleGetCheckItems).toHaveBeenCalledWith({
      loadingGetModelDispatch: expect.any(Function),
      checkItemsDispatch: expect.any(Function),
      getModelApi: mockGetAllCharacteristicsApi,
    });
    spyOnUseGetNestedCheckItems.mockRestore();
  });

  test("初回レンダリング時にhandleGetCheckItems関数内でloadingGetCharacteristicDispatch関数が呼び出されること", async () => {
    (mockUseWorldViewListContext as jest.Mock).mockReturnValue(mockContextValue);

    await act(async () => {
      render(<Map />);
    });
    expect(mockDispatch).toHaveBeenCalledWith({
      type: "SET_LOADING_GET_CHARACTERISTIC",
      payload: true,
    });
    expect(mockDispatch).toHaveBeenCalledWith({
      type: "SET_LOADING_GET_CHARACTERISTIC",
      payload: false,
    });
  });

  test("初回レンダリング時にhandleGetCheckItems関数内でcharacteristicCheckItemsDispatch関数が呼び出されること", async () => {
    (mockUseWorldViewListContext as jest.Mock).mockReturnValue(mockContextValue);
    (mockGetAllCharacteristicsApi as jest.Mock).mockReturnValue({
      data: [{ id: 1, name: "name" }],
    });

    await act(async () => {
      render(<Map />);
    });
    expect(mockDispatch).toHaveBeenCalledWith({
      type: "SET_CHARACTERISTIC_CHECK_ITEMS",
      payload: [
        {
          label: "name",
          checked: false,
        },
      ],
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
