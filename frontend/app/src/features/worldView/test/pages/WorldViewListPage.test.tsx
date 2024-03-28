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
  countries: [],
  categories: [],
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
    worldViews: mockWorldViews,
    currentPage: 1,
    itemsOffset: 0,
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
