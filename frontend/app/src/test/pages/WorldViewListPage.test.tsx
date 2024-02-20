import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import WorldViewList from "pages/WorldViewListPage";
import { WorldViewListProvider } from "providers/WorldViewListProvider";
import { act } from "react-dom/test-utils";

window.scrollTo = jest.fn();

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
      categoryCheckBoxItems: [{ label: "洞窟", parentLabel: "自然", checked: false }],
    },
  }),
}));

const mockHandleSearchModel = jest.fn();
jest.mock("hooks/api/useSearchModel", () => ({
  __esModule: true,
  default: () => ({ handleSearchModel: mockHandleSearchModel }),
}));

const mockHandleGetNestedCheckBoxItems = jest.fn();
jest.mock("hooks/api/useGetNestedCheckBoxItems", () => ({
  __esModule: true,
  default: () => ({
    handleGetNestedCheckBoxItems: mockHandleGetNestedCheckBoxItems,
  }),
}));

const mockHandleGetCheckBoxItems = jest.fn();
jest.mock("hooks/api/useGetCheckBoxItems", () => ({
  __esModule: true,
  default: () => ({
    handleGetCheckBoxItems: mockHandleGetCheckBoxItems,
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

  test("並び替えのselectbox押下でhandleSearchModel関数が実行されること", async () => {
    const spyOnUseWorldViewApi = jest.spyOn(
      jest.requireActual("features/worldView/api/useWorldViewApi"),
      "default"
    );
    const mockSearchWorldViewApi = jest.fn();
    spyOnUseWorldViewApi.mockReturnValue({ searchWorldViewApi: mockSearchWorldViewApi });

    const user = userEvent.setup();
    render(
      <WorldViewListProvider>
        <WorldViewList />
      </WorldViewListProvider>
    );
    const selectBox = screen.getByRole("combobox", { name: "並び替えオプションの選択" });
    await act(async () => {
      await user.selectOptions(selectBox, "新しい順");
    });

    expect(mockHandleSearchModel).toHaveBeenCalledWith({
      loadingSearchModelDispatch: expect.any(Function),
      modelDispatch: expect.any(Function),
      searchModelApi: mockSearchWorldViewApi,
    });

    spyOnUseWorldViewApi.mockRestore();
  });
});

describe("handleGetNestedCheckBoxItems関数のテスト", () => {
  test("初回レンダリング時にhandleGetNestedCheckBoxItems関数が2回実行されること", () => {
    const spyOnGetAllCategoriesApi = jest.spyOn(
      jest.requireActual("features/worldView/api/categoryApi"),
      "default"
    );
    const spyOnCountryApi = jest.spyOn(
      jest.requireActual("features/worldView/api/countryApi"),
      "default"
    );
    render(
      <WorldViewListProvider>
        <WorldViewList />
      </WorldViewListProvider>
    );
    expect(mockHandleGetNestedCheckBoxItems).toHaveBeenCalledWith({
      loadingCheckBoxItemsDispatch: expect.any(Function),
      checkBoxItemsDispatch: expect.any(Function),
      getAllModelApi: spyOnGetAllCategoriesApi,
    });
    expect(mockHandleGetNestedCheckBoxItems).toHaveBeenCalledWith({
      loadingCheckBoxItemsDispatch: expect.any(Function),
      checkBoxItemsDispatch: expect.any(Function),
      getAllModelApi: spyOnCountryApi,
    });
    expect(mockHandleGetNestedCheckBoxItems).toHaveBeenCalledTimes(2);
  });
});

describe("handleGetCheckBoxItems関数のテスト", () => {
  test("初回レンダリング時にhandleGetCheckBoxItems関数が実行されること", () => {
    const spyOnGetAllCharacteristicsApi = jest.spyOn(
      jest.requireActual("features/worldView/api/characteristicApi"),
      "default"
    );
    render(
      <WorldViewListProvider>
        <WorldViewList />
      </WorldViewListProvider>
    );
    expect(mockHandleGetCheckBoxItems).toHaveBeenCalledWith({
      loadingCheckBoxItemsDispatch: expect.any(Function),
      checkBoxItemsDispatch: expect.any(Function),
      getAllModelApi: spyOnGetAllCharacteristicsApi,
    });
  });
});

test("FilterButtonがレンダリングされていること", () => {
  render(
    <WorldViewListProvider>
      <WorldViewList />
    </WorldViewListProvider>
  );
  expect(screen.getByRole("button", { name: "フィルター" })).toBeInTheDocument();
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
  expect(screen.getByRole("region", { name: "絞り込みのアコーディオン" })).toBeInTheDocument();
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
