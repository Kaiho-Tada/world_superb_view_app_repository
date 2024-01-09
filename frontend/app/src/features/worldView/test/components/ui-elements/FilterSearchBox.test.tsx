import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import FilterSearchBox from "features/worldView/components/ui-elements/FilterSearchBox";

const spyOnUseWorldViewListContext = jest.spyOn(
  jest.requireActual("providers/WorldViewListProvider"),
  "useWorldViewListContext"
);

const mockDispatch = jest.fn();
const mockContextValue = {
  dispatch: mockDispatch,
  state: {
    loadingSearchWorldViews: false,
  },
};
const mockContextValueLoadingSearchWorldViews = {
  dispatch: mockDispatch,
  state: {
    loadingSearchWorldViews: true,
  },
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
  expect(mockDispatch).toHaveBeenCalledWith({ type: "SET_KEYWORD", payload: "キーワード" });
});

test("キーワード更新の際にshouldDebounceがtrueに更新されること", async () => {
  const user = userEvent.setup();
  spyOnUseWorldViewListContext.mockImplementation(() => mockContextValue);
  render(<FilterSearchBox />);
  await user.type(screen.getByRole("textbox", { name: "テキストボックス" }), "キーワード");
  expect(mockDispatch).toHaveBeenCalledWith({ type: "SET_SHOULD_DEBOUNCE", payload: true });
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
  expect(mockDispatch).toHaveBeenCalledWith({ type: "SET_KEYWORD", payload: "" });
  expect(mockDispatch).toHaveBeenCalledTimes(1);
});
