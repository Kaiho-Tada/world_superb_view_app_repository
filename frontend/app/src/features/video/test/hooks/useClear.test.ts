import { renderHook } from "@testing-library/react";
import useClear from "features/video/hooks/useClear";
import { act } from "react-dom/test-utils";

const mockDispatch = jest.fn();
jest.mock("providers/VideoListProvider", () => ({
  useVideoListContext: () => ({
    dispatch: mockDispatch,
    state: {
      genreCheckItems: [
        { label: "ラベルA", checked: true },
        { label: "ラベルB", checked: true },
      ],
      keyword: "キーワード",
      voteAverageRange: [3, 7],
      isDisabled: false,
    },
  }),
}));

test("genreCheckItemsのchekedがfalseに更新されること", () => {
  const { result } = renderHook(() => useClear());
  act(() => {
    result.current.handleClear();
  });
  expect(mockDispatch).toHaveBeenCalledWith({
    type: "SET_GENRE_CHECK_ITEMS",
    payload: [
      { label: "ラベルA", checked: false },
      { label: "ラベルB", checked: false },
    ],
  });
  expect(mockDispatch).toHaveBeenCalledTimes(4);
});

test("keywordが空文字に更新されること", () => {
  const { result } = renderHook(() => useClear());
  act(() => {
    result.current.handleClear();
  });
  expect(mockDispatch).toHaveBeenCalledWith({ type: "SET_KEYWORD", payload: "" });
  expect(mockDispatch).toHaveBeenCalledTimes(4);
});

test("voteAverageRangeの範囲が[0, 10]に更新されること", () => {
  const { result } = renderHook(() => useClear());
  act(() => {
    result.current.handleClear();
  });
  expect(mockDispatch).toHaveBeenCalledWith({ type: "SET_VOTE_AVERAGE_RENGE", payload: [0, 10] });
  expect(mockDispatch).toHaveBeenCalledTimes(4);
});

test("isDisabledがtrueに更新されること", () => {
  const { result } = renderHook(() => useClear());
  act(() => {
    result.current.handleClear();
  });
  expect(mockDispatch).toHaveBeenCalledWith({ type: "SET_IS_DISABLED", payload: true });
  expect(mockDispatch).toHaveBeenCalledTimes(4);
});
