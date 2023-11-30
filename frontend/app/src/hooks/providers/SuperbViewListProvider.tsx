import { useDisclosure } from "@chakra-ui/react";
import SuperbViewListContext from "contexts/SuperbViewListContext";
import useGetAllCategoriesWithCheckBoxData from "hooks/api/category/useGetAllCategoriesWithCheckBoxData";
import useGetAllCharacteristicsWithCheckBoxData from "hooks/api/characteristic/useGetAllCharacteristicsWithCheckBoxData";
import useGetAllCountriesWithCheckBoxData from "hooks/api/country/useGetAllCountriesWithCheckBoxData";
import useGetAllSuperbViews from "hooks/api/superbView/useGetAllSuperbViews";
import { FC, ReactNode, useContext, useMemo, useState } from "react";
import { RiskLevel } from "types/riskLevel";

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
  const [loadingSearchSuperbViews, setLoadingSearchSuperbViews] = useState(false);
  const [riskLevels, setRiskLevels] = useState<Array<RiskLevel>>([
    { label: "4", checked: false },
    { label: "3", checked: false },
    { label: "2", checked: false },
    { label: "1", checked: false },
    { label: "0", checked: false },
  ]);
  const [keyword, setKeyword] = useState<string>("");

  const {
    isOpen: isOpenFilterDrawer,
    onOpen: onOpenFilterDrawer,
    onClose: onCloseFilterDrawer,
  } = useDisclosure();

  const { getAllSuperbViews, SuperbViews, setSuperbViews, loadingSuperbViews } =
    useGetAllSuperbViews();

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
      getAllSuperbViews,
      SuperbViews,
      setSuperbViews,
      loadingSuperbViews,
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
      getAllSuperbViews,
      SuperbViews,
      setSuperbViews,
      loadingSuperbViews,
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
    ]
  );
  return <SuperbViewListContext.Provider value={value}>{children}</SuperbViewListContext.Provider>;
};
