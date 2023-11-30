import { renderHook } from "@testing-library/react";
import useDebounce from "hooks/debounce/useDebounce";
import { act } from "react-dom/test-utils";

jest.useFakeTimers();
test("useDebounceの挙動のテスト", () => {
  const { result } = renderHook(() => useDebounce(1000));
  const mockFunction = jest.fn();
  const mockClearTimeout = jest.fn();
  global.clearTimeout = mockClearTimeout;

  // 一回目の実行
  act(() => {
    result.current.debounce(mockFunction);
  });

  // mockFunctionが実行されていないことを確認
  expect(mockFunction).toHaveBeenCalledTimes(0);

  // 1000m秒進める
  act(() => {
    jest.advanceTimersByTime(1000);
  });

  // mockFunctionが実行される
  expect(mockFunction).toHaveBeenCalledTimes(1);

  // mockClearTimeoutが実行されていないことを確認
  expect(mockClearTimeout).toHaveBeenCalledTimes(0);

  // 二回目の実行
  act(() => {
    result.current.debounce(mockFunction);
  });

  // mockClearTimeoutが実行される
  expect(mockClearTimeout).toHaveBeenCalledTimes(1);

  // mockFunctionが実行されていないことを確認
  expect(mockFunction).toHaveBeenCalledTimes(1);

  // 1000ミリ秒進める
  act(() => {
    jest.advanceTimersByTime(1000);
  });

  // mockFunctionが実行される
  expect(mockFunction).toHaveBeenCalledTimes(2);
});
