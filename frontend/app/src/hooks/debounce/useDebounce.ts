import { useCallback, useRef } from "react";

const useDebounce = (timeout: number) => {
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const debounce = useCallback(
    (fn: () => void) => {
      if (timer.current) {
        clearTimeout(timer.current);
      }
      timer.current = setTimeout(() => {
        fn();
      }, timeout);
    },
    [timeout]
  );
  return { debounce };
};
export default useDebounce;
