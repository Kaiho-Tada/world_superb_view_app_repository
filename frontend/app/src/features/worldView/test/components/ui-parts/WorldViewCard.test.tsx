import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import WorldViewCard from "features/worldView/components/ui-parts/WorldViewCard";
import { act } from "react-dom/test-utils";

const countries = [
  {
    id: 1,
    name: "countryName1",
    code: "0012",
    riskLevel: 1,
    bmi: 11.2,
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
    bmi: -26.9,
    state: {
      id: 1,
      name: "stateName1",
      code: "10",
    },
  },
];

const categories = [
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

const characteristics = [
  {
    id: 1,
    name: "characteristicName1",
  },
  {
    id: 2,
    name: "characteristicName2",
  },
];

const favorites = [
  {
    id: 1,
    userId: 1,
    worldViewId: 1,
  },
];
test("絶景画像がレンダリングされていること", () => {
  render(
    <WorldViewCard
      id={1}
      name="絶景名"
      imgUrl="画像URL"
      bestSeason="1月"
      countries={countries}
      categories={categories}
      characteristics={characteristics}
      favorites={favorites}
      gifUrl="gifUrl"
      gifSite="gifSite"
    />
  );
  const SuperbViewImage = screen.getByRole("img", { name: "絶景画像" });
  expect(SuperbViewImage).toBeInTheDocument();
});

test("絶景名がレンダリングされていること", () => {
  render(
    <WorldViewCard
      id={1}
      name="絶景名"
      imgUrl="画像URL"
      bestSeason="1月"
      countries={countries}
      categories={categories}
      characteristics={characteristics}
      favorites={favorites}
      gifUrl="gifUrl"
      gifSite="gifSite"
    />
  );
  const SuperbViewName = screen.getByRole("heading", { name: "絶景名" });
  expect(SuperbViewName).toBeInTheDocument();
});

test("絶景の概要がレンダリングされていること", () => {
  render(
    <WorldViewCard
      id={1}
      name="絶景名"
      imgUrl="画像URL"
      bestSeason="1月"
      countries={countries}
      categories={categories}
      characteristics={characteristics}
      favorites={favorites}
      gifUrl="gifUrl"
      gifSite="gifSite"
    />
  );
  const SuperbViewDescription = screen.getByRole("heading", {
    name: "ナイアガラは、北アメリカ大陸にある三つの滝から成る大瀑布で、その壮大な景観と迫力ある水量が特徴です。観光名所として知られ、アメリカとカナダの国境に位置しています。",
  });
  expect(SuperbViewDescription).toBeInTheDocument();
});

test("国名の見出しがレンダリングされていること", () => {
  render(
    <WorldViewCard
      id={1}
      name="絶景名"
      imgUrl="画像URL"
      bestSeason="1月"
      countries={countries}
      categories={categories}
      characteristics={characteristics}
      favorites={favorites}
      gifUrl="gifUrl"
      gifSite="gifSite"
    />
  );
  const BestSeasonHeading = screen.getByRole("heading", { name: "国名" });
  expect(BestSeasonHeading).toBeInTheDocument();
});

test("国名がレンダリングされていること", () => {
  render(
    <WorldViewCard
      id={1}
      name="絶景名"
      imgUrl="画像URL"
      bestSeason="1月"
      countries={countries}
      categories={categories}
      characteristics={characteristics}
      favorites={favorites}
      gifUrl="gifUrl"
      gifSite="gifSite"
    />
  );
  const BestSeasonHeading = screen.getByRole("heading", { name: "countryName1 countryName2" });
  expect(BestSeasonHeading).toBeInTheDocument();
});

test("カテゴリーの見出しがレンダリングされていること", () => {
  render(
    <WorldViewCard
      id={1}
      name="絶景名"
      imgUrl="画像URL"
      bestSeason="1月"
      countries={countries}
      categories={categories}
      characteristics={characteristics}
      favorites={favorites}
      gifUrl="gifUrl"
      gifSite="gifSite"
    />
  );
  const CategoryHeading = screen.getByRole("heading", { name: "カテゴリー" });
  expect(CategoryHeading).toBeInTheDocument();
});

test("カテゴリー名がレンダリングされていること", () => {
  render(
    <WorldViewCard
      id={1}
      name="絶景名"
      imgUrl="画像URL"
      bestSeason="1月"
      countries={countries}
      categories={categories}
      characteristics={characteristics}
      favorites={favorites}
      gifUrl="gifUrl"
      gifSite="gifSite"
    />
  );
  const CategoryHeading = screen.getByRole("heading", { name: "categoryName1 categoryName2" });
  expect(CategoryHeading).toBeInTheDocument();
});

test("ベストシーズンの見出しがレンダリングされていること", () => {
  render(
    <WorldViewCard
      id={1}
      name="絶景名"
      imgUrl="画像URL"
      bestSeason="1月"
      countries={countries}
      categories={categories}
      characteristics={characteristics}
      favorites={favorites}
      gifUrl="gifUrl"
      gifSite="gifSite"
    />
  );
  const BestSeasonHeading = screen.getByRole("heading", { name: "ベストシーズン" });
  expect(BestSeasonHeading).toBeInTheDocument();
});

test("ベストシーズンがレンダリングされていること", () => {
  render(
    <WorldViewCard
      id={1}
      name="絶景名"
      imgUrl="画像URL"
      bestSeason="1月"
      countries={countries}
      categories={categories}
      characteristics={characteristics}
      favorites={favorites}
      gifUrl="gifUrl"
      gifSite="gifSite"
    />
  );
  const BestSeason = screen.getByRole("heading", { name: "1月" });
  expect(BestSeason).toBeInTheDocument();
});

test("リスクレベルの見出しがレンダリングされていること", () => {
  render(
    <WorldViewCard
      id={1}
      name="絶景名"
      imgUrl="画像URL"
      bestSeason="1月"
      countries={countries}
      categories={categories}
      characteristics={characteristics}
      favorites={favorites}
      gifUrl="gifUrl"
      gifSite="gifSite"
    />
  );
  const riskLevelHeading = screen.getByRole("heading", { name: "リスクレベル" });
  expect(riskLevelHeading).toBeInTheDocument();
});

test("リスクレベルがレンダリングされていること", () => {
  render(
    <WorldViewCard
      id={1}
      name="絶景名"
      imgUrl="画像URL"
      bestSeason="1月"
      countries={countries}
      categories={categories}
      characteristics={characteristics}
      favorites={favorites}
      gifUrl="gifUrl"
      gifSite="gifSite"
    />
  );
  const riskLevel = screen.getAllByRole("img", { name: "リスクレベル" });
  expect(riskLevel.length).toBe(2);
});

test("ハートアイコンが表示されていること", () => {
  render(
    <WorldViewCard
      id={1}
      name="絶景名"
      imgUrl="画像URL"
      bestSeason="1月"
      countries={countries}
      categories={categories}
      characteristics={characteristics}
      favorites={favorites}
      gifUrl="gifUrl"
      gifSite="gifSite"
    />
  );
  expect(screen.getByRole("img", { name: "ハートアイコン" })).toBeInTheDocument();
});

test("BMIの見出しがレンダリングされていること", () => {
  render(
    <WorldViewCard
      id={1}
      name="絶景名"
      imgUrl="画像URL"
      bestSeason="1月"
      countries={countries}
      categories={categories}
      characteristics={characteristics}
      favorites={favorites}
      gifUrl="gifUrl"
      gifSite="gifSite"
    />
  );
  const BestSeasonHeading = screen.getByRole("heading", { name: "BMI" });
  expect(BestSeasonHeading).toBeInTheDocument();
});

test("BMI値がレンダリングされていること", () => {
  render(
    <WorldViewCard
      id={1}
      name="絶景名"
      imgUrl="画像URL"
      bestSeason="1月"
      countries={countries}
      categories={categories}
      characteristics={characteristics}
      favorites={favorites}
      gifUrl="gifUrl"
      gifSite="gifSite"
    />
  );
  expect(screen.getByRole("heading", { name: "11.2% -26.9%" })).toBeInTheDocument();
});

test("絶景カード押下でモーダルが表示されること", async () => {
  const user = userEvent.setup();
  render(
    <WorldViewCard
      id={1}
      name="絶景名"
      imgUrl="画像URL"
      bestSeason="1月"
      countries={countries}
      categories={categories}
      characteristics={characteristics}
      favorites={favorites}
      gifUrl="gifUrl"
      gifSite="gifSite"
    />
  );
  await act(async () => {
    await user.click(screen.getByRole("heading", { name: "リスクレベル" }));
  });
  expect(screen.getByRole("dialog", { name: "絶景モーダル" })).toBeInTheDocument();
});
