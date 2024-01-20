import { AxiosResponse } from "axios";
import { useCallback, useRef } from "react";

type ArgProps<T> = {
  loadingSearchModelDispatch: (payload: boolean) => void;
  modelDispatch: (responseData: T[]) => void;
  searchModelApi: () => Promise<AxiosResponse<T[]>>;
};
type DebounceProps<T> = {
  fn: (props: ArgProps<T>) => Promise<void>;
  arg: ArgProps<T>;
};
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

  const handleDebounceWithArg = useCallback(
    <T>({ fn, arg }: DebounceProps<T>) => {
      if (timer.current) {
        clearTimeout(timer.current);
      }
      timer.current = setTimeout(() => {
        fn(arg);
      }, timeout);
    },
    [timeout]
  );
  return { debounce, handleDebounceWithArg };
};
export default useDebounce;
