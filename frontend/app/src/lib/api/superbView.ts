import { SearchSuperbViewsProps } from "types/api/searchSuperbViews";
import client from "./client";

export const getAllSuperbViewsApi = () => client.get("/superb_views");

export const searchSuperbViewsApi = (props: SearchSuperbViewsProps) => {
  const {
    checkedCategoryLabels,
    checkedCountryLabels,
    checkedCharacteristicLabels,
    checkedRiskLevelLabels,
    keyword,
  } = props;

  return client.get("/superb_views/search", {
    params: {
      categoryNames: checkedCategoryLabels,
      countryNames: checkedCountryLabels,
      characteristicNames: checkedCharacteristicLabels,
      riskLevels: checkedRiskLevelLabels,
      keyword,
    },
  });
};
