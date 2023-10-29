import { render, screen } from "@testing-library/react";
import MockAdapter from "axios-mock-adapter";
import SuperbViewList from "components/pages/SuperbViewList";
import client from "lib/api/client";

const mockAxios = new MockAdapter(client);

mockAxios.onGet("/superb_views").reply(200, [
  {
    id: 1,
    name: "superb_view1",
    imageUrl: "imageUrl1",
    bestSeason: "bestSeason1",
  },
  {
    id: 2,
    name: "superb_view2",
    imageUrl: "imageUrl2",
    bestSeason: "bestSeason2",
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
