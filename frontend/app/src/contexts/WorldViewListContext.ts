import { createContext, Dispatch, SetStateAction } from "react";
import { CategoryCheckBoxItem } from "types/api/category/categoryCheckBoxItem";
import { CharacteristicCheckBoxItem } from "types/api/characteristic/characteristicCheckBoxItem";
import { CountryCheckBoxItem } from "types/api/country/CountryCheckBoxItem";
import { WorldView } from "types/api/worldView";
import { BmiCheckBoxItem } from "types/bmi/bmiCheckBoxItem";
import { RiskLevel } from "types/riskLevel";
import { MonthCheckBoxItems } from "types/season/monthCheckBoxItems";

export const WorldViewListContext = createContext(
  {} as {
    countryStates: string[];
    categoryClassifications: string[];
    loadingSearchWorldViews: boolean;
    setLoadingSearchWorldViews: React.Dispatch<React.SetStateAction<boolean>>;
    checkedCategoryLabels: string[];
    setCheckedCategoryLabels: React.Dispatch<React.SetStateAction<string[]>>;
    checkedCountryLabels: string[];
    setCheckedCountryLabels: React.Dispatch<React.SetStateAction<string[]>>;
    checkedCharacteristicLabels: string[];
    setCheckedCharacteristicLabels: React.Dispatch<React.SetStateAction<string[]>>;
    worldViews: Array<WorldView>;
    setWorldViews: React.Dispatch<React.SetStateAction<Array<WorldView>>>;
    countryCheckBoxItems: Array<CountryCheckBoxItem>;
    setCountryCheckBoxItems: Dispatch<SetStateAction<CountryCheckBoxItem[]>>;
    categoryCheckBoxItems: Array<CategoryCheckBoxItem>;
    setCategoryCheckBoxItems: Dispatch<SetStateAction<CategoryCheckBoxItem[]>>;
    characteristicCheckBoxItems: Array<CharacteristicCheckBoxItem>;
    setCharacteristicCheckBoxItems: Dispatch<SetStateAction<CharacteristicCheckBoxItem[]>>;
    getCategoryCheckBoxItems: () => Promise<void>;
    getCountryCheckBoxItems: () => Promise<void>;
    getCharacteristicCheckBoxItems: () => Promise<void>;
    loadingCategoryCheckBoxItems: boolean;
    loadingCountryCheckBoxItems: boolean;
    loadingCharacteristicCheckBoxItems: boolean;
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
    bmiCheckBoxItems: BmiCheckBoxItem[];
    setBmiCheckBoxItems: React.Dispatch<React.SetStateAction<BmiCheckBoxItem[]>>;
    checkedBmiLabels: string[];
    setCheckedBmiLabels: React.Dispatch<React.SetStateAction<string[]>>;
  }
);

export default WorldViewListContext;
