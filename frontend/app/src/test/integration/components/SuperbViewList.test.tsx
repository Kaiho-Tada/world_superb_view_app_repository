import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SuperbViewList from "components/pages/SuperbViewList";
import { SuperbViewListProvider } from "hooks/providers/SuperbViewListProvider";
import { act } from "react-dom/test-utils";

const mockOnOpenFilterDrawer = jest.fn();
const mockGetCategoryCheckBoxItems = jest.fn();
const mockGetCountryCheckBoxItems = jest.fn();
const mockGetCharacteristicCheckBoxItems = jest.fn();

const mockSuperbViews = Array.from({ length: 30 }, (_, index) => ({
  id: index + 1,
  name: `superbView${index + 1}`,
  imageUrl: "imageUrl",
  bestSeason: "bestSeason",
  countries: [],
  categories: [],
  characteristics: [],
}));

jest.mock("hooks/providers/SuperbViewListProvider", () => ({
  ...jest.requireActual("hooks/providers/SuperbViewListProvider"),
  useSuperbViewListContext: () => ({
    ...jest.requireActual("hooks/providers/SuperbViewListProvider").useSuperbViewListContext(),
    getCategoryCheckBoxItems: mockGetCategoryCheckBoxItems,
    getCountryCheckBoxItems: mockGetCountryCheckBoxItems,
    getCharacteristicCheckBoxItems: mockGetCharacteristicCheckBoxItems,
    onOpenFilterDrawer: mockOnOpenFilterDrawer,
    superbViews: mockSuperbViews,
  }),
}));

const mockHandleSearchSuperbView = jest.fn();
jest.mock("hooks/api/superbView/useSearchSuperbView", () => ({
  __esModule: true,
  default: () => ({ handleSearchSuperbView: mockHandleSearchSuperbView }),
}));

test("初回レンダリング時にhandleSearchSuperbView関数が実行されること", () => {
  render(
    <SuperbViewListProvider>
      <SuperbViewList />
    </SuperbViewListProvider>
  );
  expect(mockHandleSearchSuperbView).toHaveBeenCalledTimes(1);
});

test("初回レンダリング時にgetAllCategoriesWithCheckBoxData関数が実行されること", () => {
  render(
    <SuperbViewListProvider>
      <SuperbViewList />
    </SuperbViewListProvider>
  );
  expect(mockGetCategoryCheckBoxItems).toHaveBeenCalledTimes(1);
});

test("初回レンダリング時にgetAllCountriesWithCheckBoxData関数が実行されること", () => {
  render(
    <SuperbViewListProvider>
      <SuperbViewList />
    </SuperbViewListProvider>
  );
  expect(mockGetCountryCheckBoxItems).toHaveBeenCalledTimes(1);
});

test("初回レンダリング時にgetAllCharacteristicsWithCheckBoxData関数が実行されること", () => {
  render(
    <SuperbViewListProvider>
      <SuperbViewList />
    </SuperbViewListProvider>
  );
  expect(mockGetCharacteristicCheckBoxItems).toHaveBeenCalledTimes(1);
});

test("絞り込みボタンがレンダリングされていること", () => {
  render(
    <SuperbViewListProvider>
      <SuperbViewList />
    </SuperbViewListProvider>
  );
  expect(screen.getByRole("button", { name: "絞り込み" })).toBeInTheDocument();
});

test("絞り込みボタン押下でonOpenFilterDrawer関数が実行されること", async () => {
  const user = userEvent.setup();
  render(
    <SuperbViewListProvider>
      <SuperbViewList />
    </SuperbViewListProvider>
  );
  const filterButton = screen.getByRole("button", { name: "絞り込み" });
  await act(async () => {
    await user.click(filterButton);
  });
  expect(mockOnOpenFilterDrawer).toHaveBeenCalledTimes(1);
});

test("絞り込みのアコーディオンがレンダリングされていること", () => {
  render(
    <SuperbViewListProvider>
      <SuperbViewList />
    </SuperbViewListProvider>
  );
  expect(screen.getByRole("region", { name: "絞り込み" })).toBeInTheDocument();
});

test("絶景一覧がレンダリングされていること", () => {
  render(
    <SuperbViewListProvider>
      <SuperbViewList />
    </SuperbViewListProvider>
  );
  expect(screen.getByRole("list", { name: "絶景一覧" })).toBeInTheDocument();
});

describe("ページネーションのテスト", () => {
  test("ページネーションが表示されていること", () => {
    render(
      <SuperbViewListProvider>
        <SuperbViewList />
      </SuperbViewListProvider>
    );
    expect(screen.getByRole("navigation", { name: "ページネーション" })).toBeInTheDocument();
  });

  test("superbViewsの1ページ目が表示されていること", () => {
    render(
      <SuperbViewListProvider>
        <SuperbViewList />
      </SuperbViewListProvider>
    );
    for (let i = 1; i <= 10; i += 1) {
      const superbViewElement = screen.getByText(`superbView${i}`);
      expect(superbViewElement).toBeInTheDocument();
    }
  });

  test("nextボタン押下で、superbViewsの次のページに遷移し、priviousボタンで前のページに戻ること", async () => {
    const user = userEvent.setup();
    render(
      <SuperbViewListProvider>
        <SuperbViewList />
      </SuperbViewListProvider>
    );
    await act(async () => {
      await user.click(screen.getByRole("button", { name: "次のページに移動" }));
    });
    for (let i = 11; i <= 20; i += 1) {
      const superbViewElement = screen.getByText(`superbView${i}`);
      expect(superbViewElement).toBeInTheDocument();
    }
    await act(async () => {
      await user.click(screen.getByRole("button", { name: "前のページに移動" }));
    });
    for (let i = 1; i <= 10; i += 1) {
      const superbViewElement = screen.getByText(`superbView${i}`);
      expect(superbViewElement).toBeInTheDocument();
    }
  });

  test("2ページ目への遷移ボタン押下で2ページ目に遷移すること", async () => {
    const user = userEvent.setup();
    render(
      <SuperbViewListProvider>
        <SuperbViewList />
      </SuperbViewListProvider>
    );
    await act(async () => {
      await user.click(screen.getByRole("button", { name: `ページ2に移動` }));
    });
    for (let i = 11; i <= 20; i += 1) {
      const superbViewElement = screen.getByText(`superbView${i}`);
      expect(superbViewElement).toBeInTheDocument();
    }
  });

  test("3ページ目への遷移ボタン押下で3ページ目に遷移すること", async () => {
    const user = userEvent.setup();
    render(
      <SuperbViewListProvider>
        <SuperbViewList />
      </SuperbViewListProvider>
    );
    await act(async () => {
      await user.click(screen.getByRole("button", { name: `ページ3に移動` }));
    });
    for (let i = 21; i <= 30; i += 1) {
      const superbViewElement = screen.getByText(`superbView${i}`);
      expect(superbViewElement).toBeInTheDocument();
    }
  });
});
