import { renderHook } from "@testing-library/react";
import useSortChange from "features/video/hooks/useSortChange";
import { ChangeEvent } from "react";

const mockDispatch = jest.fn();
jest.mock("providers/VideoListProvider", () => ({
  useVideoListContext: () => ({
    dispatch: mockDispatch,
  }),
}));

describe("セレクトボックスの選択値が '人気が高い順' の場合", () => {
  test("sortCriteriaの値がpopularityに更新されるSET_SORT_CRITERIAアクションがdispatchされること", () => {
    const { result } = renderHook(() => useSortChange());
    const mockEvent = { target: { value: "人気が高い順" } };
    result.current.handleChangeSort(mockEvent as ChangeEvent<HTMLSelectElement>);
    expect(mockDispatch).toHaveBeenCalledWith({ type: "SET_SORT_CRITERIA", payload: "popularity" });
  });
});

describe("セレクトボックスの選択値が '評価が高い順' の場合", () => {
  test("sortCriteriaの値がpopularityに更新されるSET_SORT_CRITERIAアクションがdispatchされること", () => {
    const { result } = renderHook(() => useSortChange());
    const mockEvent = { target: { value: "評価が高い順" } };
    result.current.handleChangeSort(mockEvent as ChangeEvent<HTMLSelectElement>);
    expect(mockDispatch).toHaveBeenCalledWith({
      type: "SET_SORT_CRITERIA",
      payload: "voteAverage",
    });
  });
});

describe("セレクトボックスの選択値が '公開日が早い順' の場合", () => {
  test("sortCriteriaの値がpopularityに更新されるSET_SORT_CRITERIAアクションがdispatchされること", () => {
    const { result } = renderHook(() => useSortChange());
    const mockEvent = { target: { value: "公開日が早い順" } };
    result.current.handleChangeSort(mockEvent as ChangeEvent<HTMLSelectElement>);
    expect(mockDispatch).toHaveBeenCalledWith({
      type: "SET_SORT_CRITERIA",
      payload: "releaseDate",
    });
  });
});
