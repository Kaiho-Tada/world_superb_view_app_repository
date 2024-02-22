import { WorldView } from "features/worldView/types/api/worldView";
import { createContext, Dispatch, FC, ReactNode, useContext, useMemo, useReducer } from "react";
import { CheckBoxItem } from "types/checkBoxItem";
import { NestedCheckBoxItem } from "types/nestedCheckBoxItem";

export type Action =
  | { type: "SET_CATEGORY_CHECKBOX_ITEMS"; payload: NestedCheckBoxItem[] }
  | { type: "SET_COUNTRY_CHECKBOX_ITEMS"; payload: NestedCheckBoxItem[] }
  | { type: "SET_CHARACTERISTIC_CHECK_ITEMS"; payload: CheckBoxItem[] }
  | { type: "SET_RISK_LEVEL_CHECKBOX_ITEMS"; payload: CheckBoxItem[] }
  | { type: "SET_MONTH_CHECKBOX_ITEMS"; payload: NestedCheckBoxItem[] }
  | { type: "SET_BMI_RANGE"; payload: number[] }
  | { type: "SET_CHECKED_CATEGORY_LABELS"; payload: string[] }
  | { type: "SET_KEYWORD"; payload: string }
  | { type: "SET_LOADING_SEARCH_WORLDVIEWS"; payload: boolean }
  | { type: "SET_LOADING_GET_CATEGORY"; payload: boolean }
  | { type: "SET_LOADING_GET_COUNTRY"; payload: boolean }
  | { type: "SET_LOADING_GET_CHARACTERISTIC"; payload: boolean }
  | { type: "SET_WORLD_VIEWS"; payload: WorldView[] }
  | { type: "SET_SHOULD_DEBOUNCE"; payload: boolean }
  | { type: "SET_SORT_CRITERIA"; payload: string }
  | { type: "SET_IS_DISABLED_SEARCH_BUTTON"; payload: boolean };

type State = {
  categoryCheckBoxItems: NestedCheckBoxItem[];
  countryCheckBoxItems: NestedCheckBoxItem[];
  characteristicCheckItems: CheckBoxItem[];
  riskLevelCheckBoxItems: CheckBoxItem[];
  monthCheckBoxItems: NestedCheckBoxItem[];
  bmiRange: number[];
  keyword: string;
  loadingSearchWorldViews: boolean;
  loadingGetCategory: boolean;
  loadingGetCountry: boolean;
  loadingGetCharacteristic: boolean;
  worldViews: Array<WorldView>;
  shouldDebounce: boolean;
  sortCriteria: string;
  isDisabledSearchButton: boolean;
};

const initialState: State = {
  categoryCheckBoxItems: [],
  countryCheckBoxItems: [],
  characteristicCheckItems: [],
  riskLevelCheckBoxItems: [
    { label: "4", checked: false },
    { label: "3", checked: false },
    { label: "2", checked: false },
    { label: "1", checked: false },
    { label: "0", checked: false },
  ],
  monthCheckBoxItems: [
    { label: "1月", parentLabel: "冬", checked: false },
    { label: "2月", parentLabel: "冬", checked: false },
    { label: "3月", parentLabel: "春", checked: false },
    { label: "4月", parentLabel: "春", checked: false },
    { label: "5月", parentLabel: "春", checked: false },
    { label: "6月", parentLabel: "夏", checked: false },
    { label: "7月", parentLabel: "夏", checked: false },
    { label: "8月", parentLabel: "夏", checked: false },
    { label: "9月", parentLabel: "秋", checked: false },
    { label: "10月", parentLabel: "秋", checked: false },
    { label: "11月", parentLabel: "秋", checked: false },
    { label: "12月", parentLabel: "冬", checked: false },
  ],
  bmiRange: [-40, 30],
  keyword: "",
  loadingSearchWorldViews: false,
  loadingGetCategory: false,
  loadingGetCountry: false,
  loadingGetCharacteristic: false,
  worldViews: [],
  shouldDebounce: false,
  sortCriteria: "",
  isDisabledSearchButton: true,
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_CATEGORY_CHECKBOX_ITEMS":
      return { ...state, categoryCheckBoxItems: action.payload };

    case "SET_COUNTRY_CHECKBOX_ITEMS":
      return { ...state, countryCheckBoxItems: action.payload };

    case "SET_CHARACTERISTIC_CHECK_ITEMS":
      return { ...state, characteristicCheckItems: action.payload };

    case "SET_RISK_LEVEL_CHECKBOX_ITEMS":
      return { ...state, riskLevelCheckBoxItems: action.payload };

    case "SET_MONTH_CHECKBOX_ITEMS":
      return { ...state, monthCheckBoxItems: action.payload };

    case "SET_BMI_RANGE":
      return { ...state, bmiRange: action.payload };

    case "SET_KEYWORD":
      return { ...state, keyword: action.payload };

    case "SET_LOADING_SEARCH_WORLDVIEWS":
      return { ...state, loadingSearchWorldViews: action.payload };

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
