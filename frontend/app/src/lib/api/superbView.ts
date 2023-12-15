import { SearchSuperbViewsProps } from "types/api/searchSuperbViews";
import client from "./client";

export const getAllSuperbViewsApi = () => client.get("/world_views");

export const searchSuperbViewsApi = (props: SearchSuperbViewsProps) => {
  const {
    checkedCategoryLabels,
    checkedCountryLabels,
    checkedCharacteristicLabels,
    checkedRiskLevelLabels,
    checkedMonthLabels,
    keyword,
  } = props;

  return client.get("/world_views/search", {
    params: {
      categoryNames: checkedCategoryLabels,
      countryNames: checkedCountryLabels,
      characteristicNames: checkedCharacteristicLabels,
      riskLevels: checkedRiskLevelLabels,
      months: checkedMonthLabels,
      keyword,
    },
  });
};
