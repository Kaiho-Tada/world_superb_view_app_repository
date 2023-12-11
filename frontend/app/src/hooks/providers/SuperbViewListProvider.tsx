import { useDisclosure } from "@chakra-ui/react";
import SuperbViewListContext from "contexts/SuperbViewListContext";
import useGetAllCategoriesWithCheckBoxData from "hooks/api/category/useGetAllCategoriesWithCheckBoxData";
import useGetAllCharacteristicsWithCheckBoxData from "hooks/api/characteristic/useGetAllCharacteristicsWithCheckBoxData";
import useGetAllCountriesWithCheckBoxData from "hooks/api/country/useGetAllCountriesWithCheckBoxData";
import { FC, ReactNode, useContext, useMemo, useState } from "react";
import { SuperbView } from "types/api/superbView";
import { RiskLevel } from "types/riskLevel";
import { MonthCheckBoxItems } from "types/season/monthCheckBoxItems";

type Props = {
  children: ReactNode;
};

export const useSuperbViewListContext = () => {
  const superbViewListContext = useContext(SuperbViewListContext);
  return useMemo(() => superbViewListContext, [superbViewListContext]);
};

export const SuperbViewListProvider: FC<Props> = ({ children }) => {
  const countryStates = ["アジア", "大洋州", "北米", "中南米", "ヨーロッパ", "中東", "アフリカ"];
  const categoryClassifications = ["自然", "人工"];
  const [checkedCategoryLabels, setCheckedCategoryLabels] = useState<Array<string>>([]);
  const [checkedCountryLabels, setCheckedCountryLabels] = useState<Array<string>>([]);
  const [checkedCharacteristicLabels, setCheckedCharacteristicLabels] = useState<Array<string>>([]);
  const [checkedRiskLevelLabels, setCheckedRiskLevelLabels] = useState<Array<string>>([]);
  const [checkedMonthLabels, setCheckedMonthLabels] = useState<Array<string>>([]);
  const [loadingSearchSuperbViews, setLoadingSearchSuperbViews] = useState(false);
  const [riskLevels, setRiskLevels] = useState<Array<RiskLevel>>([
    { label: "4", checked: false },
    { label: "3", checked: false },
    { label: "2", checked: false },
    { label: "1", checked: false },
    { label: "0", checked: false },
  ]);
  const [keyword, setKeyword] = useState<string>("");
  const [shouldDebounce, setShouldDebounce] = useState<boolean>(false);
  const [superbViews, setSuperbViews] = useState<Array<SuperbView>>([]);
  const [monthCheckBoxItems, setMonthCheckBoxItems] = useState<Array<MonthCheckBoxItems>>([
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
  ]);

  const {
    isOpen: isOpenFilterDrawer,
    onOpen: onOpenFilterDrawer,
    onClose: onCloseFilterDrawer,
  } = useDisclosure();

  const {
    getAllCategoriesWithCheckBoxData,
    categoriesWithCheckBoxData,
    setCategoriesWithCheckBoxData,
    loadingCategoriesWithCheckBoxData,
  } = useGetAllCategoriesWithCheckBoxData();
  const {
    getAllCountriesWithCheckBoxData,
    countriesWithCheckBoxData,
    setCountriesWithCheckBoxData,
    loadingCountriesWithCheckBoxData,
  } = useGetAllCountriesWithCheckBoxData();
  const {
    getAllCharacteristicsWithCheckBoxData,
    characteristicsWithCheckBoxData,
    setCharacteristicsWithCheckBoxData,
    loadingCharacteristicsWithCheckBoxData,
  } = useGetAllCharacteristicsWithCheckBoxData();

  const value = useMemo(
    () => ({
      countryStates,
      categoryClassifications,
      loadingSearchSuperbViews,
      setLoadingSearchSuperbViews,
      checkedCategoryLabels,
      setCheckedCategoryLabels,
      checkedCountryLabels,
      setCheckedCountryLabels,
      checkedCharacteristicLabels,
      setCheckedCharacteristicLabels,
      superbViews,
      setSuperbViews,
      countriesWithCheckBoxData,
      setCountriesWithCheckBoxData,
      categoriesWithCheckBoxData,
      setCategoriesWithCheckBoxData,
      characteristicsWithCheckBoxData,
      setCharacteristicsWithCheckBoxData,
      getAllCategoriesWithCheckBoxData,
      getAllCountriesWithCheckBoxData,
      getAllCharacteristicsWithCheckBoxData,
      loadingCategoriesWithCheckBoxData,
      loadingCountriesWithCheckBoxData,
      loadingCharacteristicsWithCheckBoxData,
      checkedRiskLevelLabels,
      setCheckedRiskLevelLabels,
      riskLevels,
      setRiskLevels,
      isOpenFilterDrawer,
      onOpenFilterDrawer,
      onCloseFilterDrawer,
      keyword,
      setKeyword,
      shouldDebounce,
      setShouldDebounce,
      monthCheckBoxItems,
      setMonthCheckBoxItems,
      checkedMonthLabels,
      setCheckedMonthLabels,
    }),
    [
      countryStates,
      categoryClassifications,
      loadingSearchSuperbViews,
      setLoadingSearchSuperbViews,
      checkedCategoryLabels,
      setCheckedCategoryLabels,
      checkedCountryLabels,
      setCheckedCountryLabels,
      checkedCharacteristicLabels,
      setCheckedCharacteristicLabels,
      superbViews,
      setSuperbViews,
      countriesWithCheckBoxData,
      setCountriesWithCheckBoxData,
      categoriesWithCheckBoxData,
      setCategoriesWithCheckBoxData,
      characteristicsWithCheckBoxData,
      setCharacteristicsWithCheckBoxData,
      getAllCategoriesWithCheckBoxData,
      getAllCountriesWithCheckBoxData,
      getAllCharacteristicsWithCheckBoxData,
      loadingCategoriesWithCheckBoxData,
      loadingCountriesWithCheckBoxData,
      loadingCharacteristicsWithCheckBoxData,
      checkedRiskLevelLabels,
      setCheckedRiskLevelLabels,
      riskLevels,
      setRiskLevels,
      isOpenFilterDrawer,
      onOpenFilterDrawer,
      onCloseFilterDrawer,
      keyword,
      setKeyword,
      shouldDebounce,
      setShouldDebounce,
      monthCheckBoxItems,
      setMonthCheckBoxItems,
      checkedMonthLabels,
      setCheckedMonthLabels,
    ]
  );
  return <SuperbViewListContext.Provider value={value}>{children}</SuperbViewListContext.Provider>;
};
