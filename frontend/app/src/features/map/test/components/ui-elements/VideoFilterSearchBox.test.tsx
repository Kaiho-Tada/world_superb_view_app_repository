import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import VideoFilterSearchBox from "features/map/components/ui-elements/VideoFilterSearchBox";
import { act } from "react-dom/test-utils";

const mockDispatch = jest.fn();
jest.mock("providers/VideoListProvider", () => ({
  ...jest.requireActual("providers/VideoListProvider"),
  useVideoListContext: () => ({
    dispatch: mockDispatch,
    state: { keyword: "", loadingSearchVideos: false },
  }),
}));
test("searchBoxが表示されていること", () => {
  render(<VideoFilterSearchBox />);
  expect(screen.getByRole("searchbox")).toBeInTheDocument();
});

test("textBoxが表示されていること", () => {
  render(<VideoFilterSearchBox />);
  expect(screen.getByPlaceholderText("作品名で絞り込み")).toBeInTheDocument();
});

test("textBoxの入力をトリガーにkeywordが更新されること", async () => {
  const user = userEvent.setup();

  render(<VideoFilterSearchBox />);

  await act(async () => {
    await user.type(screen.getByPlaceholderText("作品名で絞り込み"), "キ");
  });
  expect(mockDispatch).toHaveBeenCalledWith({ type: "SET_KEYWORD", payload: "キ" });
  expect(mockDispatch).toHaveBeenCalledTimes(2);
});

test("キーワード更新の際にshouldDebounceがtrueに更新されること", async () => {
  const user = userEvent.setup();

  render(<VideoFilterSearchBox />);
  await act(async () => {
    await user.type(screen.getByPlaceholderText("作品名で絞り込み"), "キ");
  });
  expect(mockDispatch).toHaveBeenCalledWith({ type: "SET_SHOULD_DEBOUNCE", payload: true });
  expect(mockDispatch).toHaveBeenCalledTimes(2);
});
