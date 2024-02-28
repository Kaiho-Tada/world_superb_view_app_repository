import { useCallback, useRef } from "react";

const useDebounce = (timeout: number) => {
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const handleDebounce = (fn: () => void) => {
    if (timer.current) {
      clearTimeout(timer.current);
    }
    timer.current = setTimeout(() => {
      fn();
    }, timeout);
  };

  const handleDebounceWithArg = useCallback(
    <T>({ fn, arg }: { fn: (props: T) => void; arg: T }) => {
      if (timer.current) {
        clearTimeout(timer.current);
      }
      timer.current = setTimeout(() => {
        fn(arg);
      }, timeout);
    },
    [timeout]
  );
  return { handleDebounce, handleDebounceWithArg };
};
export default useDebounce;
