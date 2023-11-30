import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import FilterSearchBox from "components/molecules/FilterSearchBox";
import * as SuperbViewListProviderModule from "hooks/providers/SuperbViewListProvider";

const spyOnUseSuperbViewListContext = jest.spyOn(
  SuperbViewListProviderModule,
  "useSuperbViewListContext"
);

const mockDebounce = jest.fn();
jest.mock("hooks/debounce/useDebounce", () => ({
  __esModule: true,
  default: () => ({ debounce: mockDebounce }),
}));

const mockHandleSearchSuperbView = jest.fn();
jest.mock("hooks/api/superbView/useSearchSuperbView", () => ({
  __esModule: true,
  default: () => ({ handleSearchSuperbView: mockHandleSearchSuperbView }),
}));

const mockSetKeyword = jest.fn();

const mockContextValue = {
  ...jest.requireActual("hooks/providers/SuperbViewListProvider").useSuperbViewListContext,
  setKeyword: mockSetKeyword,
  loadingSuperbViews: false,
  loadingSearchSuperbViews: false,
};

const mockContextValueLoadingSuperbViews = {
  ...jest.requireActual("hooks/providers/SuperbViewListProvider").useSuperbViewListContext,
  setKeyword: mockSetKeyword,
  loadingSuperbViews: true,
  loadingSearchSuperbViews: false,
};

const mockContextValueLoadingSearchSuperbViews = {
  ...jest.requireActual("hooks/providers/SuperbViewListProvider").useSuperbViewListContext,
  setKeyword: mockSetKeyword,
  loadingSuperbViews: false,
  loadingSearchSuperbViews: true,
};

test("テキストボックスがレンダリングされていること", () => {
  spyOnUseSuperbViewListContext.mockImplementation(() => mockContextValue);
  render(<FilterSearchBox />);
  expect(screen.getByRole("textbox", { name: "テキストボックス" })).toBeInTheDocument();
});

test("テキストボックスの入力をトリガーにkeywordが更新されること", async () => {
  const user = userEvent.setup();
  spyOnUseSuperbViewListContext.mockImplementation(() => mockContextValue);
  render(<FilterSearchBox />);
  await user.type(screen.getByRole("textbox", { name: "テキストボックス" }), "キーワード");
  expect(mockSetKeyword).toHaveBeenCalledWith("キーワード");
  expect(mockSetKeyword).toHaveBeenCalledTimes(5);
});

test("loadingSuperbViewsがtrueの場合、テキストボックスが入力不可になっていること", () => {
  spyOnUseSuperbViewListContext.mockImplementation(() => mockContextValueLoadingSuperbViews);
  render(<FilterSearchBox />);
  expect(screen.getByRole("textbox", { name: "テキストボックス" })).toBeDisabled();
});

test("loadingSearchSuperbViewsがtrueの場合、テキストボックスが入力不可になっていること", () => {
  spyOnUseSuperbViewListContext.mockImplementation(() => mockContextValueLoadingSearchSuperbViews);
  render(<FilterSearchBox />);
  expect(screen.getByRole("textbox", { name: "テキストボックス" })).toBeDisabled();
});

test("クリアボタンがレンダリングされていること", () => {
  spyOnUseSuperbViewListContext.mockImplementation(() => mockContextValue);
  render(<FilterSearchBox />);
  expect(screen.getByRole("img", { name: "クリアボタン" })).toBeInTheDocument();
});

test("クリアボタン押下でテキストボックスの文字がリセットされること", async () => {
  const user = userEvent.setup();
  spyOnUseSuperbViewListContext.mockImplementation(() => mockContextValue);
  render(<FilterSearchBox />);
  await user.click(screen.getByRole("img", { name: "クリアボタン" }));
  expect(mockSetKeyword).toHaveBeenCalledWith("");
  expect(mockSetKeyword).toHaveBeenCalledTimes(1);
});

test("keywordの更新をトリガーにhandleSearchSuperbViewが実行されること", async () => {
  const user = userEvent.setup();
  spyOnUseSuperbViewListContext.mockImplementation(() => mockContextValue);
  render(<FilterSearchBox />);
  await user.type(screen.getByRole("textbox", { name: "テキストボックス" }), "キーワード");
  expect(mockDebounce).toHaveBeenCalledWith(mockHandleSearchSuperbView);
  expect(mockDebounce).toHaveBeenCalledTimes(1);
});
