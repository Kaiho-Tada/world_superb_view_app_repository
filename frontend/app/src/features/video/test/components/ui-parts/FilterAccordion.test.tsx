import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import FilterAccordion from "features/video/components/ui-parts/FilterAccordion";
import { act } from "react-dom/test-utils";

window.scrollTo = jest.fn();
global.ResizeObserver = require("resize-observer-polyfill");

const spyOnUseVideoListContext = jest.spyOn(
  jest.requireActual("providers/VideoListProvider"),
  "useVideoListContext"
);

const mockDispatch = jest.fn();
const mockContextValue = {
  dispatch: mockDispatch,
  state: {
    genreCheckItems: [
      { label: "ラベルA", checked: false },
      { label: "ラベルB", checked: false },
    ],
    loadingGetGenres: false,
    loadingSearchVideos: false,
    keyword: "",
    voteAverageRange: [0, 10],
    isDisabled: false,
  },
};

test("アコーディオンがレンダリングされていること", () => {
  spyOnUseVideoListContext.mockReturnValue(mockContextValue);
  render(<FilterAccordion />);
  expect(screen.getByRole("region", { name: "絞り込みのアコーディオン" })).toBeInTheDocument();
});

test("アコーディオンボタンがレンダリングされていること", () => {
  spyOnUseVideoListContext.mockReturnValue(mockContextValue);
  render(<FilterAccordion />);
  expect(screen.getByRole("button", { name: "フィルター" })).toBeInTheDocument();
});

test("アコーディオンボタン押下でクリアボタンが表示されること", async () => {
  const mockContextValueChecked = {
    ...mockContextValue,
    state: {
      ...mockContextValue.state,
      genreCheckItems: [{ label: "ラベルA", checked: true }],
    },
  };
  spyOnUseVideoListContext.mockReturnValue(mockContextValueChecked);
  const user = userEvent.setup();
  render(<FilterAccordion />);
  await act(async () => {
    await user.click(screen.getByRole("button", { name: "フィルター" }));
  });
  expect(screen.getByRole("button", { name: "クリア" })).toBeInTheDocument();
});

test("アコーディオンボタン押下でSearchBoxが表示されること", async () => {
  spyOnUseVideoListContext.mockReturnValue(mockContextValue);
  const user = userEvent.setup();
  render(<FilterAccordion />);
  await act(async () => {
    await user.click(screen.getByRole("button", { name: "フィルター" }));
  });
  expect(screen.getByRole("searchbox")).toBeInTheDocument();
});

test("アコーディオンボタン押下でジャンルのCheckItemBoxが表示されること", async () => {
  spyOnUseVideoListContext.mockReturnValue(mockContextValue);
  const user = userEvent.setup();
  render(<FilterAccordion />);
  await act(async () => {
    await user.click(screen.getByRole("button", { name: "フィルター" }));
  });
  expect(screen.getByRole("button", { name: "ラベルA" })).toBeInTheDocument();
  expect(screen.getByRole("button", { name: "ラベルB" })).toBeInTheDocument();
});

test("アコーディオンボタン押下でユーザー評価のRangeSliderが表示されること", async () => {
  spyOnUseVideoListContext.mockReturnValue(mockContextValue);
  const user = userEvent.setup();
  render(<FilterAccordion />);
  await act(async () => {
    await user.click(screen.getByRole("button", { name: "フィルター" }));
  });
  expect(screen.getAllByRole("slider").length).toBe(2);
});

test("アコーディオンボタン押下でSearchButtonが表示されること", async () => {
  spyOnUseVideoListContext.mockReturnValue(mockContextValue);
  const user = userEvent.setup();
  render(<FilterAccordion />);
  await act(async () => {
    await user.click(screen.getByRole("button", { name: "フィルター" }));
  });
  expect(screen.getByRole("button", { name: "検索" })).toBeInTheDocument();
});
