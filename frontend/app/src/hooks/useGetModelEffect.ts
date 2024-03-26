import { useEffect } from "react";
import useDebounce from "./useDebounce";

interface Props {
  handleGetModel: () => void;
  setShouldDebounceDispatch?: (payload: boolean) => void;
  setIsSkipGetModelDispatch?: (payload: boolean) => void;
  isSkipGetModel?: boolean;
  shouldDebounce?: boolean;
  dependencyArray?: any[];
}

const useGetModelEffect = (props: Props) => {
  const {
    handleGetModel,
    setShouldDebounceDispatch = undefined,
    setIsSkipGetModelDispatch = undefined,
    isSkipGetModel = false,
    shouldDebounce = false,
    dependencyArray = [],
  } = props;
  const { handleDebounce } = useDebounce(1500);

  useEffect(() => {
    if (!isSkipGetModel) {
      if (!shouldDebounce) {
        handleGetModel();
      } else {
        handleDebounce(handleGetModel);
        if (setShouldDebounceDispatch) {
          setShouldDebounceDispatch(false);
        }
      }
    }
    if (isSkipGetModel && setIsSkipGetModelDispatch) {
      setIsSkipGetModelDispatch(false);
    }
  }, dependencyArray);
};

export default useGetModelEffect;
