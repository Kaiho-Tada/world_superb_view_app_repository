import { render, screen } from "@testing-library/react";
import SuperbViewCard from "components/organisms/superbView/SuperbViewCard";

test("絶景画像がレンダリングされていること", () => {
  render(<SuperbViewCard name="絶景名" imageUrl="画像URL" bestSeason="1月" />);
  const SuperbViewImage = screen.getByRole("img", { name: "絶景画像" });
  expect(SuperbViewImage).toBeInTheDocument();
});

test("絶景名がレンダリングされていること", () => {
  render(<SuperbViewCard name="絶景名" imageUrl="画像URL" bestSeason="1月" />);
  const SuperbViewName = screen.getByRole("heading", { name: "絶景名" });
  expect(SuperbViewName).toBeInTheDocument();
});

test("絶景の概要がレンダリングされていること", () => {
  render(<SuperbViewCard name="絶景名" imageUrl="画像URL" bestSeason="1月" />);
  const SuperbViewDescription = screen.getByRole("heading", {
    name: "ナイアガラは、北アメリカ大陸にある三つの滝から成る大瀑布で、その壮大な景観と迫力ある水量が特徴です。観光名所として知られ、アメリカとカナダの国境に位置しています。",
  });
  expect(SuperbViewDescription).toBeInTheDocument();
});

test("ベストシーズンの見出しがレンダリングされていること", () => {
  render(<SuperbViewCard name="絶景名" imageUrl="画像URL" bestSeason="1月" />);
  const BestSeasonHeading = screen.getByRole("heading", { name: "ベストシーズン" });
  expect(BestSeasonHeading).toBeInTheDocument();
});

test("ベストシーズンがレンダリングされていること", () => {
  render(<SuperbViewCard name="絶景名" imageUrl="画像URL" bestSeason="1月" />);
  const BestSeason = screen.getByRole("heading", { name: "1月" });
  expect(BestSeason).toBeInTheDocument();
});
