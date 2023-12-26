import { useBreakpointValue } from "@chakra-ui/react";
import { useWorldViewListContext } from "./providers/WorldViewListProvider";

const useClickFilterButton = () => {
  const { dispatch, state } = useWorldViewListContext();
  const screenSize = useBreakpointValue({ base: "base", lg: "lg" });

  const handleClickFilterButton = () => {
    if (screenSize === "lg") {
      if (state.isOpenFilterAccordion === true) {
        dispatch({ type: "CLOSE_FILTER_ACCODION" });
      } else {
        dispatch({ type: "OPEN_FILTER_ACCODION" });
      }
    } else {
      dispatch({ type: "OPEN_FILTER_DRAWER" });
    }
  };
  return { handleClickFilterButton };
};

export default useClickFilterButton;
