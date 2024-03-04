import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import WorldViewCard from "features/worldView/components/ui-parts/WorldViewCard";
import { act } from "react-dom/test-utils";

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

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

test("レコードの画像が表示されていること", () => {
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
  expect(screen.getByRole("img", { name: "絶景画像" })).toBeInTheDocument();
});

test("レコード名が表示されていること", () => {
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
  expect(screen.getByRole("heading", { name: "絶景名" })).toBeInTheDocument();
});

test("レコードの国名が表示されていること", () => {
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
  expect(screen.getByText("countryName1 countryName2")).toBeInTheDocument();
});

test("レコードの国名が表示されていること", () => {
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
  expect(screen.getByText("countryName1 countryName2")).toBeInTheDocument();
});

test("GIFボタンが表示されていること", () => {
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
  expect(screen.getByRole("button", { name: "GIF" })).toBeInTheDocument();
});

test("GIFボタン押下でGIFモーダルが表示されること", async () => {
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
    await user.click(screen.getByRole("button", { name: "GIF" }));
  });
  expect(screen.getByRole("dialog", { name: "GIFモーダル" })).toBeInTheDocument();
});

test("絶景カード押下で絶景詳細ページに遷移すること", async () => {
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
    await user.click(screen.getByRole("listitem", { name: "絶景一覧: 絶景名" }));
  });
  expect(mockNavigate).toHaveBeenCalledWith("/world_views/1");
  expect(mockNavigate).toHaveBeenCalledTimes(1);
});
