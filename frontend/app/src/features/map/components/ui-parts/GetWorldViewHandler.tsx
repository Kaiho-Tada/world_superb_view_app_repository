import useWorldViewApi from "features/worldView/api/useWorldViewApi";
import { WorldView } from "features/worldView/types/api/worldView";
import useGetModel from "hooks/api/useGetModel";
import useDebounce from "hooks/useDebounce";
import { useWorldViewListContext } from "providers/WorldViewListProvider";
import { FC, useEffect } from "react";

const GetWorldViewHandler: FC = () => {
  const { state, dispatch } = useWorldViewListContext();
  const { handleDebounce } = useDebounce(1500);
  const { searchWorldViewApi } = useWorldViewApi();
  const { handleGetModel } = useGetModel();

  const {
    categoryCheckItems,
    countryCheckItems,
    characteristicCheckItems,
    riskLevel,
    keyword,
    isSkipSearchWorldViews,
    shouldDebounce,
  } = state;

  const loadingSearchWorldViewsDispatch = (payload: boolean) => {
    dispatch({ type: "SET_LOADING_SEARCH_WORLDVIEWS", payload });
  };
  const worldViesDispatch = (responseData: WorldView[]) => {
    dispatch({ type: "SET_WORLD_VIEWS", payload: responseData });
  };
  const handleSearchWorldViews = () => {
    handleGetModel<WorldView>({
      loadingGetModelDispatch: loadingSearchWorldViewsDispatch,
      modelDispatch: worldViesDispatch,
      getModelApi: searchWorldViewApi,
    });
  };
  useEffect(() => {
    if (!isSkipSearchWorldViews) {
      if (!shouldDebounce) {
        handleSearchWorldViews();
      } else {
        handleDebounce(handleSearchWorldViews);
        dispatch({ type: "SET_SHOULD_DEBOUNCE", payload: false });
      }
    }
    dispatch({ type: "SET_IS_SKIP_SEARCH_WORLD_VIEWS", payload: false });
  }, [categoryCheckItems, countryCheckItems, characteristicCheckItems, riskLevel, keyword]);
  return null;
};

export default GetWorldViewHandler;
