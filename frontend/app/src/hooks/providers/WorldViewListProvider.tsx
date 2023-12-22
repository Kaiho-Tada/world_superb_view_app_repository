import { useDisclosure } from "@chakra-ui/react";
import WorldViewListContext from "contexts/WorldViewListContext";
import useGetAllCategoryCheckBoxItems from "hooks/api/category/useGetCategoryCheckBoxItems";
import useGetAllCharacteristicsWithCheckBoxData from "hooks/api/characteristic/useGetCharacteristicCheckBoxItems";
import useGetCountryCheckBoxItems from "hooks/api/country/useGetCountryCheckBoxItems";
import { FC, ReactNode, useContext, useMemo, useState } from "react";
import { WorldView } from "types/api/worldView";
import { BmiCheckBoxItem } from "types/bmi/bmiCheckBoxItem";
import { RiskLevel } from "types/riskLevel";
import { MonthCheckBoxItems } from "types/season/monthCheckBoxItems";

type Props = {
  children: ReactNode;
};

export const useWorldViewListContext = () => {
  const worldViewListContext = useContext(WorldViewListContext);
  return useMemo(() => worldViewListContext, [worldViewListContext]);
};

export const WorldViewListProvider: FC<Props> = ({ children }) => {
  const countryStates = ["アジア", "大洋州", "北米", "中南米", "ヨーロッパ", "中東", "アフリカ"];
  const categoryClassifications = ["自然", "人工"];
  const [checkedCategoryLabels, setCheckedCategoryLabels] = useState<Array<string>>([]);
  const [checkedCountryLabels, setCheckedCountryLabels] = useState<Array<string>>([]);
  const [checkedCharacteristicLabels, setCheckedCharacteristicLabels] = useState<Array<string>>([]);
  const [checkedRiskLevelLabels, setCheckedRiskLevelLabels] = useState<Array<string>>([]);
  const [checkedMonthLabels, setCheckedMonthLabels] = useState<Array<string>>([]);
  const [checkedBmiLabels, setCheckedBmiLabels] = useState<Array<string>>([]);

  const [loadingSearchWorldViews, setLoadingSearchWorldViews] = useState(false);
  const [riskLevels, setRiskLevels] = useState<Array<RiskLevel>>([
    { label: "4", checked: false },
    { label: "3", checked: false },
    { label: "2", checked: false },
    { label: "1", checked: false },
    { label: "0", checked: false },
  ]);
  const [keyword, setKeyword] = useState<string>("");
  const [shouldDebounce, setShouldDebounce] = useState<boolean>(false);
  const [worldViews, setWorldViews] = useState<Array<WorldView>>([]);
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

  const [bmiCheckBoxItems, setBmiCheckBoxItems] = useState<Array<BmiCheckBoxItem>>([
    { label: "30%〜", checked: false },
    { label: "20%〜30%", checked: false },
    { label: "10%〜20%", checked: false },
    { label: "0%〜10%", checked: false },
    { label: "-10%〜0%", checked: false },
    { label: "-20%〜-10%", checked: false },
    { label: "-30%〜-20%", checked: false },
    { label: "-40%〜-30%", checked: false },
    { label: "〜-40%", checked: false },
  ]);

  const {
    isOpen: isOpenFilterDrawer,
    onOpen: onOpenFilterDrawer,
    onClose: onCloseFilterDrawer,
  } = useDisclosure();

  const {
    getCategoryCheckBoxItems,
    categoryCheckBoxItems,
    setCategoryCheckBoxItems,
    loadingCategoryCheckBoxItems,
  } = useGetAllCategoryCheckBoxItems();
  const {
    getCountryCheckBoxItems,
    countryCheckBoxItems,
    setCountryCheckBoxItems,
    loadingCountryCheckBoxItems,
  } = useGetCountryCheckBoxItems();
  const {
    getCharacteristicCheckBoxItems,
    characteristicCheckBoxItems,
    setCharacteristicCheckBoxItems,
    loadingCharacteristicCheckBoxItems,
  } = useGetAllCharacteristicsWithCheckBoxData();

  const value = useMemo(
    () => ({
      countryStates,
      categoryClassifications,
      loadingSearchWorldViews,
      setLoadingSearchWorldViews,
      checkedCategoryLabels,
      setCheckedCategoryLabels,
      checkedCountryLabels,
      setCheckedCountryLabels,
      checkedCharacteristicLabels,
      setCheckedCharacteristicLabels,
      worldViews,
      setWorldViews,
      countryCheckBoxItems,
      setCountryCheckBoxItems,
      categoryCheckBoxItems,
      setCategoryCheckBoxItems,
      characteristicCheckBoxItems,
      setCharacteristicCheckBoxItems,
      getCategoryCheckBoxItems,
      getCountryCheckBoxItems,
      getCharacteristicCheckBoxItems,
      loadingCategoryCheckBoxItems,
      loadingCountryCheckBoxItems,
      loadingCharacteristicCheckBoxItems,
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
      bmiCheckBoxItems,
      setBmiCheckBoxItems,
      checkedBmiLabels,
      setCheckedBmiLabels,
    }),
    [
      countryStates,
      categoryClassifications,
      loadingSearchWorldViews,
      setLoadingSearchWorldViews,
      checkedCategoryLabels,
      setCheckedCategoryLabels,
      checkedCountryLabels,
      setCheckedCountryLabels,
      checkedCharacteristicLabels,
      setCheckedCharacteristicLabels,
      worldViews,
      setWorldViews,
      countryCheckBoxItems,
      setCountryCheckBoxItems,
      categoryCheckBoxItems,
      setCategoryCheckBoxItems,
      characteristicCheckBoxItems,
      setCharacteristicCheckBoxItems,
      getCategoryCheckBoxItems,
      getCountryCheckBoxItems,
      getCategoryCheckBoxItems,
      loadingCategoryCheckBoxItems,
      loadingCountryCheckBoxItems,
      loadingCharacteristicCheckBoxItems,
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
      bmiCheckBoxItems,
      setBmiCheckBoxItems,
      checkedBmiLabels,
      setCheckedBmiLabels,
    ]
  );
  return <WorldViewListContext.Provider value={value}>{children}</WorldViewListContext.Provider>;
};
