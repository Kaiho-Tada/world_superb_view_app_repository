import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import WorldViewDetailPage from "features/worldView/pages/WorldViewDetailPage";
import { useWorldViewListContext as mockUseWorldViewListContext } from "providers/WorldViewListProvider";
import { act } from "react-dom/test-utils";
import { useParams as mockUseParams } from "react-router-dom";

jest.mock("providers/WorldViewListProvider", () => ({
  useWorldViewListContext: jest.fn(),
}));

const mockWorldViews = Array.from({ length: 3 }, (_, index) => ({
  id: index + 1,
  name: `worldView${index + 1}`,
  imgUrl: "画像URL",
  bestSeason: `${index + 1}月`,
  countries: [{ id: index + 1, name: `country${index + 1}`, riskLevel: index + 1 }],
  categories: [{ id: index + 1, name: `category${index + 1}` }],
  characteristics: [{ id: index + 1, name: `characteristic${index + 1}` }],
  videos: [
    { id: index + 1, title: `video${index + 1}`, releaseDate: `${index + 1} - ${index + 1}` },
  ],
  worldViewFavorites: [{ id: 569, userId: 1 }],
  gifUrl: "gifUrl",
  gifSite: "gifSite",
}));

const mockDispatch = jest.fn();
const mockContextValue = {
  dispatch: mockDispatch,
  state: {
    worldViews: mockWorldViews,
    loadingSearchWorldViews: false,
  },
};

const mockContextValueLoadingWorldView = {
  ...mockContextValue,
  state: {
    ...mockContextValue.state,
    loadingSearchWorldViews: true,
  },
};

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: jest.fn(),
}));

// searchWorldViewApi関数のモック化
const mockSearchWorldViewApi = jest.fn();
jest.mock("features/worldView/api/useWorldViewApi", () => ({
  __esModule: true,
  default: () => ({
    searchWorldViewApi: mockSearchWorldViewApi,
  }),
}));

describe("コンポーネントのテスト", () => {
  test("loadingSearchWorldViewsがtrueの場合はloadingのspinnerが表示されていること", () => {
    (mockUseWorldViewListContext as jest.Mock).mockReturnValue(mockContextValueLoadingWorldView);
    (mockUseParams as jest.Mock).mockReturnValue({ id: "1" });

    render(<WorldViewDetailPage />);
    expect(screen.getByRole("img", { name: "loadingアイコン" })).toBeInTheDocument();
  });

  test("currentDetailViewが見つからない場合はloadingのspinnerが表示されていること", () => {
    (mockUseWorldViewListContext as jest.Mock).mockReturnValue(mockContextValueLoadingWorldView);
    (mockUseParams as jest.Mock).mockReturnValue({ id: "4" });

    render(<WorldViewDetailPage />);
    expect(screen.getByRole("img", { name: "loadingアイコン" })).toBeInTheDocument();
  });

  describe("ハートアイコンのテスト", () => {
    test("ハートアイコンが表示されていること", () => {
      (mockUseWorldViewListContext as jest.Mock).mockReturnValue(mockContextValue);
      (mockUseParams as jest.Mock).mockReturnValue({ id: "3" });

      render(<WorldViewDetailPage />);
      expect(screen.getByRole("img", { name: "ハートアイコン" })).toBeInTheDocument();
    });

    describe("詳細レコードのfavortiesにcurrentUserのidと一致するuserIdカラムを持つfavoriteレコードが存在する場合", () => {
      test("ハートアイコン押下でdeleteFavoriteApi関数が実行されること", async () => {
        (mockUseWorldViewListContext as jest.Mock).mockReturnValue(mockContextValue);
        (mockUseParams as jest.Mock).mockReturnValue({ id: "3" });

        const spyOnUseAuth = jest.spyOn(jest.requireActual("providers/useAuthProvider"), "useAuth");
        spyOnUseAuth.mockReturnValue({
          currentUser: { id: 1 },
        });

        const spyOnDeleteFavoriteApi = jest.spyOn(
          jest.requireActual("features/worldView/api/worldViewFavoriteApi"),
          "deleteFavoriteApi"
        );
        spyOnDeleteFavoriteApi.mockResolvedValue(null);

        await act(async () => {
          render(<WorldViewDetailPage />);
        });

        const user = userEvent.setup();
        await act(async () => {
          await user.click(screen.getByRole("img", { name: "ハートアイコン" }));
        });
        expect(spyOnDeleteFavoriteApi).toHaveBeenCalledWith(569);
        expect(spyOnDeleteFavoriteApi).toHaveBeenCalledTimes(1);

        spyOnDeleteFavoriteApi.mockRestore();
        spyOnUseAuth.mockRestore();
      });
    });

    describe("詳細レコードのfavoritesにcurrentUserIdと一致するuserIdカラムを持つfavoriteレコードが存在しない場合", () => {
      test("ハートアイコン押下でcreateFavoriteApi関数が実行されること", async () => {
        (mockUseWorldViewListContext as jest.Mock).mockReturnValue(mockContextValue);
        (mockUseParams as jest.Mock).mockReturnValue({ id: "3" });

        const spyOnUseAuth = jest.spyOn(jest.requireActual("providers/useAuthProvider"), "useAuth");
        spyOnUseAuth.mockReturnValue({
          currentUser: { id: 16 },
        });

        const spyOnCreateFavoriteApi = jest.spyOn(
          jest.requireActual("features/worldView/api/worldViewFavoriteApi"),
          "createFavoriteApi"
        );
        spyOnCreateFavoriteApi.mockResolvedValue(null);

        const user = userEvent.setup();
        await act(async () => {
          render(<WorldViewDetailPage />);
        });
        await act(async () => {
          await user.click(screen.getByRole("img", { name: "ハートアイコン" }));
        });
        expect(spyOnCreateFavoriteApi).toHaveBeenCalledWith(3);
        expect(spyOnCreateFavoriteApi).toHaveBeenCalledTimes(1);

        spyOnCreateFavoriteApi.mockRestore();
        spyOnUseAuth.mockRestore();
      });
    });
  });

  describe("params.idが1の場合", () => {
    test("idが1のレコードの画像が表示されていること", () => {
      (mockUseWorldViewListContext as jest.Mock).mockReturnValue(mockContextValue);
      (mockUseParams as jest.Mock).mockReturnValue({ id: "1" });

      render(<WorldViewDetailPage />);
      expect(
        screen.getByRole("img", { name: `絶景画像: ${mockWorldViews[0].name}` })
      ).toBeInTheDocument();
    });

    test("idが1のレコードの名前が表示されること", () => {
      (mockUseWorldViewListContext as jest.Mock).mockReturnValue(mockContextValue);
      (mockUseParams as jest.Mock).mockReturnValue({ id: "1" });

      render(<WorldViewDetailPage />);
      expect(screen.getByRole("heading", { name: mockWorldViews[0].name }));
    });

    test("idが1のレコードの国名が表示されていること", () => {
      (mockUseWorldViewListContext as jest.Mock).mockReturnValue(mockContextValue);
      (mockUseParams as jest.Mock).mockReturnValue({ id: "1" });

      render(<WorldViewDetailPage />);
      expect(screen.getByText("country1")).toBeInTheDocument();
    });

    test("idが1のレコードのカテゴリー名が表示されていること", () => {
      (mockUseWorldViewListContext as jest.Mock).mockReturnValue(mockContextValue);
      (mockUseParams as jest.Mock).mockReturnValue({ id: "1" });

      render(<WorldViewDetailPage />);
      expect(screen.getByText("category1")).toBeInTheDocument();
    });

    test("idが1のレコードの属性名が表示されていること", () => {
      (mockUseWorldViewListContext as jest.Mock).mockReturnValue(mockContextValue);
      (mockUseParams as jest.Mock).mockReturnValue({ id: "1" });

      render(<WorldViewDetailPage />);
      expect(screen.getByText("characteristic1")).toBeInTheDocument();
    });

    test("idが1のレコードのベストシーズンが表示されていること", () => {
      (mockUseWorldViewListContext as jest.Mock).mockReturnValue(mockContextValue);
      (mockUseParams as jest.Mock).mockReturnValue({ id: "1" });

      render(<WorldViewDetailPage />);
      expect(screen.getByText(mockWorldViews[0].bestSeason)).toBeInTheDocument();
    });

    test("idが1のレコードの国内リスクレベルの数だけリスクレベルアイコンが表示されていること", () => {
      (mockUseWorldViewListContext as jest.Mock).mockReturnValue(mockContextValue);
      (mockUseParams as jest.Mock).mockReturnValue({ id: "1" });

      render(<WorldViewDetailPage />);
      const riskLevelIcon = screen.getAllByRole("img", { name: "リスクレベル" });
      expect(riskLevelIcon.length).toBe(1);
    });

    test("idが1のレコードが舞台となった作品の名前が表示されていること", () => {
      (mockUseWorldViewListContext as jest.Mock).mockReturnValue(mockContextValue);
      (mockUseParams as jest.Mock).mockReturnValue({ id: "1" });

      render(<WorldViewDetailPage />);
      expect(screen.getByText("video1")).toBeInTheDocument();
    });

    test("idが1のレコードが舞台となった作品のリリース日が表示されていること", () => {
      (mockUseWorldViewListContext as jest.Mock).mockReturnValue(mockContextValue);
      (mockUseParams as jest.Mock).mockReturnValue({ id: "1" });

      render(<WorldViewDetailPage />);
      expect(screen.getByText("1 - 1")).toBeInTheDocument();
    });
  });

  describe("params.idが2の場合", () => {
    test("idが2のレコードの画像が表示されていること", () => {
      (mockUseWorldViewListContext as jest.Mock).mockReturnValue(mockContextValue);
      (mockUseParams as jest.Mock).mockReturnValue({ id: "2" });

      render(<WorldViewDetailPage />);
      expect(
        screen.getByRole("img", { name: `絶景画像: ${mockWorldViews[1].name}` })
      ).toBeInTheDocument();
    });

    test("idが2のレコードの名前が表示されること", () => {
      (mockUseWorldViewListContext as jest.Mock).mockReturnValue(mockContextValue);
      (mockUseParams as jest.Mock).mockReturnValue({ id: "2" });

      render(<WorldViewDetailPage />);
      expect(screen.getByRole("heading", { name: mockWorldViews[1].name }));
    });

    test("idが2のレコードの国名が表示されていること", () => {
      (mockUseWorldViewListContext as jest.Mock).mockReturnValue(mockContextValue);
      (mockUseParams as jest.Mock).mockReturnValue({ id: "2" });

      render(<WorldViewDetailPage />);
      expect(screen.getByText("country2")).toBeInTheDocument();
    });

    test("idが2のレコードのカテゴリー名が表示されていること", () => {
      (mockUseWorldViewListContext as jest.Mock).mockReturnValue(mockContextValue);
      (mockUseParams as jest.Mock).mockReturnValue({ id: "2" });

      render(<WorldViewDetailPage />);
      expect(screen.getByText("category2")).toBeInTheDocument();
    });

    test("idが2のレコードの属性名が表示されていること", () => {
      (mockUseWorldViewListContext as jest.Mock).mockReturnValue(mockContextValue);
      (mockUseParams as jest.Mock).mockReturnValue({ id: "2" });

      render(<WorldViewDetailPage />);
      expect(screen.getByText("characteristic2")).toBeInTheDocument();
    });

    test("idが2のレコードのベストシーズンが表示されていること", () => {
      (mockUseWorldViewListContext as jest.Mock).mockReturnValue(mockContextValue);
      (mockUseParams as jest.Mock).mockReturnValue({ id: "2" });

      render(<WorldViewDetailPage />);
      expect(screen.getByText(mockWorldViews[1].bestSeason)).toBeInTheDocument();
    });

    test("idが2のレコードの国内リスクレベルの数だけリスクレベルアイコンが表示されていること", () => {
      (mockUseWorldViewListContext as jest.Mock).mockReturnValue(mockContextValue);
      (mockUseParams as jest.Mock).mockReturnValue({ id: "2" });

      render(<WorldViewDetailPage />);
      const riskLevelIcon = screen.getAllByRole("img", { name: "リスクレベル" });
      expect(riskLevelIcon.length).toBe(2);
    });

    test("idが2のレコードが舞台となった作品の名前が表示されていること", () => {
      (mockUseWorldViewListContext as jest.Mock).mockReturnValue(mockContextValue);
      (mockUseParams as jest.Mock).mockReturnValue({ id: "2" });

      render(<WorldViewDetailPage />);
      expect(screen.getByText("video2")).toBeInTheDocument();
    });

    test("idが2のレコードが舞台となった作品のリリース日が表示されていること", () => {
      (mockUseWorldViewListContext as jest.Mock).mockReturnValue(mockContextValue);
      (mockUseParams as jest.Mock).mockReturnValue({ id: "2" });

      render(<WorldViewDetailPage />);
      expect(screen.getByText("2 - 2")).toBeInTheDocument();
    });
  });
});

describe("handleSearchModel関数のテスト", () => {
  test("初回レンダリング時にhandleSearchModel関数が実行されること", async () => {
    (mockUseWorldViewListContext as jest.Mock).mockReturnValue(mockContextValue);
    (mockUseParams as jest.Mock).mockReturnValue({ id: "1" });

    // handleSearchModel関数のモック化
    const spyOnUseSearchModel = jest.spyOn(
      jest.requireActual("hooks/api/useSearchModel"),
      "default"
    );
    const mockHandleSearchModel = jest.fn();
    spyOnUseSearchModel.mockReturnValue({ handleSearchModel: mockHandleSearchModel });

    await act(async () => {
      render(<WorldViewDetailPage />);
    });
    expect(mockHandleSearchModel).toHaveBeenCalledWith({
      loadingSearchModelDispatch: expect.any(Function),
      modelDispatch: expect.any(Function),
      searchModelApi: mockSearchWorldViewApi,
    });
    spyOnUseSearchModel.mockRestore();
  });

  test("初回レンダリング時にhandleSearchModel関数内でSET_LOADING_GET_WORLDVIEWSアクションがディスパッチされること", async () => {
    (mockUseWorldViewListContext as jest.Mock).mockReturnValue(mockContextValue);
    (mockUseParams as jest.Mock).mockReturnValue({ id: "1" });

    await act(async () => {
      render(<WorldViewDetailPage />);
    });
    expect(mockDispatch).toHaveBeenCalledWith({
      type: "SET_LOADING_GET_WORLDVIEWS",
      payload: true,
    });
    expect(mockDispatch).toHaveBeenCalledWith({
      type: "SET_LOADING_GET_WORLDVIEWS",
      payload: false,
    });
  });

  test("初回レンダリング時にhandleSearchModel関数内でSET_WORLD_VIEWSアクションがディスパッチされること", async () => {
    (mockUseWorldViewListContext as jest.Mock).mockReturnValue(mockContextValue);
    (mockUseParams as jest.Mock).mockReturnValue({ id: "1" });

    mockSearchWorldViewApi.mockReturnValue({ data: [{ id: 1, name: "名前" }] });
    await act(async () => {
      render(<WorldViewDetailPage />);
    });
    expect(mockDispatch).toHaveBeenCalledWith({
      type: "SET_WORLD_VIEWS",
      payload: [{ id: 1, name: "名前" }],
    });
  });
});
