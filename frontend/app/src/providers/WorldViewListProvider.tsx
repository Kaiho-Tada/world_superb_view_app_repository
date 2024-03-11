import { WorldView } from "features/worldView/types/api/worldView";
import { createContext, Dispatch, FC, ReactNode, useContext, useMemo, useReducer } from "react";
import CheckItem from "types/checkItem";
import { NestedCheckItem } from "types/nestedCheckItem";

export type Action =
  | { type: "SET_CATEGORY_CHECK_ITEMS"; payload: NestedCheckItem[] }
  | { type: "SET_COUNTRY_CHECK_ITEMS"; payload: NestedCheckItem[] }
  | { type: "SET_CHARACTERISTIC_CHECK_ITEMS"; payload: CheckItem[] }
  | { type: "SET_RISK_LEVEL"; payload: string | undefined }
  | { type: "SET_MONTH_RANGE"; payload: number[] }
  | { type: "SET_BMI_RANGE"; payload: number[] }
  | { type: "SET_CHECKED_CATEGORY_LABELS"; payload: string[] }
  | { type: "SET_KEYWORD"; payload: string }
  | { type: "SET_LOADING_SEARCH_WORLDVIEWS"; payload: boolean }
  | { type: "SET_LOADING_GET_WORLDVIEWS"; payload: boolean }
  | { type: "SET_LOADING_GET_CATEGORY"; payload: boolean }
  | { type: "SET_LOADING_GET_COUNTRY"; payload: boolean }
  | { type: "SET_LOADING_GET_CHARACTERISTIC"; payload: boolean }
  | { type: "SET_WORLD_VIEWS"; payload: WorldView[] }
  | { type: "SET_SHOULD_DEBOUNCE"; payload: boolean }
  | { type: "SET_SORT_CRITERIA"; payload: string }
  | { type: "SET_IS_DISABLED_SEARCH_BUTTON"; payload: boolean }
  | { type: "SET_IS_SKIP_SEARCH_WORLD_VIEWS"; payload: boolean }
  | { type: "SET_IS_SKIP_GET_CHECK_ITEMS"; payload: boolean }
  | { type: "SET_CURRENT_PAGE"; payload: number }
  | { type: "SET_ITEMS_OFFSET"; payload: number };

type State = {
  categoryCheckItems: NestedCheckItem[];
  countryCheckItems: NestedCheckItem[];
  characteristicCheckItems: CheckItem[];
  riskLevel: string | undefined;
  monthRange: number[];
  bmiRange: number[];
  keyword: string;
  loadingSearchWorldViews: boolean;
  loadingGetWorldViews: boolean;
  loadingGetCategory: boolean;
  loadingGetCountry: boolean;
  loadingGetCharacteristic: boolean;
  worldViews: Array<WorldView>;
  shouldDebounce: boolean;
  sortCriteria: string;
  isDisabledSearchButton: boolean;
  isSkipSearchWorldViews: boolean;
  isSkipGetCheckItmes: boolean;
  currentPage: number;
  itemsOffset: number;
};

const initialState: State = {
  categoryCheckItems: [],
  countryCheckItems: [],
  characteristicCheckItems: [],
  riskLevel: undefined,
  monthRange: [1, 12],
  bmiRange: [-40, 30],
  keyword: "",
  loadingSearchWorldViews: false,
  loadingGetWorldViews: false,
  loadingGetCategory: false,
  loadingGetCountry: false,
  loadingGetCharacteristic: false,
  worldViews: [],
  shouldDebounce: false,
  sortCriteria: "",
  isDisabledSearchButton: true,
  isSkipSearchWorldViews: false,
  isSkipGetCheckItmes: false,
  currentPage: 1,
  itemsOffset: 0,
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_CATEGORY_CHECK_ITEMS":
      return { ...state, categoryCheckItems: action.payload };

    case "SET_COUNTRY_CHECK_ITEMS":
      return { ...state, countryCheckItems: action.payload };

    case "SET_CHARACTERISTIC_CHECK_ITEMS":
      return { ...state, characteristicCheckItems: action.payload };

    case "SET_RISK_LEVEL":
      return { ...state, riskLevel: action.payload };

    case "SET_MONTH_RANGE":
      return { ...state, monthRange: action.payload };

    case "SET_BMI_RANGE":
      return { ...state, bmiRange: action.payload };

    case "SET_KEYWORD":
      return { ...state, keyword: action.payload };

    case "SET_LOADING_SEARCH_WORLDVIEWS":
      return { ...state, loadingSearchWorldViews: action.payload };

    case "SET_LOADING_GET_WORLDVIEWS":
      return { ...state, loadingGetWorldViews: action.payload };

    case "SET_LOADING_GET_CATEGORY":
      return { ...state, loadingGetCategory: action.payload };

    case "SET_LOADING_GET_COUNTRY":
      return { ...state, loadingGetCountry: action.payload };

    case "SET_LOADING_GET_CHARACTERISTIC":
      return { ...state, loadingGetCharacteristic: action.payload };

    case "SET_WORLD_VIEWS":
      return { ...state, worldViews: action.payload };

    case "SET_SHOULD_DEBOUNCE":
      return { ...state, shouldDebounce: action.payload };

    case "SET_SORT_CRITERIA":
      return { ...state, sortCriteria: action.payload };

    case "SET_IS_DISABLED_SEARCH_BUTTON":
      return { ...state, isDisabledSearchButton: action.payload };

    case "SET_IS_SKIP_SEARCH_WORLD_VIEWS":
      return { ...state, isSkipSearchWorldViews: action.payload };

    case "SET_IS_SKIP_GET_CHECK_ITEMS":
      return { ...state, isSkipGetCheckItmes: action.payload };

    case "SET_CURRENT_PAGE":
      return { ...state, currentPage: action.payload };

    case "SET_ITEMS_OFFSET":
      return { ...state, itemsOffset: action.payload };

    default:
      return state;
  }
};

const WorldViewListContext = createContext(
  {} as {
    state: State;
    dispatch: Dispatch<Action>;
  }
);

const WorldViewListProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const value = useMemo(() => ({ state, dispatch }), [state, dispatch]);

  return <WorldViewListContext.Provider value={value}>{children}</WorldViewListContext.Provider>;
};

const useWorldViewListContext = () => {
  const context = useContext(WorldViewListContext);
  return context;
};

export { WorldViewListProvider, useWorldViewListContext };
