import { renderHook } from "@testing-library/react";
import useSortWordView from "features/worldView/hooks/sort/useSortWordView";
import { ChangeEvent } from "react";

const mockDispatch = jest.fn();
jest.mock("providers/WorldViewListProvider", () => ({
  useWorldViewListContext: () => ({
    dispatch: mockDispatch,
  }),
}));

describe("セレクトボックスの選択値が 'BMI値が低い順' の場合", () => {
  test("SET_SORT_CRITERIAアクションがdispatchされ、sortCriteriaの値がbmiに更新されること", () => {
    const { result } = renderHook(() => useSortWordView());
    const mockEvent = { target: { value: "BMI値が低い順" } };
    result.current.handleSortChangeWorldView(mockEvent as ChangeEvent<HTMLSelectElement>);
    expect(mockDispatch).toHaveBeenCalledWith({ type: "SET_SORT_CRITERIA", payload: "bmi" });
  });
});

describe("セレクトボックスの選択値が '新しい順' の場合", () => {
  test("SET_SORT_CRITERIAアクションがdispatchされ、sortCriteriaの値がlatestに更新されること", () => {
    const { result } = renderHook(() => useSortWordView());
    const mockEvent = { target: { value: "新しい順" } };
    result.current.handleSortChangeWorldView(mockEvent as ChangeEvent<HTMLSelectElement>);
    expect(mockDispatch).toHaveBeenCalledWith({ type: "SET_SORT_CRITERIA", payload: "latest" });
  });
});

describe("セレクトボックスの選択値が 'いいね順' の場合", () => {
  test("SET_SORT_CRITERIAアクションがdispatchされ、sortCriteriaの値がfavoriteに更新されること", () => {
    const { result } = renderHook(() => useSortWordView());
    const mockEvent = { target: { value: "いいね順" } };
    result.current.handleSortChangeWorldView(mockEvent as ChangeEvent<HTMLSelectElement>);
    expect(mockDispatch).toHaveBeenCalledWith({ type: "SET_SORT_CRITERIA", payload: "favorite" });
  });
});

describe("セレクトボックスの選択値が 'RISKLEVELが低い順' の場合", () => {
  test("SET_SORT_CRITERIAアクションがdispatchされ、sortCriteriaの値がriskLevelに更新されること", () => {
    const { result } = renderHook(() => useSortWordView());
    const mockEvent = { target: { value: "RISKLEVELが低い順" } };
    result.current.handleSortChangeWorldView(mockEvent as ChangeEvent<HTMLSelectElement>);
    expect(mockDispatch).toHaveBeenCalledWith({ type: "SET_SORT_CRITERIA", payload: "riskLevel" });
  });
});
