import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import WorldViewList from "components/pages/WorldViewList";
import { WorldViewListProvider } from "hooks/providers/WorldViewListProvider";
import { act } from "react-dom/test-utils";

const mockGetCategoryCheckBoxItems = jest.fn();
const mockGetCountryCheckBoxItems = jest.fn();
const mockGetCharacteristicCheckBoxItems = jest.fn();
const mockHandleClickFilterButton = jest.fn();

jest.mock("hooks/useClickFilterButton", () => ({
  __esModule: true,
  default: () => ({
    handleClickFilterButton: mockHandleClickFilterButton,
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

jest.mock("hooks/api/category/useGetCategoryCheckBoxItems", () => ({
  __esModule: true,
  default: () => ({
    getCategoryCheckBoxItems: mockGetCategoryCheckBoxItems,
  }),
}));

jest.mock("hooks/api/country/useGetCountryCheckBoxItems", () => ({
  __esModule: true,
  default: () => ({
    getCountryCheckBoxItems: mockGetCountryCheckBoxItems,
  }),
}));

jest.mock("hooks/api/characteristic/useGetCharacteristicCheckBoxItems", () => ({
  __esModule: true,
  default: () => ({
    getCharacteristicCheckBoxItems: mockGetCharacteristicCheckBoxItems,
  }),
}));
const mockDispatch = jest.fn();
jest.mock("hooks/providers/WorldViewListProvider", () => ({
  ...jest.requireActual("hooks/providers/WorldViewListProvider"),
  useWorldViewListContext: () => ({
    dispatch: mockDispatch,
    state: {
      ...jest.requireActual("hooks/providers/WorldViewListProvider").useWorldViewListContext()
        .state,
      worldViews: mockWorldViews,
    },
  }),
}));

const mockHandleSearchWorldView = jest.fn();
jest.mock("hooks/api/worldView/useSearchWorldView", () => ({
  __esModule: true,
  default: () => ({ handleSearchWorldView: mockHandleSearchWorldView }),
}));

test("初回レンダリング時にhandleSearchWorldView関数が実行されること", () => {
  render(
    <WorldViewListProvider>
      <WorldViewList />
    </WorldViewListProvider>
  );
  expect(mockHandleSearchWorldView).toHaveBeenCalledTimes(1);
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

test("絞り込みボタンがレンダリングされていること", () => {
  render(
    <WorldViewListProvider>
      <WorldViewList />
    </WorldViewListProvider>
  );
  expect(screen.getByRole("button", { name: "絞り込み" })).toBeInTheDocument();
});

test("絞り込みボタン押下でonOpenFilterDrawer関数が実行されること", async () => {
  const user = userEvent.setup();
  render(
    <WorldViewListProvider>
      <WorldViewList />
    </WorldViewListProvider>
  );
  const filterButton = screen.getByRole("button", { name: "絞り込み" });
  await act(async () => {
    await user.click(filterButton);
  });
  expect(mockHandleClickFilterButton).toHaveBeenCalledTimes(1);
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
