import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import WorldViewList from "features/worldView/pages/WorldViewListPage";
import { useWorldViewListContext as mockUseWorldViewListContext } from "providers/WorldViewListProvider";
import { act } from "react-dom/test-utils";

window.scrollTo = jest.fn();
global.ResizeObserver = require("resize-observer-polyfill");

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

jest.mock("providers/WorldViewListProvider", () => ({
  useWorldViewListContext: jest.fn(),
}));

const mockDispatch = jest.fn();
const mockWorldViews = Array.from({ length: 120 }, (_, index) => ({
  id: index + 1,
  name: `worldView${index + 1}`,
  imageUrl: "imageUrl",
  bestSeason: "bestSeason",
  countries: [],
  categories: [],
  characteristics: [],
  worldViewFavorites: [],
}));

const mockContextValue = {
  dispatch: mockDispatch,
  state: {
    categoryCheckItems: [],
    countryCheckItems: [],
    characteristicCheckItems: [],
    riskLevel: undefined,
    monthRange: [1, 12],
    bmiRange: [-40, 30],
    keyword: "",
    loadingSearchWorldViews: false,
    loadingGetCategory: false,
    loadingGetCountry: false,
    loadingGetCharacteristic: false,
    isDisabledSeachButton: false,
    isSkipSearchWorldViews: false,
    shouldDebounce: false,
    sortCriteria: "",
    worldViews: mockWorldViews,
    currentPage: 1,
    itemsOffset: 0,
  },
};

const mockContextValueIsSkipSearchApi = {
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

const mockContextValueCurrentPage2 = {
  ...mockContextValue,
  state: {
    ...mockContextValue.state,
    currentPage: 2,
    itemsOffset: 40,
  },
};

const mockHandleGetModel = jest.fn();
jest.mock("hooks/api/useGetModel", () => ({
  __esModule: true,
  default: () => ({ handleGetModel: mockHandleGetModel }),
}));

const mockHandleGetNestedCheckItems = jest.fn();
jest.mock("hooks/api/useGetNestedCheckItems", () => ({
  __esModule: true,
  default: () => ({
    handleGetNestedCheckItems: mockHandleGetNestedCheckItems,
  }),
}));

const mockHandleGetCheckItems = jest.fn();
jest.mock("hooks/api/useGetCheckItems", () => ({
  __esModule: true,
  default: () => ({
    handleGetCheckItems: mockHandleGetCheckItems,
  }),
}));

test("isSkipSearchWorldViewsがtrueの場合、falseに更新されること", () => {
  (mockUseWorldViewListContext as jest.Mock).mockReturnValue(mockContextValueIsSkipSearchApi);
  render(<WorldViewList />);
  expect(mockDispatch).toHaveBeenCalledWith({
    type: "SET_IS_SKIP_SEARCH_WORLD_VIEWS",
    payload: false,
  });
});

test("shouldDebounceがtrueの場合、flaseに更新されること", () => {
  (mockUseWorldViewListContext as jest.Mock).mockReturnValue(mockContextValueShouldDebounce);
  render(<WorldViewList />);
  expect(mockDispatch).toHaveBeenCalledWith({ type: "SET_SHOULD_DEBOUNCE", payload: false });
});

test("worldViewレコードの絞り込み時に、ページネーションが1ページ目ではない場合はcurrentPageが1にitemsOffsetが0に更新されること", () => {
  (mockUseWorldViewListContext as jest.Mock).mockReturnValue(mockContextValueCurrentPage2);
  render(<WorldViewList />);
  expect(mockDispatch).toHaveBeenCalledWith({ type: "SET_CURRENT_PAGE", payload: 1 });
  expect(mockDispatch).toHaveBeenCalledWith({ type: "SET_ITEMS_OFFSET", payload: 0 });
});

describe("handleGetModel関数のテスト", () => {
  test("初回レンダリング時にhandleGetModel関数が実行されること", () => {
    (mockUseWorldViewListContext as jest.Mock).mockReturnValue(mockContextValue);
    const spyOnUseWorldViewApi = jest.spyOn(
      jest.requireActual("features/worldView/api/useWorldViewApi"),
      "default"
    );
    const mockSearchWorldViewApi = jest.fn();
    spyOnUseWorldViewApi.mockReturnValue({ searchWorldViewApi: mockSearchWorldViewApi });

    render(<WorldViewList />);
    expect(mockHandleGetModel).toHaveBeenCalledWith({
      loadingGetModelDispatch: expect.any(Function),
      modelDispatch: expect.any(Function),
      getModelApi: mockSearchWorldViewApi,
    });

    spyOnUseWorldViewApi.mockRestore();
  });
});

describe("handleGetNestedCheckItems関数のテスト", () => {
  test("初回レンダリング時にhandleGetNestedCheckItems関数が2回実行されること", () => {
    (mockUseWorldViewListContext as jest.Mock).mockReturnValue(mockContextValue);
    const spyOnGetAllCategoriesApi = jest.spyOn(
      jest.requireActual("features/worldView/api/categoryApi"),
      "default"
    );
    const spyOnCountryApi = jest.spyOn(
      jest.requireActual("features/worldView/api/countryApi"),
      "default"
    );
    render(<WorldViewList />);
    expect(mockHandleGetNestedCheckItems).toHaveBeenCalledWith({
      loadingGetModelDispatch: expect.any(Function),
      checkItemsDispatch: expect.any(Function),
      getAllModelApi: spyOnGetAllCategoriesApi,
    });
    expect(mockHandleGetNestedCheckItems).toHaveBeenCalledWith({
      loadingGetModelDispatch: expect.any(Function),
      checkItemsDispatch: expect.any(Function),
      getAllModelApi: spyOnCountryApi,
    });
    expect(mockHandleGetNestedCheckItems).toHaveBeenCalledTimes(2);
  });
});

describe("handleGetCheckItems関数のテスト", () => {
  test("初回レンダリング時にhandleGetCheckItems関数が実行されること", () => {
    (mockUseWorldViewListContext as jest.Mock).mockReturnValue(mockContextValue);
    const spyOnGetAllCharacteristicsApi = jest.spyOn(
      jest.requireActual("features/worldView/api/characteristicApi"),
      "default"
    );
    render(<WorldViewList />);
    expect(mockHandleGetCheckItems).toHaveBeenCalledWith({
      loadingGetModelDispatch: expect.any(Function),
      checkItemsDispatch: expect.any(Function),
      getModelApi: spyOnGetAllCharacteristicsApi,
    });
  });
});

test("FilterButtonがレンダリングされていること", () => {
  (mockUseWorldViewListContext as jest.Mock).mockReturnValue(mockContextValue);
  render(<WorldViewList />);
  expect(screen.getByRole("button", { name: "フィルター" })).toBeInTheDocument();
});

test("並べ替えのSelectがレンダリングされていること", () => {
  (mockUseWorldViewListContext as jest.Mock).mockReturnValue(mockContextValue);
  render(<WorldViewList />);
  expect(screen.getByRole("combobox", { name: "並び替えオプションの選択" })).toBeInTheDocument();
});

describe("クリアボタンのテスト", () => {
  describe("WorldViewモデルのフィルターの値が初期値の場合", () => {
    test("クリアボタンが非表示であること", async () => {
      (mockUseWorldViewListContext as jest.Mock).mockReturnValue(mockContextValue);
      render(<WorldViewList />);
      expect(screen.queryByRole("button", { name: "クリア" })).not.toBeInTheDocument();
    });
  });

  describe("WorldViewモデルのフィルターの値が初期値でない場合", () => {
    test("クリアボタンがレンダリングされていること", async () => {
      (mockUseWorldViewListContext as jest.Mock).mockReturnValue(mockContextValue);
      const spyOnUseGetCheckedLabels = jest.spyOn(
        jest.requireActual("features/worldView/hooks/useGetCheckedLabels"),
        "default"
      );
      spyOnUseGetCheckedLabels.mockReturnValue({ checkedLabelObject: { categoryLabels: "遺跡" } });
      render(<WorldViewList />);
      expect(screen.getByRole("button", { name: "クリア" })).toBeInTheDocument();
      spyOnUseGetCheckedLabels.mockRestore();
    });

    test("クリアボタン押下でhandleClear関数が呼び出されること", async () => {
      (mockUseWorldViewListContext as jest.Mock).mockReturnValue(mockContextValue);
      const spyOnUseGetCheckedLabels = jest.spyOn(
        jest.requireActual("features/worldView/hooks/useGetCheckedLabels"),
        "default"
      );
      spyOnUseGetCheckedLabels.mockReturnValue({ checkedLabelObject: { categoryLabels: "遺跡" } });
      const spyOnUseClear = jest.spyOn(
        jest.requireActual("features/worldView/hooks/useClear"),
        "default"
      );
      const mockHandleClear = jest.fn();
      spyOnUseClear.mockReturnValue({ handleClear: mockHandleClear });
      const user = userEvent.setup();
      render(<WorldViewList />);
      await act(async () => {
        await user.click(screen.getByRole("button", { name: "クリア" }));
      });
      expect(mockHandleClear).toHaveBeenCalledTimes(1);
      spyOnUseClear.mockRestore();
      spyOnUseGetCheckedLabels.mockRestore();
    });
  });
});

test("絞り込みのアコーディオンがレンダリングされていること", () => {
  (mockUseWorldViewListContext as jest.Mock).mockReturnValue(mockContextValue);
  render(<WorldViewList />);
  expect(screen.getByRole("region", { name: "絞り込みのアコーディオン" })).toBeInTheDocument();
});

test("絶景一覧がレンダリングされていること", () => {
  (mockUseWorldViewListContext as jest.Mock).mockReturnValue(mockContextValue);
  render(<WorldViewList />);
  expect(screen.getByRole("list", { name: "絶景一覧" })).toBeInTheDocument();
});

describe("ページネーションのテスト", () => {
  test("ページネーションが表示されていること", () => {
    (mockUseWorldViewListContext as jest.Mock).mockReturnValue(mockContextValue);
    render(<WorldViewList />);
    expect(screen.getByRole("navigation", { name: "ページネーション" })).toBeInTheDocument();
  });

  test("worldViewsの1ページ目が表示されていること", () => {
    (mockUseWorldViewListContext as jest.Mock).mockReturnValue(mockContextValue);
    render(<WorldViewList />);
    expect(screen.getByText(`worldView1`)).toBeInTheDocument();
  });

  test("nextボタン押下で、次のページに遷移しすること", async () => {
    (mockUseWorldViewListContext as jest.Mock).mockReturnValue(mockContextValue);
    const user = userEvent.setup();
    render(<WorldViewList />);
    await act(async () => {
      await user.click(screen.getByRole("button", { name: "次のページに移動" }));
    });
    expect(mockDispatch).toHaveBeenCalledWith({ type: "SET_CURRENT_PAGE", payload: 2 });
    expect(mockDispatch).toHaveBeenCalledWith({ type: "SET_ITEMS_OFFSET", payload: 40 });
  });

  test("priviousボタンで前のページに戻ること", async () => {
    (mockUseWorldViewListContext as jest.Mock).mockReturnValue(mockContextValueCurrentPage2);
    const user = userEvent.setup();
    render(<WorldViewList />);
    await act(async () => {
      await user.click(screen.getByRole("button", { name: "前のページに移動" }));
    });
    expect(mockDispatch).toHaveBeenCalledWith({ type: "SET_CURRENT_PAGE", payload: 1 });
    expect(mockDispatch).toHaveBeenCalledWith({ type: "SET_ITEMS_OFFSET", payload: 0 });
  });

  test("2ページ目への遷移ボタン押下で2ページ目に遷移すること", async () => {
    (mockUseWorldViewListContext as jest.Mock).mockReturnValue(mockContextValue);
    const user = userEvent.setup();
    render(<WorldViewList />);
    await act(async () => {
      await user.click(screen.getByRole("button", { name: `ページ2に移動` }));
    });
    expect(mockDispatch).toHaveBeenCalledWith({ type: "SET_CURRENT_PAGE", payload: 2 });
    expect(mockDispatch).toHaveBeenCalledWith({ type: "SET_ITEMS_OFFSET", payload: 40 });
  });

  test("3ページ目への遷移ボタン押下で3ページ目に遷移すること", async () => {
    (mockUseWorldViewListContext as jest.Mock).mockReturnValue(mockContextValue);
    const user = userEvent.setup();
    render(<WorldViewList />);
    await act(async () => {
      await user.click(screen.getByRole("button", { name: `ページ3に移動` }));
    });
    expect(mockDispatch).toHaveBeenCalledWith({ type: "SET_CURRENT_PAGE", payload: 3 });
    expect(mockDispatch).toHaveBeenCalledWith({ type: "SET_ITEMS_OFFSET", payload: 80 });
  });
});
