import { renderHook } from "@testing-library/react";
import useDebounce from "hooks/useDebounce";
import { act } from "react-dom/test-utils";

describe("useDebounce関数のテスト", () => {
  jest.useFakeTimers();
  const mockClearTimeout = jest.fn();
  global.clearTimeout = mockClearTimeout;
  const mockFunction = jest.fn();

  test("debounce関数の挙動のテスト", () => {
    const { result } = renderHook(() => useDebounce(1000));

    // 一回目の実行
    act(() => {
      result.current.handleDebounce(mockFunction);
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
      result.current.handleDebounce(mockFunction);
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

  test("handleDebounceWithArg関数の挙動のテスト", () => {
    const mockLoadingSearchModelDispatch = jest.fn();
    const mockModelDispatch = jest.fn();
    const mockSearchModelApi = jest.fn();

    const { result } = renderHook(() => useDebounce(1000));

    // 一回目の実行
    act(() => {
      result.current.handleDebounceWithArg({
        fn: mockFunction,
        arg: {
          loadingSearchModelDispatch: mockLoadingSearchModelDispatch,
          modelDispatch: mockModelDispatch,
          searchModelApi: mockSearchModelApi,
        },
      });
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
      result.current.handleDebounceWithArg({
        fn: mockFunction,
        arg: {
          loadingSearchModelDispatch: mockLoadingSearchModelDispatch,
          modelDispatch: mockModelDispatch,
          searchModelApi: mockSearchModelApi,
        },
      });
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

    // mockFunctionの引数にargの値が設定されている
    expect(mockFunction).toHaveBeenCalledWith({
      loadingSearchModelDispatch: mockLoadingSearchModelDispatch,
      modelDispatch: mockModelDispatch,
      searchModelApi: mockSearchModelApi,
    });
  });
});
