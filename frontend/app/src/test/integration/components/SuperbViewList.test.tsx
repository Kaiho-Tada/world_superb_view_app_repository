import { render, screen } from "@testing-library/react";
import MockAdapter from "axios-mock-adapter";
import SuperbViewList from "components/pages/SuperbViewList";
import client from "lib/api/client";

const mockAxios = new MockAdapter(client);

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

const characteristics3 = [
  {
    id: 3,
    name: "characteristicName3",
  },
];
mockAxios.onGet("/superb_views").reply(200, [
  {
    id: 1,
    name: "superb_view1",
    imageUrl: "imageUrl1",
    bestSeason: "bestSeason1",
    countries: countries1,
    categories: categories1,
    characteristics: characteristics1,
  },
  {
    id: 2,
    name: "superb_view2",
    imageUrl: "imageUrl2",
    bestSeason: "bestSeason2",
    countries: countries2,
    categories: categories2,
    characteristics: characteristics3,
  },
]);

test("絶景画像がレンダリングされていること", async () => {
  render(<SuperbViewList />);
  const SuperbViewImages = await screen.findAllByRole("img", { name: "絶景画像" });
  expect(SuperbViewImages.length).toBe(2);
});

test("絶景名がレンダリングされていること", async () => {
  render(<SuperbViewList />);
  const SuperbViewName1 = await screen.findByRole("heading", { name: "superb_view1" });
  const SuperbViewName2 = await screen.findByRole("heading", { name: "superb_view2" });
  expect(SuperbViewName1).toBeInTheDocument();
  expect(SuperbViewName2).toBeInTheDocument();
});

test("絶景の概要がレンダリングされていること", async () => {
  render(<SuperbViewList />);
  const SuperbViewDescriptions = await screen.findAllByRole("heading", {
    name: "ナイアガラは、北アメリカ大陸にある三つの滝から成る大瀑布で、その壮大な景観と迫力ある水量が特徴です。観光名所として知られ、アメリカとカナダの国境に位置しています。",
  });
  expect(SuperbViewDescriptions.length).toBe(2);
});

test("国名の見出しがレンダリングされていること", async () => {
  render(<SuperbViewList />);
  const countryNameHeadings = await screen.findAllByRole("heading", { name: "国名" });
  expect(countryNameHeadings.length).toBe(2);
});

test("国名がレンダリングされていること", async () => {
  render(<SuperbViewList />);
  const countryName1 = await screen.findByRole("heading", { name: "countryName1 countryName2" });
  const countryName2 = await screen.findByRole("heading", { name: "countryName3" });
  expect(countryName1).toBeInTheDocument();
  expect(countryName2).toBeInTheDocument();
});

test("カテゴリーの見出しがレンダリングされていること", async () => {
  render(<SuperbViewList />);
  const CategoryNameHeadings = await screen.findAllByRole("heading", { name: "カテゴリー" });
  expect(CategoryNameHeadings.length).toBe(2);
});

test("カテゴリー名がレンダリングされていること", async () => {
  render(<SuperbViewList />);
  const CategoryName1 = await screen.findByRole("heading", { name: "categoryName1 categoryName2" });
  const CategoryName2 = await screen.findByRole("heading", { name: "categoryName3" });
  expect(CategoryName1).toBeInTheDocument();
  expect(CategoryName2).toBeInTheDocument();
});

test("ベストシーズンの見出しがレンダリングされていること", async () => {
  render(<SuperbViewList />);
  const BestSeasonHeadings = await screen.findAllByRole("heading", { name: "ベストシーズン" });
  expect(BestSeasonHeadings.length).toBe(2);
});

test("ベストシーズンがレンダリングされていること", async () => {
  render(<SuperbViewList />);
  const BestSeason1 = await screen.findByRole("heading", { name: "bestSeason1" });
  const BestSeason2 = await screen.findByRole("heading", { name: "bestSeason2" });
  expect(BestSeason1).toBeInTheDocument();
  expect(BestSeason2).toBeInTheDocument();
});

test("リスクレベルの見出しがレンダリングされていること", async () => {
  render(<SuperbViewList />);
  const riskLevelHeadings = await screen.findAllByRole("heading", { name: "リスクレベル" });
  expect(riskLevelHeadings.length).toBe(2);
});

test("リスクレベルがレンダリングされていること", async () => {
  render(<SuperbViewList />);
  const riskLevel = await screen.findAllByRole("img", { name: "リスクレベル" });
  expect(riskLevel.length).toBe(5);
});
