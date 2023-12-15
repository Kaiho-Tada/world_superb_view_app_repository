import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import FilterSearchBox from "components/molecules/FilterSearchBox";

const spyOnUseWorldViewListContext = jest.spyOn(
  jest.requireActual("hooks/providers/WorldViewListProvider"),
  "useWorldViewListContext"
);

const mockSetKeyword = jest.fn();
const mockSetShouldDebounce = jest.fn();
const mockContextValue = {
  setKeyword: mockSetKeyword,
  loadingSearchWorldViews: false,
  setShouldDebounce: mockSetShouldDebounce,
};

const mockContextValueLoadingSearchWorldViews = {
  setKeyword: mockSetKeyword,
  loadingSearchWorldViews: true,
  setShouldDebounce: mockSetShouldDebounce,
};

test("テキストボックスがレンダリングされていること", () => {
  spyOnUseWorldViewListContext.mockImplementation(() => mockContextValue);
  render(<FilterSearchBox />);
  expect(screen.getByRole("textbox", { name: "テキストボックス" })).toBeInTheDocument();
});

test("テキストボックスの入力をトリガーにkeywordが更新されること", async () => {
  const user = userEvent.setup();
  spyOnUseWorldViewListContext.mockImplementation(() => mockContextValue);
  render(<FilterSearchBox />);
  await user.type(screen.getByRole("textbox", { name: "テキストボックス" }), "キーワード");
  expect(mockSetKeyword).toHaveBeenCalledWith("キーワード");
  expect(mockSetKeyword).toHaveBeenCalledTimes(5);
});

test("キーワード更新の際にshouldDebounceがtrueに更新されること", async () => {
  const user = userEvent.setup();
  spyOnUseWorldViewListContext.mockImplementation(() => mockContextValue);
  render(<FilterSearchBox />);
  await user.type(screen.getByRole("textbox", { name: "テキストボックス" }), "キーワード");
  expect(mockSetShouldDebounce).toHaveBeenCalledWith(true);
  expect(mockSetShouldDebounce).toHaveBeenCalledTimes(5);
});

test("loadingSearchWorldViewsがtrueの場合、テキストボックスが入力不可になっていること", () => {
  spyOnUseWorldViewListContext.mockImplementation(() => mockContextValueLoadingSearchWorldViews);
  render(<FilterSearchBox />);
  expect(screen.getByRole("textbox", { name: "テキストボックス" })).toBeDisabled();
});

test("クリアボタンがレンダリングされていること", () => {
  spyOnUseWorldViewListContext.mockImplementation(() => mockContextValue);
  render(<FilterSearchBox />);
  expect(screen.getByRole("img", { name: "クリアボタン" })).toBeInTheDocument();
  expect(screen.getByRole("img", { name: "クリアボタン" })).toHaveStyle("pointerEvents: auto");
});

test("loadingSearchWorldViewsがtrueの場合、クリアボタンが押下不可になっていること", () => {
  spyOnUseWorldViewListContext.mockImplementation(() => mockContextValueLoadingSearchWorldViews);
  render(<FilterSearchBox />);
  expect(screen.getByRole("img", { name: "クリアボタン" })).toHaveStyle("pointerEvents: none");
});

test("クリアボタン押下でテキストボックスの文字がリセットされること", async () => {
  const user = userEvent.setup();
  spyOnUseWorldViewListContext.mockImplementation(() => mockContextValue);
  render(<FilterSearchBox />);
  await user.click(screen.getByRole("img", { name: "クリアボタン" }));
  expect(mockSetKeyword).toHaveBeenCalledWith("");
  expect(mockSetKeyword).toHaveBeenCalledTimes(1);
});
