import { createContext, Dispatch, SetStateAction } from "react";
import { CategoryCheckBoxItem } from "types/api/category/categoryCheckBoxItem";
import { CharacteristicWithCheckBoxData } from "types/api/characteristic/characteristicsWithCheckBoxData";
import { CountryCheckBoxItem } from "types/api/country/CountryCheckBoxItem";
import { SuperbView } from "types/api/superbView";
import { RiskLevel } from "types/riskLevel";
import { MonthCheckBoxItems } from "types/season/monthCheckBoxItems";

export const SuperbViewListContext = createContext(
  {} as {
    countryStates: string[];
    categoryClassifications: string[];
    loadingSearchSuperbViews: boolean;
    setLoadingSearchSuperbViews: React.Dispatch<React.SetStateAction<boolean>>;
    checkedCategoryLabels: string[];
    setCheckedCategoryLabels: React.Dispatch<React.SetStateAction<string[]>>;
    checkedCountryLabels: string[];
    setCheckedCountryLabels: React.Dispatch<React.SetStateAction<string[]>>;
    checkedCharacteristicLabels: string[];
    setCheckedCharacteristicLabels: React.Dispatch<React.SetStateAction<string[]>>;
    superbViews: Array<SuperbView>;
    setSuperbViews: React.Dispatch<React.SetStateAction<Array<SuperbView>>>;
    countryCheckBoxItems: Array<CountryCheckBoxItem>;
    setCountryCheckBoxItems: Dispatch<SetStateAction<CountryCheckBoxItem[]>>;
    categoryCheckBoxItems: Array<CategoryCheckBoxItem>;
    setCategoryCheckBoxItems: Dispatch<SetStateAction<CategoryCheckBoxItem[]>>;
    characteristicsWithCheckBoxData: Array<CharacteristicWithCheckBoxData>;
    setCharacteristicsWithCheckBoxData: Dispatch<SetStateAction<CharacteristicWithCheckBoxData[]>>;
    getCategoryCheckBoxItems: () => Promise<void>;
    getCountryCheckBoxItems: () => Promise<void>;
    getAllCharacteristicsWithCheckBoxData: () => Promise<void>;
    loadingCategoryCheckBoxItems: boolean;
    loadingCountryCheckBoxItems: boolean;
    loadingCharacteristicsWithCheckBoxData: boolean;
    checkedRiskLevelLabels: string[];
    setCheckedRiskLevelLabels: React.Dispatch<React.SetStateAction<string[]>>;
    riskLevels: RiskLevel[];
    setRiskLevels: React.Dispatch<React.SetStateAction<RiskLevel[]>>;
    isOpenFilterDrawer: boolean;
    onOpenFilterDrawer: () => void;
    onCloseFilterDrawer: () => void;
    keyword: string;
    setKeyword: React.Dispatch<React.SetStateAction<string>>;
    shouldDebounce: boolean;
    setShouldDebounce: React.Dispatch<React.SetStateAction<boolean>>;
    monthCheckBoxItems: MonthCheckBoxItems[];
    setMonthCheckBoxItems: React.Dispatch<React.SetStateAction<MonthCheckBoxItems[]>>;
    checkedMonthLabels: string[];
    setCheckedMonthLabels: React.Dispatch<React.SetStateAction<string[]>>;
  }
);

export default SuperbViewListContext;
