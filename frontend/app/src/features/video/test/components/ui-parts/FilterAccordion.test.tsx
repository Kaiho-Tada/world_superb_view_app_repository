import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import FilterAccordion from "features/video/components/ui-parts/FilterAccordion";
import { act } from "react-dom/test-utils";

window.scrollTo = jest.fn();

jest.mock("providers/VideoListProvider", () => ({
  useVideoListContext: () => ({
    dispatch: jest.fn(),
    state: {
      genreCheckItems: [
        { label: "ラベルA", checked: false },
        { label: "ラベルB", checked: false },
      ],
      loadingGetGenres: false,
      loadingSearchVideos: false,
    },
  }),
}));

test("アコーディオンがレンダリングされていること", () => {
  render(<FilterAccordion />);
  expect(screen.getByRole("region", { name: "絞り込みのアコーディオン" })).toBeInTheDocument();
});

test("アコーディオンボタンがレンダリングされていること", () => {
  render(<FilterAccordion />);
  expect(screen.getByRole("button", { name: "フィルター" })).toBeInTheDocument();
});

test("アコーディオンボタン押下でキーワードのテキストボックスが表示されること", async () => {
  const user = userEvent.setup();
  render(<FilterAccordion />);
  await act(async () => {
    await user.click(screen.getByRole("button", { name: "フィルター" }));
  });
  expect(screen.getByRole("searchbox")).toBeInTheDocument();
});

test("アコーディオンボタン押下でジャンルのCheckItemBoxが表示されること", async () => {
  const user = userEvent.setup();
  render(<FilterAccordion />);
  await act(async () => {
    await user.click(screen.getByRole("button", { name: "フィルター" }));
  });
  expect(screen.getByRole("button", { name: "ラベルA" })).toBeInTheDocument();
  expect(screen.getByRole("button", { name: "ラベルB" })).toBeInTheDocument();
});
