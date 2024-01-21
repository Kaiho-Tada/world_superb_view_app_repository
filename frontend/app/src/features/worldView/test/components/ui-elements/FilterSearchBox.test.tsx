import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import FilterSearchBox from "features/worldView/components/ui-elements/FilterSearchBox";
import { useWorldViewListContext as mockUseWorldViewListContext } from "providers/WorldViewListProvider";

jest.mock("providers/WorldViewListProvider", () => ({
  useWorldViewListContext: jest.fn(),
}));

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
  (mockUseWorldViewListContext as jest.Mock).mockReturnValue(mockContextValue);
  render(<FilterSearchBox />);
  expect(screen.getByRole("textbox", { name: "テキストボックス" })).toBeInTheDocument();
});

test("テキストボックスの入力をトリガーにkeywordが更新されること", async () => {
  (mockUseWorldViewListContext as jest.Mock).mockReturnValue(mockContextValue);
  const user = userEvent.setup();
  render(<FilterSearchBox />);
  await user.type(screen.getByRole("textbox", { name: "テキストボックス" }), "キーワード");
  expect(mockDispatch).toHaveBeenCalledWith({ type: "SET_KEYWORD", payload: "キーワード" });
});

test("キーワード更新の際にshouldDebounceがtrueに更新されること", async () => {
  (mockUseWorldViewListContext as jest.Mock).mockReturnValue(mockContextValue);
  const user = userEvent.setup();
  render(<FilterSearchBox />);
  await user.type(screen.getByRole("textbox", { name: "テキストボックス" }), "キーワード");
  expect(mockDispatch).toHaveBeenCalledWith({ type: "SET_SHOULD_DEBOUNCE", payload: true });
});

test("loadingSearchWorldViewsがtrueの場合、テキストボックスが入力不可になっていること", () => {
  (mockUseWorldViewListContext as jest.Mock).mockReturnValue(
    mockContextValueLoadingSearchWorldViews
  );
  render(<FilterSearchBox />);
  expect(screen.getByRole("textbox", { name: "テキストボックス" })).toBeDisabled();
});

test("クリアボタンがレンダリングされていること", () => {
  (mockUseWorldViewListContext as jest.Mock).mockReturnValue(mockContextValue);
  render(<FilterSearchBox />);
  expect(screen.getByRole("img", { name: "クリアボタン" })).toBeInTheDocument();
  expect(screen.getByRole("img", { name: "クリアボタン" })).toHaveStyle("pointerEvents: auto");
});

test("loadingSearchWorldViewsがtrueの場合、クリアボタンが押下不可になっていること", () => {
  (mockUseWorldViewListContext as jest.Mock).mockReturnValue(
    mockContextValueLoadingSearchWorldViews
  );
  render(<FilterSearchBox />);
  expect(screen.getByRole("img", { name: "クリアボタン" })).toHaveStyle("pointerEvents: none");
});

test("クリアボタン押下でテキストボックスの文字がリセットされること", async () => {
  (mockUseWorldViewListContext as jest.Mock).mockReturnValue(mockContextValue);
  const user = userEvent.setup();
  render(<FilterSearchBox />);
  await user.click(screen.getByRole("img", { name: "クリアボタン" }));
  expect(mockDispatch).toHaveBeenCalledWith({ type: "SET_KEYWORD", payload: "" });
  expect(mockDispatch).toHaveBeenCalledTimes(1);
});
