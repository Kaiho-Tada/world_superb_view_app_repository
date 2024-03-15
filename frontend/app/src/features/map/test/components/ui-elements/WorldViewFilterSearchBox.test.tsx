import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import WorldViewFilterSearchBox from "features/map/components/ui-elements/WorldViewFilterSearchBox";

const mockDispatch = jest.fn();
jest.mock("providers/WorldViewListProvider", () => ({
  ...jest.requireActual("providers/WorldViewListProvider"),
  useWorldViewListContext: () => ({
    dispatch: mockDispatch,
    state: {
      keyword: "",
      loadingSearchWorldViews: false,
    },
  }),
}));
test("searchBoxが表示されていること", () => {
  render(<WorldViewFilterSearchBox />);
  expect(screen.getByRole("searchbox")).toBeInTheDocument();
});

test("textBoxが表示されていること", () => {
  render(<WorldViewFilterSearchBox />);
  expect(screen.getByPlaceholderText("絶景名または国名で絞り込み")).toBeInTheDocument();
});

test("textBoxの入力をトリガーにkeywordが更新されること", async () => {
  const user = userEvent.setup();

  render(<WorldViewFilterSearchBox />);

  await act(async () => {
    await user.type(screen.getByPlaceholderText("絶景名または国名で絞り込み"), "キ");
  });
  expect(mockDispatch).toHaveBeenCalledWith({ type: "SET_KEYWORD", payload: "キ" });
  expect(mockDispatch).toHaveBeenCalledTimes(2);
});

test("キーワード更新の際にshouldDebounceがtrueに更新されること", async () => {
  const user = userEvent.setup();

  render(<WorldViewFilterSearchBox />);
  await act(async () => {
    await user.type(screen.getByPlaceholderText("絶景名または国名で絞り込み"), "キ");
  });
  expect(mockDispatch).toHaveBeenCalledWith({ type: "SET_SHOULD_DEBOUNCE", payload: true });
  expect(mockDispatch).toHaveBeenCalledTimes(2);
});
