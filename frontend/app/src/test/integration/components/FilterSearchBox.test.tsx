import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import FilterSearchBox from "components/molecules/FilterSearchBox";

const spyOnUseSuperbViewListContext = jest.spyOn(
  jest.requireActual("hooks/providers/SuperbViewListProvider"),
  "useSuperbViewListContext"
);

const mockSetKeyword = jest.fn();
const mockSetShouldDebounce = jest.fn();
const mockContextValue = {
  setKeyword: mockSetKeyword,
  loadingSearchSuperbViews: false,
  setShouldDebounce: mockSetShouldDebounce,
};

const mockContextValueLoadingSearchSuperbViews = {
  setKeyword: mockSetKeyword,
  loadingSearchSuperbViews: true,
  setShouldDebounce: mockSetShouldDebounce,
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

test("キーワード更新の際にshouldDebounceがtrueに更新されること", async () => {
  const user = userEvent.setup();
  spyOnUseSuperbViewListContext.mockImplementation(() => mockContextValue);
  render(<FilterSearchBox />);
  await user.type(screen.getByRole("textbox", { name: "テキストボックス" }), "キーワード");
  expect(mockSetShouldDebounce).toHaveBeenCalledWith(true);
  expect(mockSetShouldDebounce).toHaveBeenCalledTimes(5);
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
