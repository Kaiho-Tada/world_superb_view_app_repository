import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import FilterAccordion from "features/video/components/ui-parts/FilterAccordion";
import { act } from "react-dom/test-utils";

window.scrollTo = jest.fn();
global.ResizeObserver = require("resize-observer-polyfill");

const mockDispatch = jest.fn();

const spyOnUseVideoListContext = jest.spyOn(
  jest.requireActual("providers/VideoListProvider"),
  "useVideoListContext"
);

const mockContextValue = {
  dispatch: mockDispatch,
  state: {
    genreCheckItems: [
      { label: "ラベルA", checked: false },
      { label: "ラベルB", checked: false },
    ],
    voteAverageRange: [0, 10],
    isDisabled: false,
  },
};

const mockContextValueDisabled = {
  ...mockContextValue,
  state: {
    ...mockContextValue.state,
    isDisabled: true,
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

test("アコーディオンボタン押下でキーワードのテキストボックスが表示されること", async () => {
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

describe("FilterRangeSliderのテスト", () => {
  test("アコーディオンボタン押下でユーザー評価のRangeSliderが表示されること", async () => {
    spyOnUseVideoListContext.mockReturnValue(mockContextValue);
    const user = userEvent.setup();
    render(<FilterAccordion />);
    await act(async () => {
      await user.click(screen.getByRole("button", { name: "フィルター" }));
    });
    expect(screen.getAllByRole("slider").length).toBe(2);
  });

  test("isDisabledがtureの場合、スライダーのクリック時ににisDisabledがfalseに更新され、SET_VOTE_AVERAGE_RENGEアクションがdispatchされること", async () => {
    spyOnUseVideoListContext.mockReturnValue(mockContextValueDisabled);
    const user = userEvent.setup();
    render(<FilterAccordion />);
    await act(async () => {
      await user.click(screen.getByRole("button", { name: "フィルター" }));
    });
    const sliders = screen.getAllByRole("slider");
    await act(async () => {
      await user.click(sliders[0]);
    });
    expect(mockDispatch).toHaveBeenCalledWith({ type: "SET_IS_DISABLED", payload: false });
    expect(mockDispatch).toHaveBeenCalledWith({ type: "SET_VOTE_AVERAGE_RENGE", payload: [0, 10] });
    expect(mockDispatch).toHaveBeenCalledTimes(2);
  });
});

describe("SearchButtonのテスト", () => {
  test("アコーディオンボタン押下でSearchButtonが表示されること", async () => {
    spyOnUseVideoListContext.mockReturnValue(mockContextValue);
    const user = userEvent.setup();
    render(<FilterAccordion />);
    await act(async () => {
      await user.click(screen.getByRole("button", { name: "フィルター" }));
    });
    expect(screen.getByRole("button", { name: "検索" })).toBeInTheDocument();
  });

  test("isDisabledがfalseの場合、SearchButton押下でisDisabledがtrueに更新され、handleSearchModel関数が呼び出されること", async () => {
    spyOnUseVideoListContext.mockReturnValue(mockContextValue);
    const spyOnUseSearchModel = jest.spyOn(
      jest.requireActual("hooks/api/useSearchModel"),
      "default"
    );
    const mockHandleSearchModel = jest.fn();
    spyOnUseSearchModel.mockReturnValue({
      handleSearchModel: mockHandleSearchModel,
    });
    const spyOnUseVideoApi = jest.spyOn(
      jest.requireActual("features/video/api/videoApi"),
      "default"
    );
    const mockSearchVideoApi = jest.fn();
    spyOnUseVideoApi.mockReturnValue({ searchVideoApi: mockSearchVideoApi });
    const user = userEvent.setup();
    render(<FilterAccordion />);
    await act(async () => {
      await user.click(screen.getByRole("button", { name: "フィルター" }));
    });
    await act(async () => {
      await user.click(screen.getByRole("button", { name: "検索" }));
    });
    expect(mockDispatch).toHaveBeenCalledWith({ type: "SET_IS_DISABLED", payload: true });
    expect(mockHandleSearchModel).toHaveBeenCalledWith({
      modelDispatch: expect.any(Function),
      loadingSearchModelDispatch: expect.any(Function),
      searchModelApi: mockSearchVideoApi,
    });
    expect(mockDispatch).toHaveBeenCalledTimes(1);
    expect(mockHandleSearchModel).toHaveBeenCalledTimes(1);
    spyOnUseSearchModel.mockRestore();
    spyOnUseVideoApi.mockRestore();
  });
});
