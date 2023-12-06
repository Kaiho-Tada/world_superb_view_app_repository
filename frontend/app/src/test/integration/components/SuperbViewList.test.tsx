import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SuperbViewList from "components/pages/SuperbViewList";
import { act } from "react-dom/test-utils";

const countries1 = [
  {
    id: 1,
    name: "countryName1",
    code: "0012",
    riskLevel: 1,
    state: {
      id: 1,
      name: "stateName1",
      code: "10",
    },
  },
  {
    id: 2,
    name: "countryName2",
    code: "0014",
    riskLevel: 2,
    state: {
      id: 1,
      name: "stateName1",
      code: "10",
    },
  },
];
const countries2 = [
  {
    id: 3,
    name: "countryName3",
    code: "0016",
    riskLevel: 3,
    state: {
      id: 1,
      name: "stateName1",
      code: "10",
    },
  },
];

const categories1 = [
  {
    id: 1,
    name: "categoryName1",
    classification: "自然",
  },
  {
    id: 2,
    name: "categoryName2",
    classification: "人工",
  },
];
const categories2 = [
  {
    id: 3,
    name: "categoryName3",
    classification: "自然",
  },
];

const characteristics1 = [
  {
    id: 1,
    name: "characteristicName1",
  },
  {
    id: 2,
    name: "characteristicName2",
  },
];

const characteristics2 = [
  {
    id: 3,
    name: "characteristicName3",
  },
];

const countryStates = ["アジア", "大洋州", "北米", "中南米", "ヨーロッパ", "中東", "アフリカ"];
const categoryClassifications = ["自然", "人工"];
const mockOnOpenFilterDrawer = jest.fn();

jest.mock("hooks/providers/SuperbViewListProvider", () => ({
  ...jest.requireActual("hooks/providers/SuperbViewListProvider"),
  useSuperbViewListContext: () => ({
    getAllSuperbViews: jest.fn(),
    superbViews: [
      {
        id: 1,
        name: "SuperbViewName1",
        imageUrl: "imageUrl1",
        bestSeason: "bestSeason1",
        countries: countries1,
        categories: categories1,
        characteristics: characteristics1,
      },
      {
        id: 2,
        name: "SuperbViewName2",
        imageUrl: "imageUrl2",
        bestSeason: "bestSeason2",
        countries: countries2,
        categories: categories2,
        characteristics: characteristics2,
      },
    ],
    countryStates,
    categoryClassifications,
    getAllCategoriesWithCheckBoxData: jest.fn(),
    categoriesWithCheckBoxData: [
      {
        label: "滝",
        classification: "自然",
        superbViewNames: ["superbView1", "superbView2"],
        checked: false,
      },
    ],
    getAllCountriesWithCheckBoxData: jest.fn(),
    countriesWithCheckBoxData: [
      {
        label: "アメリカ",
        stateName: "北米",
        superbViewNames: ["superbView1", "superbView2"],
        checked: false,
      },
    ],
    getAllCharacteristicsWithCheckBoxData: jest.fn(),
    characteristicsWithCheckBoxData: [
      {
        label: "雄大",
        superbViewNames: ["superbView1", "superbView2"],
        checked: false,
      },
    ],
    riskLevels: [
      {
        label: "4",
        checked: false,
      },
    ],
    onOpenFilterDrawer: mockOnOpenFilterDrawer,
    loadingSearchSuperbViews: false,
    checkedCategoryLabels: ["遺跡"],
    checkedCountryLabels: ["中国"],
    checkedCharacteristicLabels: ["畏怖"],
    checkedRiskLevelLabels: ["3"],
    keyword: "キーワード",
  }),
}));

const mockHandleSearchSuperbView = jest.fn();
jest.mock("hooks/api/superbView/useSearchSuperbView", () => ({
  __esModule: true,
  default: () => ({ handleSearchSuperbView: mockHandleSearchSuperbView }),
}));

test("絶景画像がレンダリングされていること", () => {
  render(<SuperbViewList />);
  const SuperbViewImages = screen.getAllByRole("img", { name: "絶景画像" });
  expect(SuperbViewImages.length).toBe(2);
});

test("絶景名がレンダリングされていること", () => {
  render(<SuperbViewList />);
  expect(screen.getByRole("heading", { name: "SuperbViewName1" })).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: "SuperbViewName2" })).toBeInTheDocument();
});

test("絶景の概要がレンダリングされていること", () => {
  render(<SuperbViewList />);
  const SuperbViewDescriptions = screen.getAllByRole("heading", {
    name: "ナイアガラは、北アメリカ大陸にある三つの滝から成る大瀑布で、その壮大な景観と迫力ある水量が特徴です。観光名所として知られ、アメリカとカナダの国境に位置しています。",
  });
  expect(SuperbViewDescriptions.length).toBe(2);
});

test("国名の見出しがレンダリングされていること", () => {
  render(<SuperbViewList />);
  const countryNameHeadings = screen.getAllByRole("heading", { name: "国名" });
  expect(countryNameHeadings.length).toBe(2);
});

test("国名がレンダリングされていること", () => {
  render(<SuperbViewList />);
  expect(screen.getByRole("heading", { name: "countryName1 countryName2" })).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: "countryName3" })).toBeInTheDocument();
});

test("カテゴリーの見出しがレンダリングされていること", () => {
  render(<SuperbViewList />);
  const CategoryNameHeadings = screen.getAllByRole("heading", { name: "カテゴリー" });
  expect(CategoryNameHeadings.length).toBe(2);
});

test("カテゴリー名がレンダリングされていること", () => {
  render(<SuperbViewList />);
  expect(screen.getByRole("heading", { name: "categoryName1 categoryName2" })).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: "categoryName3" })).toBeInTheDocument();
});

test("ベストシーズンの見出しがレンダリングされていること", () => {
  render(<SuperbViewList />);
  const BestSeasonHeadings = screen.getAllByRole("heading", { name: "ベストシーズン" });
  expect(BestSeasonHeadings.length).toBe(2);
});

test("ベストシーズンがレンダリングされていること", () => {
  render(<SuperbViewList />);
  expect(screen.getByRole("heading", { name: "bestSeason1" })).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: "bestSeason2" })).toBeInTheDocument();
});

test("リスクレベルの見出しがレンダリングされていること", () => {
  render(<SuperbViewList />);
  const riskLevelHeadings = screen.getAllByRole("heading", { name: "リスクレベル" });
  expect(riskLevelHeadings.length).toBe(2);
});

test("リスクレベルがレンダリングされていること", () => {
  render(<SuperbViewList />);
  const riskLevel = screen.getAllByRole("img", { name: "リスクレベル" });
  expect(riskLevel.length).toBe(5);
});

test("絞り込みのアコーディオンがレンダリングされていること", () => {
  render(<SuperbViewList />);
  expect(screen.getByRole("region", { name: "絞り込み" })).toBeInTheDocument();
});

test("絞り込みボタンがレンダリングされていること", () => {
  render(<SuperbViewList />);
  expect(screen.getByRole("button", { name: "絞り込み" })).toBeInTheDocument();
});

test("絞り込みボタン押下でonOpenFilterDrawer関数が実行されること", async () => {
  const user = userEvent.setup();
  render(<SuperbViewList />);
  const filterButton = screen.getByRole("button", { name: "絞り込み" });
  await act(async () => {
    await user.click(filterButton);
  });
  expect(mockOnOpenFilterDrawer).toHaveBeenCalledTimes(1);
});
