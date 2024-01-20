import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import WorldViewList from "pages/WorldViewListPage";
import { WorldViewListProvider } from "providers/WorldViewListProvider";
import { act } from "react-dom/test-utils";

// useClickFilterButton関数内のuseBreakpointValue関数の戻り値がundefinedになりエラーが発生するのを回避
jest.mock("features/worldView/hooks/useClickFilterButton", () => ({
  __esModule: true,
  default: () => ({
    handleClickFilterButton: jest.fn(),
  }),
}));

const mockWorldViews = Array.from({ length: 30 }, (_, index) => ({
  id: index + 1,
  name: `worldView${index + 1}`,
  imageUrl: "imageUrl",
  bestSeason: "bestSeason",
  countries: [],
  categories: [],
  characteristics: [],
  worldViewFavorites: [],
}));
const mockDispatch = jest.fn();
jest.mock("providers/WorldViewListProvider", () => ({
  ...jest.requireActual("providers/WorldViewListProvider"),
  useWorldViewListContext: () => ({
    dispatch: mockDispatch,
    state: {
      ...jest.requireActual("providers/WorldViewListProvider").useWorldViewListContext().state,
      worldViews: mockWorldViews,
    },
  }),
}));

const mockHandleSearchModel = jest.fn();
jest.mock("hooks/api/useSearchModel", () => ({
  __esModule: true,
  default: () => ({ handleSearchModel: mockHandleSearchModel }),
}));

const mockGetCategoryCheckBoxItems = jest.fn();
jest.mock("features/worldView/hooks/api/useGetCategoryCheckBoxItems", () => ({
  __esModule: true,
  default: () => ({
    getCategoryCheckBoxItems: mockGetCategoryCheckBoxItems,
  }),
}));

const mockGetCountryCheckBoxItems = jest.fn();
jest.mock("features/worldView/hooks/api/useGetCountryCheckBoxItems", () => ({
  __esModule: true,
  default: () => ({
    getCountryCheckBoxItems: mockGetCountryCheckBoxItems,
  }),
}));

const mockGetCharacteristicCheckBoxItems = jest.fn();
jest.mock("features/worldView/hooks/api/useGetCharacteristicCheckBoxItems", () => ({
  __esModule: true,
  default: () => ({
    getCharacteristicCheckBoxItems: mockGetCharacteristicCheckBoxItems,
  }),
}));

describe("handleSearchModel関数のテスト", () => {
  test("初回レンダリング時にhandleSearchModel関数が実行されること", () => {
    const spyOnUseWorldViewApi = jest.spyOn(
      jest.requireActual("features/worldView/api/useWorldViewApi"),
      "default"
    );
    const mockSearchWorldViewApi = jest.fn();
    spyOnUseWorldViewApi.mockReturnValue({ searchWorldViewApi: mockSearchWorldViewApi });

    render(
      <WorldViewListProvider>
        <WorldViewList />
      </WorldViewListProvider>
    );
    expect(mockHandleSearchModel).toHaveBeenCalledWith({
      loadingSearchModelDispatch: expect.any(Function),
      modelDispatch: expect.any(Function),
      searchModelApi: mockSearchWorldViewApi,
    });

    spyOnUseWorldViewApi.mockRestore();
  });
});

test("初回レンダリング時にgetAllCategoriesWithCheckBoxData関数が実行されること", () => {
  render(
    <WorldViewListProvider>
      <WorldViewList />
    </WorldViewListProvider>
  );
  expect(mockGetCategoryCheckBoxItems).toHaveBeenCalledTimes(1);
});

test("初回レンダリング時にgetAllCountriesWithCheckBoxData関数が実行されること", () => {
  render(
    <WorldViewListProvider>
      <WorldViewList />
    </WorldViewListProvider>
  );
  expect(mockGetCountryCheckBoxItems).toHaveBeenCalledTimes(1);
});

test("初回レンダリング時にgetAllCharacteristicsWithCheckBoxData関数が実行されること", () => {
  render(
    <WorldViewListProvider>
      <WorldViewList />
    </WorldViewListProvider>
  );
  expect(mockGetCharacteristicCheckBoxItems).toHaveBeenCalledTimes(1);
});

test("並べ替えのSelectBoxがレンダリングされていること", () => {
  render(
    <WorldViewListProvider>
      <WorldViewList />
    </WorldViewListProvider>
  );
  expect(screen.getByRole("combobox", { name: "並び替えオプションの選択" })).toBeInTheDocument();
});

test("絞り込みのアコーディオンがレンダリングされていること", () => {
  render(
    <WorldViewListProvider>
      <WorldViewList />
    </WorldViewListProvider>
  );
  expect(screen.getByRole("region", { name: "絞り込み" })).toBeInTheDocument();
});

test("絶景一覧がレンダリングされていること", () => {
  render(
    <WorldViewListProvider>
      <WorldViewList />
    </WorldViewListProvider>
  );
  expect(screen.getByRole("list", { name: "絶景一覧" })).toBeInTheDocument();
});

describe("ページネーションのテスト", () => {
  test("ページネーションが表示されていること", () => {
    render(
      <WorldViewListProvider>
        <WorldViewList />
      </WorldViewListProvider>
    );
    expect(screen.getByRole("navigation", { name: "ページネーション" })).toBeInTheDocument();
  });

  test("worldViewsの1ページ目が表示されていること", () => {
    render(
      <WorldViewListProvider>
        <WorldViewList />
      </WorldViewListProvider>
    );
    for (let i = 1; i <= 10; i += 1) {
      const worldViewElement = screen.getByText(`worldView${i}`);
      expect(worldViewElement).toBeInTheDocument();
    }
  });

  test("nextボタン押下で、worldViewsの次のページに遷移し、priviousボタンで前のページに戻ること", async () => {
    const user = userEvent.setup();
    render(
      <WorldViewListProvider>
        <WorldViewList />
      </WorldViewListProvider>
    );
    await act(async () => {
      await user.click(screen.getByRole("button", { name: "次のページに移動" }));
    });
    for (let i = 11; i <= 20; i += 1) {
      const worldViewElement = screen.getByText(`worldView${i}`);
      expect(worldViewElement).toBeInTheDocument();
    }
    await act(async () => {
      await user.click(screen.getByRole("button", { name: "前のページに移動" }));
    });
    for (let i = 1; i <= 10; i += 1) {
      const worldViewElement = screen.getByText(`worldView${i}`);
      expect(worldViewElement).toBeInTheDocument();
    }
  });

  test("2ページ目への遷移ボタン押下で2ページ目に遷移すること", async () => {
    const user = userEvent.setup();
    render(
      <WorldViewListProvider>
        <WorldViewList />
      </WorldViewListProvider>
    );
    await act(async () => {
      await user.click(screen.getByRole("button", { name: `ページ2に移動` }));
    });
    for (let i = 11; i <= 20; i += 1) {
      const worldViewElement = screen.getByText(`worldView${i}`);
      expect(worldViewElement).toBeInTheDocument();
    }
  });

  test("3ページ目への遷移ボタン押下で3ページ目に遷移すること", async () => {
    const user = userEvent.setup();
    render(
      <WorldViewListProvider>
        <WorldViewList />
      </WorldViewListProvider>
    );
    await act(async () => {
      await user.click(screen.getByRole("button", { name: `ページ3に移動` }));
    });
    for (let i = 21; i <= 30; i += 1) {
      const worldViewElement = screen.getByText(`worldView${i}`);
      expect(worldViewElement).toBeInTheDocument();
    }
  });
});
