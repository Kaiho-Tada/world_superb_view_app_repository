import { createContext, Dispatch, SetStateAction } from "react";
import { CategoryWithCheckBoxData } from "types/api/category/categoryWithCheckBoxData";
import { CharacteristicWithCheckBoxData } from "types/api/characteristic/characteristicsWithCheckBoxData";
import { CountryWithCheckBoxData } from "types/api/country/countryWithCheckBoxData";
import { SuperbView } from "types/api/superbView";
import { RiskLevel } from "types/riskLevel";

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
    getAllSuperbViews: () => Promise<void>;
    SuperbViews: Array<SuperbView>;
    setSuperbViews: React.Dispatch<React.SetStateAction<Array<SuperbView>>>;
    loadingSuperbViews: boolean;
    countriesWithCheckBoxData: Array<CountryWithCheckBoxData>;
    setCountriesWithCheckBoxData: Dispatch<SetStateAction<CountryWithCheckBoxData[]>>;
    categoriesWithCheckBoxData: Array<CategoryWithCheckBoxData>;
    setCategoriesWithCheckBoxData: Dispatch<SetStateAction<CategoryWithCheckBoxData[]>>;
    characteristicsWithCheckBoxData: Array<CharacteristicWithCheckBoxData>;
    setCharacteristicsWithCheckBoxData: Dispatch<SetStateAction<CharacteristicWithCheckBoxData[]>>;
    getAllCategoriesWithCheckBoxData: () => Promise<void>;
    getAllCountriesWithCheckBoxData: () => Promise<void>;
    getAllCharacteristicsWithCheckBoxData: () => Promise<void>;
    loadingCategoriesWithCheckBoxData: boolean;
    loadingCountriesWithCheckBoxData: boolean;
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
  }
);

export default SuperbViewListContext;
