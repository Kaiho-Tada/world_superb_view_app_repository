import { createContext, Dispatch, FC, ReactNode, useContext, useMemo, useReducer } from "react";
import { CategoryCheckBoxItem } from "types/api/category/categoryCheckBoxItem";
import { CharacteristicCheckBoxItem } from "types/api/characteristic/characteristicCheckBoxItem";
import { CountryCheckBoxItem } from "types/api/country/CountryCheckBoxItem";
import { WorldView } from "types/api/worldView";
import { BmiCheckBoxItem } from "types/bmi/bmiCheckBoxItem";
import { RiskLevelCheckBoxItem } from "types/riskLevelCheckBoxItem";
import { MonthCheckBoxItem } from "types/season/monthCheckBoxItem";

export type Action =
  | { type: "SET_LOADING_SEARCH_WORLDVIEWS"; payload: boolean }
  | { type: "SET_CHECKED_CATEGORY_LABELS"; payload: string[] }
  | { type: "SET_CHECKED_COUNTRY_LABELS"; payload: string[] }
  | { type: "SET_CHECKED_CHARACTERISTIC_LABELS"; payload: string[] }
  | { type: "SET_CHECKED_RISK_LEVEL_LABELS"; payload: string[] }
  | { type: "SET_CHECKED_MONTH_LABELS"; payload: string[] }
  | { type: "SET_CHECKED_BMI_LABELS"; payload: string[] }
  | { type: "SET_RISK_LEVEL_CHECKBOX_ITEMS"; payload: RiskLevelCheckBoxItem[] }
  | { type: "SET_KEYWORD"; payload: string }
  | { type: "SET_SHOULD_DEBOUNCE"; payload: boolean }
  | { type: "SET_WORLD_VIEWS"; payload: WorldView[] }
  | { type: "SET_MONTH_CHECKBOX_ITEMS"; payload: MonthCheckBoxItem[] }
  | { type: "SET_BMI_CHECKBOX_ITEMS"; payload: BmiCheckBoxItem[] }
  | { type: "TOGGLE_BMI_CHECKBOX_ITEMS"; payload: BmiCheckBoxItem[] }
  | { type: "TOGGLE_CHARACTERISTIC_CHECKBOX"; payload: BmiCheckBoxItem[] }
  | { type: "OPEN_FILTER_DRAWER" }
  | { type: "CLOSE_FILTER_DRAWER" }
  | { type: "SET_COUNTRY_CHECKBOX_ITEMS"; payload: CountryCheckBoxItem[] }
  | { type: "SET_CATEGORY_CHECKBOX_ITEMS"; payload: CategoryCheckBoxItem[] }
  | { type: "SET_CHARACTERISTIC_CHECKBOX_ITEMS"; payload: CharacteristicCheckBoxItem[] }
  | { type: "SET_LOADING_CATEGORY_CHECKBOX_ITEMS"; payload: boolean }
  | { type: "SET_LOADING_COUNTRY_CHECKBOX_ITEMS"; payload: boolean }
  | { type: "SET_LOADING_CHARACTERISTIC_CHECKBOX_ITEMS"; payload: boolean };

type State = {
  countryStates: string[];
  categoryClassifications: string[];
  loadingSearchWorldViews: boolean;
  checkedCategoryLabels: string[];
  checkedCountryLabels: string[];
  checkedCharacteristicLabels: string[];
  worldViews: Array<WorldView>;
  countryCheckBoxItems: Array<CountryCheckBoxItem>;
  categoryCheckBoxItems: Array<CategoryCheckBoxItem>;
  characteristicCheckBoxItems: Array<CharacteristicCheckBoxItem>;
  loadingCategoryCheckBoxItems: boolean;
  loadingCountryCheckBoxItems: boolean;
  loadingCharacteristicCheckBoxItems: boolean;
  checkedRiskLevelLabels: string[];
  riskLevelCheckBoxItems: RiskLevelCheckBoxItem[];
  isOpenFilterDrawer: boolean;
  keyword: string;
  shouldDebounce: boolean;
  monthCheckBoxItems: MonthCheckBoxItem[];
  checkedMonthLabels: string[];
  bmiCheckBoxItems: BmiCheckBoxItem[];
  checkedBmiLabels: string[];
};

const initialState: State = {
  countryStates: ["アジア", "大洋州", "北米", "中南米", "ヨーロッパ", "中東", "アフリカ"],
  categoryClassifications: ["自然", "人工"],
  checkedCategoryLabels: [],
  checkedCountryLabels: [],
  checkedCharacteristicLabels: [],
  checkedRiskLevelLabels: [],
  checkedMonthLabels: [],
  checkedBmiLabels: [],
  loadingSearchWorldViews: false,
  riskLevelCheckBoxItems: [
    { label: "4", checked: false },
    { label: "3", checked: false },
    { label: "2", checked: false },
    { label: "1", checked: false },
    { label: "0", checked: false },
  ],
  keyword: "",
  shouldDebounce: false,
  worldViews: [],
  monthCheckBoxItems: [
    { label: "1月", season: "冬", checked: false },
    { label: "2月", season: "冬", checked: false },
    { label: "3月", season: "春", checked: false },
    { label: "4月", season: "春", checked: false },
    { label: "5月", season: "春", checked: false },
    { label: "6月", season: "夏", checked: false },
    { label: "7月", season: "夏", checked: false },
    { label: "8月", season: "夏", checked: false },
    { label: "9月", season: "秋", checked: false },
    { label: "10月", season: "秋", checked: false },
    { label: "11月", season: "秋", checked: false },
    { label: "12月", season: "冬", checked: false },
  ],
  bmiCheckBoxItems: [
    { label: "30%〜", checked: false },
    { label: "20%〜30%", checked: false },
    { label: "10%〜20%", checked: false },
    { label: "0%〜10%", checked: false },
    { label: "-10%〜0%", checked: false },
    { label: "-20%〜-10%", checked: false },
    { label: "-30%〜-20%", checked: false },
    { label: "-40%〜-30%", checked: false },
    { label: "〜-40%", checked: false },
  ],
  isOpenFilterDrawer: false,
  loadingCategoryCheckBoxItems: false,
  categoryCheckBoxItems: [],
  loadingCountryCheckBoxItems: false,
  countryCheckBoxItems: [],
  loadingCharacteristicCheckBoxItems: false,
  characteristicCheckBoxItems: [],
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_LOADING_SEARCH_WORLDVIEWS":
      return { ...state, loadingSearchWorldViews: action.payload };

    case "SET_CHECKED_CATEGORY_LABELS":
      return { ...state, checkedCategoryLabels: action.payload };

    case "SET_CHECKED_COUNTRY_LABELS":
      return { ...state, checkedCountryLabels: action.payload };

    case "SET_CHECKED_CHARACTERISTIC_LABELS":
      return { ...state, checkedCharacteristicLabels: action.payload };

    case "SET_CHECKED_RISK_LEVEL_LABELS":
      return { ...state, checkedRiskLevelLabels: action.payload };

    case "SET_CHECKED_MONTH_LABELS":
      return { ...state, checkedMonthLabels: action.payload };

    case "SET_CHECKED_BMI_LABELS":
      return { ...state, checkedBmiLabels: action.payload };

    case "SET_RISK_LEVEL_CHECKBOX_ITEMS":
      return { ...state, riskLevelCheckBoxItems: action.payload };

    case "SET_KEYWORD":
      return { ...state, keyword: action.payload };

    case "SET_SHOULD_DEBOUNCE":
      return { ...state, shouldDebounce: action.payload };

    case "SET_WORLD_VIEWS":
      return { ...state, worldViews: action.payload };

    case "SET_MONTH_CHECKBOX_ITEMS":
      return { ...state, monthCheckBoxItems: action.payload };

    case "SET_BMI_CHECKBOX_ITEMS":
      return { ...state, bmiCheckBoxItems: action.payload };

    case "OPEN_FILTER_DRAWER":
      return { ...state, isOpenFilterDrawer: true };

    case "CLOSE_FILTER_DRAWER":
      return { ...state, isOpenFilterDrawer: false };

    case "SET_CATEGORY_CHECKBOX_ITEMS":
      return { ...state, categoryCheckBoxItems: action.payload };

    case "SET_COUNTRY_CHECKBOX_ITEMS":
      return { ...state, countryCheckBoxItems: action.payload };

    case "SET_CHARACTERISTIC_CHECKBOX_ITEMS":
      return { ...state, characteristicCheckBoxItems: action.payload };

    case "SET_LOADING_CATEGORY_CHECKBOX_ITEMS":
      return { ...state, loadingCategoryCheckBoxItems: action.payload };

    case "SET_LOADING_COUNTRY_CHECKBOX_ITEMS":
      return { ...state, loadingCountryCheckBoxItems: action.payload };

    case "SET_LOADING_CHARACTERISTIC_CHECKBOX_ITEMS":
      return { ...state, loadingCharacteristicCheckBoxItems: action.payload };

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
